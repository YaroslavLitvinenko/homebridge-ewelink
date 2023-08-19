import platformConsts from '../../utils/constants.js';
import { generateRandomString, hasProperty, sleep } from '../../utils/functions.js';

export default class {
  constructor(platform, accessory) {
    // Set up variables from the platform
    this.hapChar = platform.api.hap.Characteristic;
    this.hapErr = platform.api.hap.HapStatusError;
    this.hapServ = platform.api.hap.Service;
    this.lang = platform.lang;
    this.log = platform.log;
    this.platform = platform;

    // Set up variables from the accessory
    this.name = accessory.displayName;
    this.accessory = accessory;

    // Initially set the online flag as true (to be then updated as false if necessary)
    this.isOnline = true;

    // Set up custom variables for this device type
    const deviceConf = platform.deviceConf[accessory.context.eweDeviceId] || {};
    this.brightStep = deviceConf.brightnessStep
      ? Math.min(deviceConf.brightnessStep, 100)
      : platformConsts.defaultValues.brightnessStep;
    this.offlineAsOff = deviceConf.offlineAsOff;

    // Set the correct logging variables for this accessory
    switch (deviceConf.overrideLogging) {
      case 'standard':
        this.enableLogging = true;
        this.enableDebugLogging = false;
        break;
      case 'debug':
        this.enableLogging = true;
        this.enableDebugLogging = true;
        break;
      case 'disable':
        this.enableLogging = false;
        this.enableDebugLogging = false;
        break;
      default:
        this.enableLogging = !platform.config.disableDeviceLogging;
        this.enableDebugLogging = platform.config.debug;
        break;
    }

    // Remove any existing lightbulb services if found
    if (accessory.getService(this.hapServ.Lightbulb)) {
      accessory.removeService(accessory.getService(this.hapServ.Lightbulb));
    }

    // Add the fan service if it doesn't already exist
    this.service = this.accessory.getService(this.hapServ.Fan)
      || this.accessory.addService(this.hapServ.Fan);

    // Add the set handler to the fan on/off characteristic
    this.service
      .getCharacteristic(this.hapChar.On)
      .onSet(async (value) => this.internalStateUpdate(value));

    // Add the set handler to the fan speed characteristic
    this.service
      .getCharacteristic(this.hapChar.RotationSpeed)
      .setProps({ minStep: this.brightStep })
      .onSet(async (value) => this.internalSpeedUpdate(value));

    // Add the get handlers only if the user hasn't disabled the disableNoResponse setting
    if (!platform.config.disableNoResponse) {
      this.service.getCharacteristic(this.hapChar.On).onGet(() => {
        if (!this.isOnline) {
          throw new this.hapErr(-70402);
        }
        return this.service.getCharacteristic(this.hapChar.On).value;
      });
      this.service.getCharacteristic(this.hapChar.RotationSpeed).onGet(() => {
        if (!this.isOnline) {
          throw new this.hapErr(-70402);
        }
        return this.service.getCharacteristic(this.hapChar.RotationSpeed).value;
      });
    }

    // Output the customised options to the log
    const normalLogging = this.enableLogging ? 'standard' : 'disable';
    const opts = JSON.stringify({
      brightnessStep: this.brightStep,
      logging: this.enableDebugLogging ? 'debug' : normalLogging,
      offlineAsOff: !!this.offlineAsOff,
      showAs: 'fan',
    });
    this.log('[%s] %s %s.', this.name, this.lang.devInitOpts, opts);
  }

  async internalStateUpdate(value) {
    try {
      const newValue = value ? 'on' : 'off';
      if (this.cacheState === newValue) {
        return;
      }
      const params = {};
      switch (this.accessory.context.eweUIID) {
        case 36:
        case 44:
          // KING-M4, D1
          params.switch = newValue;
          break;
        case 57:
          params.state = newValue;
          break;
        default:
          return;
      }
      await this.platform.sendDeviceUpdate(this.accessory, params);
      this.cacheState = newValue;
      if (this.enableLogging) {
        this.log('[%s] %s [%s].', this.name, this.lang.curState, this.cacheState);
      }
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, true);
      setTimeout(() => {
        this.service.updateCharacteristic(this.hapChar.On, this.cacheState === 'on');
      }, 2000);
      throw new this.hapErr(-70402);
    }
  }

  async internalSpeedUpdate(value) {
    try {
      if (this.cacheSpeed === value) {
        return;
      }
      const updateKey = generateRandomString(5);
      this.updateKeySpeed = updateKey;
      await sleep(500);
      if (updateKey !== this.updateKeySpeed) {
        return;
      }
      const params = {};
      switch (this.accessory.context.eweUIID) {
        case 36:
          params.bright = Math.round((value * 9) / 10 + 10);
          // KING-M4 eWeLink scale is 10-100 and HomeKit scale is 0-100
          break;
        case 44:
          params.brightness = value;
          // D1 eWeLink scale matches HomeKit scale of 0-100
          params.mode = 0;
          break;
        case 57:
          params.channel0 = Math.round((value * 23) / 10 + 25).toString();
          // Device eWeLink scale is 25-255 and HomeKit scale is 0-100.
          break;
        default:
          return;
      }
      await this.platform.sendDeviceUpdate(this.accessory, params);
      this.cacheSpeed = value;
      if (this.enableLogging) {
        this.log('[%s] %s [%s%].', this.name, this.lang.curSpeed, this.cacheSpeed);
      }
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, true);
      setTimeout(() => {
        this.service.updateCharacteristic(this.hapChar.RotationSpeed, this.cacheSpeed);
      }, 2000);
      throw new this.hapErr(-70402);
    }
  }

  async externalUpdate(params) {
    try {
      if (this.accessory.context.eweUIID === 57) {
        if (params.state && params.state !== this.cacheState) {
          this.service.updateCharacteristic(this.hapChar.On, params.state === 'on');
          this.cacheState = params.state;
          if (params.updateSource && this.enableLogging) {
            this.log('[%s] %s [%s].', this.name, this.lang.curState, this.cacheState);
          }
        }
      } else if (params.switch && params.switch !== this.cacheState) {
        this.service.updateCharacteristic(this.hapChar.On, params.switch === 'on');
        this.cacheState = params.switch;
        if (params.updateSource && this.enableLogging) {
          this.log('[%s] %s [%s].', this.name, this.lang.curState, this.cacheState);
        }
      }

      switch (this.accessory.context.eweUIID) {
        case 36:
          // KING-M4 eWeLink scale is 10-100 and HomeKit scale is 0-100.
          if (hasProperty(params, 'bright')) {
            const nb = Math.round(((params.bright - 10) * 10) / 9);
            if (nb !== this.cacheSpeed) {
              this.service.updateCharacteristic(this.hapChar.RotationSpeed, nb);
              this.cacheSpeed = nb;
              if (params.updateSource && this.enableLogging) {
                this.log('[%s] %s [%s%].', this.name, this.lang.curSpeed, nb);
              }
            }
          }
          break;
        case 44:
          // D1 eWeLink scale matches HomeKit scale of 0-100
          if (hasProperty(params, 'brightness')) {
            const nb = params.brightness;
            if (nb !== this.cacheSpeed) {
              this.service.updateCharacteristic(this.hapChar.RotationSpeed, nb);
              this.cacheSpeed = nb;
              if (params.updateSource && this.enableLogging) {
                this.log('[%s] %s [%s%].', this.name, this.lang.curSpeed, nb);
              }
            }
          }
          break;
        case 57:
          // Device eWeLink scale is 25-255 and HomeKit scale is 0-100.
          if (hasProperty(params, 'channel0')) {
            const ns = Math.round(((parseInt(params.channel0, 10) - 25) * 10) / 23);
            if (ns !== this.cacheSpeed) {
              this.service.updateCharacteristic(this.hapChar.RotationSpeed, ns);
              this.cacheSpeed = ns;
              if (params.updateSource && this.enableLogging) {
                this.log('[%s] %s [%s%].', this.name, this.lang.curSpeed, ns);
              }
            }
          }
          break;
        default:
      }
    } catch (err) {
      this.platform.deviceUpdateError(this.accessory, err, false);
    }
  }

  markStatus(isOnline) {
    this.isOnline = isOnline;

    // Show as off if offlineAsOff is enabled
    if (this.offlineAsOff && !isOnline && this.cacheState !== 'off') {
      this.service.updateCharacteristic(this.hapChar.On, false);
      this.cacheState = 'off';
      if (this.enableLogging) {
        this.log('[%s] %s [%s - offline]', this.name, this.lang.curState, this.cacheState);
      }
    }
  }

  currentState() {
    const toReturn = {};
    toReturn.services = ['light'];
    toReturn.light = {
      state: this.service.getCharacteristic(this.hapChar.On).value ? 'on' : 'off',
      speed: this.service.getCharacteristic(this.hapChar.RotationSpeed).value,
    };
    return toReturn;
  }
}