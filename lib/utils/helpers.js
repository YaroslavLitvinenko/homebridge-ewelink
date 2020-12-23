/* jshint -W014, -W033, esversion: 9 */
/* eslint-disable new-cap */
'use strict'
module.exports = {
  sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
  hasProperty: (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop),
  appId: 'oeVkj2lYFGnJu5XUtWisfW4utiN4u9Mq',
  appSecret: '6Nz4n0xA8s8qdxQf2GqurZj2Fs55FUvM',
  httpRetryCodes: ['ENOTFOUND', 'ETIMEDOUT', 'EAI_AGAIN'],
  allowedGroups: [
    'blind', 'garage', 'garage_two', 'garage_four',
    'garage_eachen', 'lock', 'switch_valve', 'valve',
    'valve_two'
  ],
  defaults: {
    inUsePowerThreshold: 0,
    lowBattThreshold: 25,
    sensorTimeLength: 60,
    sensorTimeDifference: 120
  },
  devicesLAN: [1, 2, 3, 4, 5, 6, 7, 8, 9, 32, 77, 78],
  devicesSingleSwitch: [1, 5, 6, 14, 15, 22, 24, 27, 32, 36, 44, 59, 104],
  devicesMultiSwitch: [2, 3, 4, 7, 8, 9, 29, 30, 31, 34, 41],
  devicesSingleSwitchOutlet: ['Sonoff Pow', 'S20', 'S26', 'S26R1', 'S55', 'S55R1'],
  devicesBrightable: [36, 44],
  devicesColourable: [22, 59, 104],
  devicesCTempable: [103],
  devicesCurtain: [11],
  devicesSensor: [102],
  devicesThermostat: [15],
  devicesFan: [34],
  devicesDiffuser: [25],
  devicesOutlet: [32],
  devicesCamera: [87],
  devicesEweCamera: [65],
  devicesUSB: [77],
  devicesSCM: [78],
  devicesRFBridge: [28],
  devicesZBBridge: [66],
  devicesZB: [1000, 1009, 1256, 1770, 2026, 3026],
  paramsToKeep: [
    'battery', 'bright', 'brightness',
    'channel', 'cmd', 'color', 'colorB',
    'colorG', 'colorR', 'current',
    'currentHumidity', 'currentTemperature',
    'humidity', 'key', 'lightbright',
    'lightswitch', 'lightRcolor',
    'lightGcolor', 'lightBcolor', 'lock',
    'ltype', 'mainSwitch', 'mode', 'motion',
    'online', 'power', 'rfChl', 'rfList',
    'rfTrig', 'sensorType', 'setclose', 'state',
    'switch', 'switches', 'temperature',
    'trigTime', 'type', 'voltage', 'white',
    'zyx_mode'
  ],
  eveUUID: {
    currentConsumption: 'E863F10D-079E-48FF-8F27-9C2605A29F52',
    totalConsumption: 'E863F10C-079E-48FF-8F27-9C2605A29F52',
    voltage: 'E863F10A-079E-48FF-8F27-9C2605A29F52',
    electricCurrent: 'E863F126-079E-48FF-8F27-9C2605A29F52',
    resetTotal: 'E863F112-079E-48FF-8F27-9C2605A29F52',
    lastActivation: 'E863F11A-079E-48FF-8F27-9C2605A29F52'
  },
  defaultMultiSwitchOff: [
    {
      switch: 'off',
      outlet: 0
    },
    {
      switch: 'off',
      outlet: 1
    },
    {
      switch: 'off',
      outlet: 2
    },
    {
      switch: 'off',
      outlet: 3
    }
  ],
  defaultCurtainCache: {
    cacheCurrentPosition: 0
  },
  defaultBlindCache: {
    cacheCurrentPosition: 0,
    cachePositionState: 2,
    cacheTargetPosition: 0
  },
  defaultGarageCache: {
    cacheCurrentDoorState: 1,
    cacheTargetDoorState: 1
  },
  defaultGarageTwoCache: {
    cacheOneCurrentDoorState: 1,
    cacheOneTargetDoorState: 1,
    cacheTwoCurrentDoorState: 1,
    cacheTwoTargetDoorState: 1
  },
  defaultGarageFourCache: {
    cacheStates: [
      {
        cacheCurrentDoorState: 1,
        cacheTargetDoorState: 1
      },
      {
        cacheCurrentDoorState: 1,
        cacheTargetDoorState: 1
      },
      {
        cacheCurrentDoorState: 1,
        cacheTargetDoorState: 1
      },
      {
        cacheCurrentDoorState: 1,
        cacheTargetDoorState: 1
      }
    ]
  },
  hs2rgb: hs => {
    const h = parseInt(hs[0]) / 360
    const s = parseInt(hs[1]) / 100
    const l = 0.5
    let t3
    let val
    if (s === 0) {
      val = l * 255
      return [Math.round(val), Math.round(val), Math.round(val)]
    }
    const t2 = l + s - l * s
    const t1 = 2 * l - t2
    const rgb = [0, 0, 0]
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1)
      if (t3 < 0) t3++
      if (t3 > 1) t3--
      if (t3 * 6 < 1) {
        val = t1 + (t2 - t1) * 6 * t3
      } else if (t3 * 2 < 1) {
        val = t2
      } else if (t3 * 3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
      } else {
        val = t1
      }
      rgb[i] = Math.round(val * 255)
    }
    return rgb
  },
  rgb2hs: rgb => {
    const r = parseInt(rgb[0]) / 255
    const g = parseInt(rgb[1]) / 255
    const b = parseInt(rgb[2]) / 255
    const min = Math.min(r, g, b)
    const max = Math.max(r, g, b)
    const delta = max - min
    let h
    let s
    if (max === min) {
      h = 0
    } else if (r === max) {
      h = (g - b) / delta
    } else if (g === max) {
      h = 2 + (b - r) / delta
    } else if (b === max) {
      h = 4 + (r - g) / delta
    }
    h = Math.min(h * 60, 360)
    if (h < 0) h += 360
    const l = (min + max) / 2
    if (max === min) {
      s = 0
    } else if (l <= 0.5) {
      s = delta / (max + min)
    } else {
      s = delta / (2 - max - min)
    }
    return [Math.round(h), Math.round(s * 100)]
  },
  m2hs: m => {
    const table = {
      100: [19, 222.1],
      101: [18.7, 222.2],
      102: [18.4, 222.3],
      103: [18.2, 222.3],
      104: [17.9, 222.4],
      105: [17.6, 222.5],
      106: [17.3, 222.7],
      107: [17, 222.8],
      108: [16.7, 222.9],
      109: [16.4, 223],
      110: [16.1, 223.2],
      111: [15.8, 223.3],
      112: [15.4, 223.4],
      113: [15.2, 223.6],
      114: [14.9, 223.8],
      115: [14.7, 223.9],
      116: [14.3, 224.1],
      117: [14.1, 224.2],
      118: [13.8, 224.4],
      119: [13.5, 224.6],
      120: [13.2, 224.8],
      121: [12.9, 225],
      122: [12.5, 225.3],
      123: [12.2, 225.6],
      124: [11.8, 225.9],
      125: [11.4, 226.3],
      126: [11.1, 226.7],
      127: [10.7, 227.1],
      128: [10.3, 227.6],
      129: [9.9, 228],
      130: [9.6, 228.5],
      131: [9.3, 229.1],
      132: [8.9, 229.6],
      133: [8.5, 230.2],
      134: [8.2, 230.9],
      135: [7.8, 231.6],
      136: [7.5, 232.5],
      137: [7.1, 233.5],
      138: [6.7, 234.6],
      139: [6.3, 235.8],
      140: [6, 237.1],
      141: [5.6, 238.9],
      142: [5.2, 240.9],
      143: [5, 242.9],
      144: [4.8, 244.9],
      145: [4.6, 246.9],
      146: [4.4, 249.3],
      147: [4.3, 251.9],
      148: [4.1, 254.9],
      149: [3.9, 258],
      150: [3.7, 261.8],
      151: [3.4, 265.9],
      152: [3.2, 271],
      153: [3, 276.4],
      154: [2.8, 283.6],
      155: [2.6, 290.4],
      156: [2.3, 295.3],
      157: [2.1, 300],
      158: [1.9, 300],
      159: [1.6, 300],
      160: [1.4, 195.8],
      161: [1.2, 84.3],
      162: [1.3, 58.2],
      163: [1.5, 55.9],
      164: [1.7, 53.2],
      165: [1.9, 50.2],
      166: [2.1, 47.1],
      167: [2.4, 44.5],
      168: [2.6, 42.6],
      169: [2.9, 40.9],
      170: [3.1, 39.5],
      171: [3.4, 38.3],
      172: [3.7, 37.3],
      173: [3.9, 36.5],
      174: [4.2, 35.7],
      175: [4.4, 35.1],
      176: [4.6, 34.5],
      177: [4.9, 34],
      178: [5.1, 33.5],
      179: [5.3, 33],
      180: [5.6, 32.7],
      181: [5.8, 32.3],
      182: [6, 32],
      183: [6.3, 31.7],
      184: [6.5, 31.4],
      185: [6.7, 31.2],
      186: [7, 30.9],
      187: [7.2, 30.7],
      188: [7.4, 30.5],
      189: [7.6, 30.3],
      190: [7.9, 30.1],
      191: [8.1, 29.9],
      192: [8.4, 29.7],
      193: [8.6, 29.6],
      194: [8.9, 29.5],
      195: [9.1, 29.3],
      196: [9.4, 29.2],
      197: [9.6, 29.1],
      198: [9.8, 29],
      199: [10, 28.9],
      200: [10.2, 28.7],
      201: [10.5, 28.7],
      202: [10.7, 28.6],
      203: [11, 28.5],
      204: [11.2, 28.4],
      205: [11.4, 28.3],
      206: [11.6, 28.3],
      207: [11.8, 28.2],
      208: [12.1, 28.1],
      209: [12.3, 28.1],
      210: [12.5, 28],
      211: [12.7, 28],
      212: [12.9, 27.9],
      213: [13.2, 27.8],
      214: [13.4, 27.8],
      215: [13.6, 27.7],
      216: [13.8, 27.7],
      217: [14, 27.7],
      218: [14.3, 27.6],
      219: [14.5, 27.6],
      220: [14.7, 27.5],
      221: [14.9, 27.5],
      222: [15.1, 27.5],
      223: [15.3, 27.4],
      224: [15.5, 27.4],
      225: [15.8, 27.4],
      226: [16, 27.3],
      227: [16.2, 27.3],
      228: [16.4, 27.3],
      229: [16.6, 27.3],
      230: [16.8, 27.2],
      231: [17, 27.2],
      232: [17.2, 27.2],
      233: [17.4, 27.2],
      234: [17.6, 27.2],
      235: [17.8, 27.1],
      236: [18, 27.1],
      237: [18.2, 27.1],
      238: [18.4, 27.1],
      239: [18.7, 27.1],
      240: [18.8, 27],
      241: [19, 27],
      242: [19.2, 27],
      243: [19.4, 27],
      244: [19.6, 27],
      245: [19.8, 27],
      246: [20, 27],
      247: [20.3, 26.9],
      248: [20.5, 26.9],
      249: [20.6, 26.9],
      250: [20.8, 26.9],
      251: [21, 26.9],
      252: [21.3, 26.9],
      253: [21.5, 26.9],
      254: [21.6, 26.9],
      255: [21.8, 26.8],
      256: [22, 26.8],
      257: [22.2, 26.8],
      258: [22.4, 26.8],
      259: [22.6, 26.8],
      260: [22.8, 26.8],
      261: [23, 26.8],
      262: [23.2, 26.8],
      263: [23.4, 26.8],
      264: [23.6, 26.8],
      265: [23.8, 26.8],
      266: [24, 26.8],
      267: [24.1, 26.8],
      268: [24.3, 26.8],
      269: [24.5, 26.8],
      270: [24.7, 26.8],
      271: [24.8, 26.8],
      272: [25.1, 26.7],
      273: [25.3, 26.7],
      274: [25.4, 26.7],
      275: [25.6, 26.7],
      276: [25.8, 26.7],
      277: [26, 26.7],
      278: [26.1, 26.7],
      279: [26.3, 26.7],
      280: [26.5, 26.7],
      281: [26.7, 26.7],
      282: [26.9, 26.7],
      283: [27.1, 26.7],
      284: [27.3, 26.7],
      285: [27.5, 26.7],
      286: [27.7, 26.7],
      287: [27.8, 26.7],
      288: [28, 26.7],
      289: [28.2, 26.7],
      290: [28.4, 26.7],
      291: [28.6, 26.7],
      292: [28.8, 26.7],
      293: [28.9, 26.7],
      294: [29.1, 26.7],
      295: [29.3, 26.7],
      296: [29.5, 26.7],
      297: [29.6, 26.7],
      298: [29.8, 26.7],
      299: [30, 26.7],
      300: [30.2, 26.7],
      301: [30.4, 26.7],
      302: [30.5, 26.7],
      303: [30.7, 26.7],
      304: [30.9, 26.7],
      305: [31.1, 26.7],
      306: [31.2, 26.7],
      307: [31.4, 26.7],
      308: [31.6, 26.7],
      309: [31.8, 26.8],
      310: [31.9, 26.8],
      311: [32.1, 26.8],
      312: [32.3, 26.8],
      313: [32.5, 26.8],
      314: [32.6, 26.8],
      315: [32.8, 26.8],
      316: [33, 26.8],
      317: [33.2, 26.8],
      318: [33.3, 26.8],
      319: [33.5, 26.8],
      320: [33.7, 26.8],
      321: [33.8, 26.8],
      322: [34, 26.8],
      323: [34.2, 26.8],
      324: [34.4, 26.8],
      325: [34.5, 26.8],
      326: [34.7, 26.8],
      327: [34.9, 26.8],
      328: [35.1, 26.8],
      329: [35.2, 26.8],
      330: [35.4, 26.8],
      331: [35.5, 26.8],
      332: [35.7, 26.8],
      333: [35.9, 26.8],
      334: [36.1, 26.8],
      335: [36.3, 26.9],
      336: [36.5, 26.9],
      337: [36.7, 26.9],
      338: [36.9, 26.9],
      339: [37.1, 26.9],
      340: [37.2, 26.9],
      341: [37.4, 26.9],
      342: [37.5, 26.9],
      343: [37.7, 26.9],
      344: [37.9, 26.9],
      345: [38.1, 26.9],
      346: [38.3, 26.9],
      347: [38.5, 26.9],
      348: [38.7, 26.9],
      349: [38.9, 26.9],
      350: [39, 26.9],
      351: [39.2, 26.9],
      352: [39.3, 27],
      353: [39.5, 27],
      354: [39.7, 27],
      355: [39.9, 27],
      356: [40.1, 27],
      357: [40.2, 27],
      358: [40.4, 27],
      359: [40.6, 27],
      360: [40.8, 27],
      361: [40.9, 27],
      362: [41.1, 27],
      363: [41.2, 27],
      364: [41.4, 27],
      365: [41.6, 27],
      366: [41.8, 27],
      367: [42, 27],
      368: [42.1, 27.1],
      369: [42.3, 27.1],
      370: [42.4, 27.1],
      371: [42.6, 27.1],
      372: [42.8, 27.1],
      373: [43, 27.1],
      374: [43.1, 27.1],
      375: [43.2, 27.1],
      376: [43.4, 27.1],
      377: [43.6, 27.1],
      378: [43.8, 27.1],
      379: [43.9, 27.1],
      380: [44.1, 27.1],
      381: [44.3, 27.2],
      382: [44.4, 27.2],
      383: [44.6, 27.2],
      384: [44.7, 27.2],
      385: [44.9, 27.2],
      386: [45.1, 27.2],
      387: [45.3, 27.2],
      388: [45.5, 27.2],
      389: [45.6, 27.2],
      390: [45.8, 27.2],
      391: [46, 27.2],
      392: [46.2, 27.2],
      393: [46.4, 27.3],
      394: [46.5, 27.3],
      395: [46.7, 27.3],
      396: [46.9, 27.3],
      397: [47.1, 27.3],
      398: [47.2, 27.3],
      399: [47.4, 27.3],
      400: [47.6, 27.3],
      401: [47.7, 27.3],
      402: [47.9, 27.3],
      403: [48.1, 27.3],
      404: [48.3, 27.3],
      405: [48.5, 27.4],
      406: [48.7, 27.4],
      407: [48.8, 27.4],
      408: [49, 27.4],
      409: [49.2, 27.4],
      410: [49.4, 27.4],
      411: [49.6, 27.4],
      412: [49.7, 27.4],
      413: [49.9, 27.4],
      414: [50.1, 27.4],
      415: [50.2, 27.4],
      416: [50.4, 27.4],
      417: [50.6, 27.5],
      418: [50.7, 27.5],
      419: [50.9, 27.5],
      420: [51.1, 27.5],
      421: [51.2, 27.5],
      422: [51.4, 27.5],
      423: [51.6, 27.5],
      424: [51.7, 27.5],
      425: [51.9, 27.5],
      426: [52.1, 27.5],
      427: [51.2, 27.6],
      428: [52.4, 27.6],
      429: [52.5, 27.6],
      430: [52.7, 27.6],
      431: [52.9, 27.6],
      432: [53.1, 27.6],
      433: [53.2, 27.6],
      434: [53.4, 27.6],
      435: [53.6, 27.6],
      436: [53.7, 27.6],
      437: [53.9, 27.6],
      438: [54.1, 27.7],
      439: [54.2, 27.7],
      440: [54.3, 27.7],
      441: [54.5, 27.7],
      442: [54.7, 27.7],
      443: [54.8, 27.7],
      444: [55, 27.7],
      445: [55.2, 27.7],
      446: [55.3, 27.7],
      447: [55.5, 27.7],
      448: [55.7, 27.7],
      449: [55.8, 27.8],
      450: [56, 27.8],
      451: [56.2, 27.8],
      452: [56.3, 27.8],
      453: [56.5, 27.8],
      454: [56.7, 27.8],
      455: [56.8, 27.8],
      456: [57, 27.8],
      457: [57.2, 27.8],
      458: [57.3, 27.9],
      459: [57.4, 27.9],
      460: [57.6, 27.9],
      461: [57.8, 27.9],
      462: [57.9, 27.9],
      463: [58.1, 27.9],
      464: [58.3, 27.9],
      465: [58.4, 27.9],
      466: [58.6, 27.9],
      467: [58.8, 27.9],
      468: [59, 28],
      469: [59.1, 28],
      470: [59.2, 28],
      471: [59.4, 28],
      472: [59.6, 28],
      473: [59.7, 28],
      474: [60, 28],
      475: [60.1, 28],
      476: [60.2, 28],
      477: [60.4, 28],
      478: [60.6, 28.1],
      479: [60.7, 28.1],
      480: [60.9, 28.1],
      481: [60.1, 28.1],
      482: [60.3, 28.1],
      483: [61.4, 28.1],
      484: [61.5, 28.1],
      485: [61.7, 28.1],
      486: [61.9, 28.1],
      487: [62, 28.2],
      488: [62.2, 28.2],
      489: [62.3, 28.2],
      490: [62.5, 28.2],
      491: [62.7, 28.2],
      492: [62.8, 28.2],
      493: [63, 28.2],
      494: [63.2, 28.2],
      495: [63.3, 28.2],
      496: [63.4, 28.2],
      497: [63.6, 28.2],
      498: [63.8, 28.3],
      499: [63.9, 28.3],
      500: [64.1, 28.3]
    }
    const input = Math.min(Math.max(Math.round(m), 140), 500)
    const toReturn = table[input]
    return [Math.round(toReturn[1]), Math.round(toReturn[0])]
  },
  chansFromUiid: {
    1: 1, // "SOCKET"                                  \\ 20, MINI, BASIC, S26
    2: 2, // "SOCKET_2"                                \\
    3: 3, // "SOCKET_3"                                \\
    4: 4, // "SOCKET_4",                               \\
    5: 1, // "SOCKET_POWER"                            \\
    6: 1, // "SWITCH"                                  \\ T1 1C, TX1C
    7: 2, // "SWITCH_2"                                \\ T1 2C, TX2C
    8: 3, // "SWITCH_3"                                \\ T1 3C, TX3C
    9: 4, // "SWITCH_4"                                \\
    10: 0, // "OSPF"                                   \\
    11: 1, // "CURTAIN"                                \\ King Q4 Cover
    12: 0, // "EW-RE"                                  \\
    13: 0, // "FIREPLACE"                              \\
    14: 1, // "SWITCH_CHANGE"                          \\
    15: 1, // "THERMOSTAT"                             \\ TH10, TH16
    16: 0, // "COLD_WARM_LED"                          \\
    17: 0, // "THREE_GEAR_FAN"                         \\
    18: 0, // "SENSORS_CENTER"                         \\
    19: 0, // "HUMIDIFIER"                             \\
    22: 1, // "RGB_BALL_LIGHT"                         \\ B1, B1_R2
    23: 0, // "NEST_THERMOSTAT"                        \\
    24: 1, // "GSM_SOCKET"                             \\
    25: 0, // "AROMATHERAPY",                          \\ Diffuser, Komeito 1515-X
    26: 0, // "RuiMiTeWenKongQi"                       \\
    27: 1, // "GSM_UNLIMIT_SOCKET"                     \\
    28: 1, // "RF_BRIDGE"                              \\ RFBridge, RF_Bridge
    29: 2, // "GSM_SOCKET_2"                           \\
    30: 3, // "GSM_SOCKET_3"                           \\
    31: 4, // "GSM_SOCKET_4"                           \\
    32: 1, // "POWER_DETECTION_SOCKET"                 \\ Pow_R2 POW
    33: 0, // "LIGHT_BELT",                            \\
    34: 4, // "FAN_LIGHT"                              \\ iFan02, iFan
    35: 0, // "EZVIZ_CAMERA",                          \\
    36: 1, // "SINGLE_CHANNEL_DIMMER_SWITCH"           \\ KING-M4
    38: 0, // "HOME_KIT_BRIDGE",                       \\
    40: 0, // "FUJIN_OPS"                              \\
    41: 4, // "CUN_YOU_DOOR"                           \\
    42: 0, // "SMART_BEDSIDE_AND_NEW_RGB_BALL_LIGHT"   \\
    43: 0, // "?"                                      \\
    44: 1, // "SNOFF_LIGHT"                            \\ D1
    45: 0, // "DOWN_CEILING_LIGHT"                     \\
    46: 0, // "AIR_CLEANER"                            \\
    49: 0, // "MACHINE_BED"                            \\
    51: 0, // "COLD_WARM_DESK_LIGHT"                   \\
    52: 0, // "DOUBLE_COLOR_DEMO_LIGHT"                \\
    53: 0, // "ELECTRIC_FAN_WITH_LAMP"                 \\
    55: 0, // "SWEEPING_ROBOT"                         \\
    56: 0, // "RGB_BALL_LIGHT_4"                       \\
    57: 0, // "MONOCHROMATIC_BALL_LIGHT"               \\
    59: 1, // "MUSIC_LIGHT_BELT"                       \\ L1
    60: 0, // "NEW_HUMIDIFIER"                         \\
    61: 0, // "KAI_WEI_ROUTER"                         \\
    62: 0, // "MEARICAMERA"                            \\
    64: 0, // "HeatingTable"                           \\
    65: 0, // "CustomCamera"                           \\ eWeLink camera app
    66: 0, // "ZIGBEE_MAIN_DEVICE"                     \\
    67: 0, // "RollingDoor"                            \\
    68: 0, // "KOOCHUWAH"                              \\ a whhaaaaat?
    69: 0, // "ATMOSPHERE_LAMP"                        \\
    76: 0, // "YI_GE_ER_LAMP"                          \\
    77: 4, // "SINGLE_SOCKET_MULTIPLE"                 \\ (1 socket device using data structure of four :()
    78: 4, // "SINGLE_SWITCH_MULTIPLE"                 \\ (1 switch device using data structure of four :()
    79: 0, // "CHRISTMAS_LIGHT"                        \\
    80: 0, // "HANYUAN_AIR_CONDITION"                  \\
    81: 1, // "GSM_SOCKET_NO_FLOW"                     \\
    82: 2, // "GSM_SOCKET_2_NO_FLOW"                   \\
    83: 3, // "GSM_SOCKET_3_NO_FLOW"                   \\
    84: 4, // "GSM_SOCKET_4_NO_FLOW"                   \\
    86: 0, // "CLEAR_BOOT"                             \\
    87: 0, // "EWELINK_IOT_CAMERA"                     \\ GK-200MP2B
    88: 0, // "YK_INFRARED"                            \\
    89: 0, // "SMART_OPEN_MACHINE"                     \\
    90: 0, // "GSM_RFBridge"                           \\
    91: 0, // "ROLLING_DOOR_91"                        \\
    93: 0, // "HTHD_AIR_CLEANER"                       \\
    94: 0, // "YIAN_ELECTRIC_PROTECT"                  \\
    98: 0, // "DOORBELL_RFBRIDGE"                      \\
    102: 1, // "DOOR_MAGNETIC"                         \\ OPL-DMA, DW2
    103: 1, // "WOTEWODE_TEM_LIGHT"                    \\ B02-F
    104: 1, // "WOTEWODE_RGB_TEM_LIGHT"                \\
    107: 0, // "GSM_SOCKET_NO_FLOW"                    \\
    109: 0, // "YK_INFRARED_2"                         \\
    1000: 1, // "ZIGBEE_WIRELESS_SWITCH"               \\
    1001: 0, // "BLADELESS_FAN"                        \\
    1002: 0, // "NEW_HUMIDIFIER"                       \\
    1003: 0, // "WARM_AIR_BLOWER"                      \\
    1009: 1, // ""                                     \\ Some sort of single switch device
    1256: 1, // "ZIGBEE_SINGLE_SWITCH"                 \\
    1770: 1, // "ZIGBEE_TEMPERATURE_SENSOR"            \\
    2026: 1, // "ZIGBEE_MOBILE_SENSOR"                 \\
    2256: 2, // "ZIGBEE_SWITCH_2"                      \\
    3026: 1, // "ZIGBEE_DOOR_AND_WINDOW_SENSOR"        \\
    3256: 3, // "ZIGBEE_SWITCH_3"                      \\
    4026: 1, // "ZIGBEE_WATER_SENSOR"                  \\
    4256: 4 // "ZIGBEE_SWITCH_4"                       \\
  }
}
