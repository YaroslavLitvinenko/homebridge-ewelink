/* jshint -W014, -W033, esversion: 9 */
/* eslint-disable new-cap */
'use strict'
module.exports = class deviceOutletTemp {
  constructor (platform, accessory) {
    this.platform = platform
    this.log = platform.log
    this.debugDevice = platform.config.debugDevice || false
    this.helpers = platform.helpers
    this.Service = platform.api.hap.Service
    this.Characteristic = platform.api.hap.Characteristic
    this.tempOffset = this.helpers.hasProperty(platform.thTempOffset, accessory.context.eweDeviceId)
      ? parseFloat(platform.thTempOffset[accessory.context.eweDeviceId])
      : 0
    if (accessory.getService(this.Service.Thermostat)) {
      accessory.removeService(accessory.getService(this.Service.Thermostat))
    }
    if ((this.platform.config.hideSwitchFromTH || '').split(',').includes(accessory.context.eweDeviceId)) {
      if (accessory.getService(this.Service.Switch)) {
        accessory.removeService(accessory.getService(this.Service.Switch))
      }
    } else {
      this.switchService = accessory.getService(this.Service.Switch) || accessory.addService(this.Service.Switch)
      this.switchService
        .getCharacteristic(this.Characteristic.On)
        .on('set', this.internalUpdate.bind(this))
    }
    this.tempService = accessory.getService(this.Service.TemperatureSensor) || accessory.addService(this.Service.TemperatureSensor)
    this.tempService.getCharacteristic(this.Characteristic.CurrentTemperature)
      .setProps({
        minValue: -100
      })
    if (accessory.context.sensorType !== 'DS18B20') {
      this.humiService = accessory.getService(this.Service.HumiditySensor) || accessory.addService(this.Service.HumiditySensor)
    }
    accessory.log = this.log
    accessory.eveService = new this.platform.eveService('custom', accessory)
    this.accessory = accessory
  }

  async internalUpdate (value, callback) {
    try {
      callback()
      const params = {
        switch: value ? 'on' : 'off',
        mainSwitch: value ? 'on' : 'off'
      }
      await this.platform.sendDeviceUpdate(this.accessory, params)
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, true)
    }
  }

  async externalUpdate (params) {
    try {
      if (
        !(this.platform.config.hideSwitchFromTH || '').split(',').includes(this.accessory.context.eweDeviceId) &&
        (this.helpers.hasProperty(params, 'switch') || this.helpers.hasProperty(params, 'mainSwitch'))
      ) {
        const newState = this.helpers.hasProperty(params, 'switch') ? params.switch === 'on' : params.mainSwitch === 'on'
        this.switchService.updateCharacteristic(this.Characteristic.On, newState)
        this.accessory.eveService.addEntry({ status: newState ? 1 : 0 })
      }
      const eveLog = {}
      if (this.helpers.hasProperty(params, 'currentTemperature') && params.currentTemperature !== 'unavailable') {
        const currentTemp = parseFloat(params.currentTemperature) + this.tempOffset
        this.tempService.updateCharacteristic(this.Characteristic.CurrentTemperature, currentTemp)
        eveLog.temp = currentTemp
      }
      if (
        this.helpers.hasProperty(params, 'currentHumidity') &&
        params.currentHumidity !== 'unavailable' &&
        this.accessory.getService(this.Service.HumiditySensor)
      ) {
        const currentHumi = parseFloat(params.currentHumidity)
        this.humiService.updateCharacteristic(this.Characteristic.CurrentRelativeHumidity, currentHumi)
        eveLog.humidity = currentHumi
      }
      if (this.helpers.hasProperty(eveLog, 'temp') || this.helpers.hasProperty(eveLog, 'humidity')) {
        this.accessory.eveService.addEntry(eveLog)
      }
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, false)
    }
  }
}
