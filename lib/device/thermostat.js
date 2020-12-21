/* jshint -W014, -W033, esversion: 9 */
/* eslint-disable new-cap */
'use strict'
module.exports = class deviceThermostat {
  constructor (platform, accessory) {
    this.platform = platform
    this.log = platform.log
    this.helpers = platform.helpers
    this.Service = platform.api.hap.Service
    this.Characteristic = platform.api.hap.Characteristic
    this.tempOffset = this.helpers.hasProperty(platform.thTempOffset, accessory.context.eweDeviceId)
      ? parseFloat(platform.thTempOffset[accessory.context.eweDeviceId])
      : 0
    if (accessory.getService(this.Service.Switch)) {
      accessory.removeService(accessory.getService(this.Service.Switch))
    }
    if (accessory.getService(this.Service.TemperatureSensor)) {
      accessory.removeService(accessory.getService(this.Service.TemperatureSensor))
    }
    if (accessory.getService(this.Service.HumiditySensor)) {
      accessory.removeService(accessory.getService(this.Service.HumiditySensor))
    }
    this.service = accessory.getService(this.Service.Thermostat) || accessory.addService(this.Service.Thermostat)
    this.service.getCharacteristic(this.Characteristic.CurrentTemperature)
      .setProps({
        minValue: -100
      })
    this.service
      .getCharacteristic(this.Characteristic.TargetHeatingCoolingState)
      .on('set', this.internalOnOffUpdate.bind(this))
      .setProps({
        validValues: [0, 1]
      })
    this.service
      .getCharacteristic(this.Characteristic.TargetTemperature)
      .on('set', this.internalTempUpdate.bind(this))
    if (
      accessory.context.sensorType !== 'DS18B20' &&
      !this.service.testCharacteristic(this.Characteristic.CurrentRelativeHumidity)
    ) {
      this.service.addCharacteristic(this.Characteristic.CurrentRelativeHumidity)
    }
    accessory.log = this.log
    accessory.eveService = new this.platform.eveService('custom', accessory)
    this.accessory = accessory
  }

  async internalOnOffUpdate (value, callback) {
    try {
      callback()
      const params = {
        switch: value === 0 ? 'off' : 'on',
        mainSwitch: value === 0 ? 'off' : 'on'
      }
      await this.platform.sendDeviceUpdate(this.accessory, params)
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, true)
    }
  }

  async internalTempUpdate (value, callback) {
    try {
      callback()
      await this.helpers.sleep(500)
      this.service.updateCharacteristic(
        this.Characteristic.TargetTemperature,
        this.service.getCharacteristic(this.Characteristic.CurrentTemperature).value
      )
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, true)
    }
  }

  async externalUpdate (params) {
    try {
      if (this.helpers.hasProperty(params, 'switch') || this.helpers.hasProperty(params, 'mainSwitch')) {
        const newState = this.helpers.hasProperty(params, 'switch') ? params.switch === 'on' : params.mainSwitch === 'on'
        this.service.updateCharacteristic(this.Characteristic.TargetHeatingCoolingState, newState ? 1 : 0)
      }
      const eveLog = {}
      if (this.helpers.hasProperty(params, 'currentTemperature') && params.currentTemperature !== 'unavailable') {
        const currentTemp = parseFloat(params.currentTemperature) + this.tempOffset
        this.service.updateCharacteristic(this.Characteristic.CurrentTemperature, currentTemp)
        this.service.updateCharacteristic(this.Characteristic.TargetTemperature, currentTemp)
        eveLog.temp = currentTemp
      }
      if (
        this.helpers.hasProperty(params, 'currentHumidity') &&
        params.currentHumidity !== 'unavailable' &&
        this.service.testCharacteristic(this.Characteristic.CurrentRelativeHumidity)
      ) {
        const currentHumi = parseFloat(params.currentHumidity)
        this.service.updateCharacteristic(this.Characteristic.CurrentRelativeHumidity, currentHumi)
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
