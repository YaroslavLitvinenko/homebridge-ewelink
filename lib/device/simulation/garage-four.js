/* jshint -W014, -W033, esversion: 9 */
/* eslint-disable new-cap */
'use strict'
module.exports = class deviceGarageFour {
  constructor (platform, accessory) {
    this.platform = platform
    this.log = platform.log
    this.disableDeviceLogging = platform.config.disableDeviceLogging
    this.helpers = platform.helpers
    this.S = platform.api.hap.Service
    this.C = platform.api.hap.Characteristic

    this.dName = accessory.displayName
    this.accessory = accessory

    this.operationTime = parseInt(platform.cusG.get(this.accessory.context.eweDeviceId).operationTime)
    this.operationTime = isNaN(this.operationTime) || this.operationTime < 20
      ? this.helpers.defaults.operationTime
      : this.operationTime

    ;['A', 'B', 'C', 'D'].forEach(v => {
      let gdService
      if (!(gdService = this.accessory.getService('Garage ' + v))) {
        gdService = this.accessory.addService(this.S.GarageDoorOpener, 'Garage ' + v, 'garage' + v)
        gdService.setCharacteristic(this.C.CurrentDoorState, 1)
          .setCharacteristic(this.C.TargetDoorState, 1)
          .setCharacteristic(this.C.ObstructionDetected, false)
      }
      gdService.getCharacteristic(this.C.TargetDoorState)
        .on('set', (value, callback) => this.internalUpdate(v, value, callback))
    })
  }

  async internalUpdate (garage, value, callback) {
    try {
      callback()
      let garageChannel
      switch (garage) {
        case 'A':
          garageChannel = 0
          break
        case 'B':
          garageChannel = 1
          break
        case 'C':
          garageChannel = 2
          break
        case 'D':
          garageChannel = 3
          break
      }
      const prevState = this.accessory.context.cacheStates[garageChannel].cacheCurrentDoorState
      if (value === prevState % 2) {
        return
      }
      const gdService = this.accessory.getService('Garage ' + garage)
      this.inUse = true
      const updateKey = Math.random().toString(36).substr(2, 8)
      this.updateKey = updateKey
      gdService.updateCharacteristic(this.C.TargetDoorState, value)
        .updateCharacteristic(this.C.CurrentDoorState, value + 2)
      this.accessory.context.cacheStates[garageChannel].cacheTargetDoorState = value
      this.accessory.context.cacheStates[garageChannel].cacheCurrentDoorState = value + 2
      const params = { switches: this.helpers.defaultMultiSwitchOff }
      ;[0, 1, 2, 3].forEach(i => (params.switches[i].switch = garageChannel === i ? 'on' : 'off'))
      await this.platform.sendDeviceUpdate(this.accessory, params)
      await this.helpers.sleep(2000)
      this.inUse = false
      await this.helpers.sleep(Math.max((this.operationTime - 20) * 100, 0))
      if (this.updateKey !== updateKey) {
        return
      }
      gdService.updateCharacteristic(this.C.CurrentDoorState, value)
      this.accessory.context.cacheStates[garageChannel].cacheCurrentDoorState = value
      if (!this.disableDeviceLogging) {
        this.log('[%s] current state [garage %s %s].', this.dName, garageChannel, value === 0 ? 'open' : 'closed')
      }
    } catch (err) {
      this.inUse = false
      this.platform.deviceUpdateError(this.accessory, err, true)
    }
  }

  async externalUpdate (params) {
    try {

    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, false)
    }
  }
}