/* jshint node: true, esversion: 10, -W014, -W033 */
/* eslint-disable new-cap */
'use strict'

module.exports = {
  apiListenErr: 'ข้อผิดพลาดเซิร์ฟเวอร์ API ภายใน',
  apiListening: 'การฟัง API ภายในบนพอร์ต',
  apiShutdown: 'API ภายในปิดได้อย่างสมบูรณ์',
  buttonDouble: 'กดสองครั้ง',
  buttonLong: 'กดค้าง',
  buttonNotFound: 'ไม่พบปุ่ม rf (รีสตาร์ท Homebridge)',
  buttonSingle: 'กดครั้งเดียว',
  buttonTrig: 'ปุ่มได้ถูกกระตุ้นแล้ว',
  cantReadPacket: 'ข้อความจาก LAN ไม่สามารถได้เป็น',
  cantParsePacket: 'ไม่สามารถแยกวิเคราะห์แพ็กเก็ต DNS เป็น',
  cfgDef: 'ไม่ใช่ตัวเลขที่ถูกต้องดังนั้นใช้ค่าเริ่มต้นของ',
  cfgDup: 'จะถูกละเว้นเนื่องจากมีรายการอื่นที่มี ID นี้อยู่แล้ว',
  cfgIgn: 'ไม่ได้กำหนดค่าอย่างถูกต้องดังนั้นจะถูกละเว้นไว้',
  cfgIgnItem: 'มีรายการที่ไม่ถูกต้องซึ่งจะถูกละเว้นไว้',
  cfgItem: 'รายการกำหนดค่า',
  cfgLow: 'ถูกตั้งไว้ต่ำเกินไปจึงเพิ่มขึ้นเป็น',
  cfgRmv: 'ไม่ได้ใช้งานและสามารถนำออกได้',
  cfgQts: 'ไม่ควรมีเครื่องหมายคำพูดรอบรายการ',
  complete: '✓ การตั้งค่าเสร็จสมบูรณ์',
  contactNo: 'ไม่พบการติดต่อ',
  contactYes: 'ตรวจพบการติดต่อแล้ว',
  curBatt: 'สถานะแบตเตอรี่',
  curBright: 'ความสว่างในตอนนี้',
  curColour: 'สีตอนนี้',
  curCool: 'ความเย็นในตอนนี้',
  curCurr: 'กระแสในตอนนี้',
  curDehumid: 'ค่าความชื้นในตอนนี้',
  curHeat: 'ค่าความร้อนในตอนนี้',
  curHumi: 'ค่าความชื้นในตอนนี้',
  curHumid: 'ค่าความชื้นในตอนนี้',
  curLight: 'แสงตอนนี้',
  curMode: 'โหมดตอนนี้',
  curPos: 'ตำแหน่งตอนนี้',
  curPower: 'กำลังไฟตอนนี้',
  curPur: 'การทำให้บริสุทธิ์ในตอนนี้',
  curScene: 'ฉากตอนนี้',
  curSpeed: 'ความเร็วในตอนนี้',
  curState: 'สถานะตอนนี้',
  curTarg: 'เป้าหมายตอนนี้',
  curTemp: 'อุณหภูมิตอนนี้',
  curVolt: 'แรงดันตอนนี้',
  devAdd: 'ถูกเพิ่มใน Homebridge แล้ว',
  devInit: 'เริ่มต้นและ',
  devInitGroup: 'เริ่มต้นด้วยรหัสกลุ่ม',
  devInitOpts: 'เริ่มต้นด้วยตัวเลือก',
  devNewNotAdd: 'รีสตาร์ท Homebridge เพื่อเพิ่มอุปกรณ์ใหม่ ไม่สามารถเพิ่มโดยอัตโนมัติเป็น',
  devNoAPIKey: 'ไม่สามารถเรียกคีย์ API ของอุปกรณ์ได้',
  devNoControl: 'ไม่สามารถควบคุมเป็นโหมด: LAN เข้ากันไม่ได้กับอุปกรณ์นี้',
  devNotAdd: 'ไม่สามารถเพิ่มใน Homebridge เป็น',
  devNotConf: 'ไม่สามารถกำหนดค่าเป็น',
  devNotConfLAN: 'อุปกรณ์/คำสั่งไม่พร้อมใช้งานผ่านโหมด LAN',
  devNotFound: 'ไม่พบอุปกรณ์ใน eWeLink',
  devNotInit: 'ไม่สามารถเริ่มต้นเป็น',
  devNotReachLAN: 'อุปกรณ์ไม่สามารถเข้าถึงได้ผ่านโหมด LAN',
  devNotRf: 'ไม่สามารถรีเฟรชได้เป็น',
  devNotRemove: 'ไม่สามารถลบออกจาก Homebridge ได้เหมือน',
  devNotSup: 'ไม่ได้เพิ่มเพราะไม่รองรับ',
  devNotSupYet: 'ไม่รองรับ แจ้งปัญหาใน GitHub ด้วยข้อมูลต่อไปนี้',
  devNotUpd: 'การอัปเดตอุปกรณ์ล้มเหลวเนื่องจาก',
  devRemove: 'ถูกลบออกจาก Homebridge แล้ว',
  disabled: 'หากต้องการเปลี่ยนแปลง ให้ตั้งค่า ปิดการใช้งานปลั๊กอิน เป็น false',
  disabledAL: 'ระบบปรับแสงอัตโนมัติถูกปิดใช้งานเนื่องจากการเปลี่ยนสีอย่างมีนัยสำคัญ',
  disabling: 'ปิดการใช้งานปลั๊กอิน',
  doorClosed: 'ปิดแล้ว',
  doorOpen: 'เปิด',
  dualr3NoCalib: 'ต้องสอบเทียบให้ทำงานในโหมดมอเตอร์',
  dualr3NoMeter: 'ไม่รองรับโหมดมิเตอร์',
  errGetDevice: 'เกิดข้อผิดพลาดระหว่าง http getDevice()',
  errGetDevices: 'เกิดข้อผิดพลาดระหว่าง http getDevices()',
  errGetHomes: 'เกิดข้อผิดพลาดระหว่าง http getHomes()',
  errGetHost: 'เกิดข้อผิดพลาดระหว่าง ws getHost()',
  errLogin: 'เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ http()',
  eweError: 'เกิดข้อผิดพลาด eWeLink [500] ลองอีกครั้งใน 30 วินาที',
  fetchHome: 'กำลังดึงอุปกรณ์จาก eWeLink home/id',
  foundWithIP: 'พบในท้องที่ด้วย IP',
  foundWithManIP: 'ใช้ IP ด้วยตนเอง',
  hbVersionFail: 'เวอร์ชัน Homebridge ของคุณต่ำเกินไป - อัปเดตเป็น v1.3',
  heaterSimNoSensor: 'คุณต้องกำหนดค่า ID อุปกรณ์ที่ให้การอ่านอุณหภูมิ',
  httpDisabled: 'ไคลเอ็นต์ HTTP/WS ถูกปิดใช้งานเป็น',
  httpLogin10003: 'ดู http://bit.ly/hb-ewelink-errors สำหรับข้อมูลเพิ่มเติมเกี่ยวกับปัญหาการเข้าสู่ระบบ',
  httpRetry: 'ไม่สามารถเข้าถึง eWeLink ได้ ลองอีกครั้งใน 30 วินาที',
  identify: 'ระบุปุ่มกด',
  initialised: 'ปลั๊กอินเริ่มต้น กำลังตั้งค่าอุปกรณ์เสริม...',
  initialising: 'กำลังเริ่มต้นปลั๊กอิน',
  invalidConfig: 'config ไม่ถูกต้อง',
  lanDisabled: 'โหมด LAN ถูกปิดใช้งาน',
  lanErr: 'ข้อผิดพลาด LAN ที่ไม่รู้จัก',
  lanIPDifferent: 'ละเว้น IP ด้วยตนเองตั้งแต่ค้นพบด้วย IP ที่แตกต่างกัน',
  lanMonitor: 'เริ่มการตรวจสอบ LAN แล้ว',
  lanNotSup: 'ไม่รองรับโหมด LAN ในการส่งการอัปเดตไปยังอุปกรณ์นี้',
  lanStarted: 'การค้นหาใน LAN เสร็จสมบูรณ์',
  lanStarting: 'การค้นหาใน LAN เริ่มต้นg',
  lanUnsupported: 'โหมด LAN ไม่พร้อมใช้งานเนื่องจากไม่พบ/สนับสนุน',
  leakNo: 'ตรวจไม่พบการรั่ว',
  leakYes: 'ตรวจพบการรั่ว',
  lockLocked: 'ล็อคแล้ว',
  lockUnlocked: 'ปลดล็อคแล้ว',
  missingCreds: 'ไม่ได้กำหนดค่าข้อมูลรับรอง eWeLink',
  motionNo: 'ตรวจไม่พบการเคลื่อนไหว',
  motionYes: 'ตรวจพบการเคลื่อนไหว',
  newIP: 'เปลี่ยนที่อยู่ IP เป็น',
  newRegionRec: 'ได้รับโฮสต์ HTTP API ใหม่แล้ว',
  noAuthRec: 'ไม่ได้รับโทเค็นการตรวจสอบสิทธิ์',
  noGarageForOD: 'ไม่พบอุปกรณ์เสริมประตูโรงรถที่สอดคล้องกัน',
  noRegionRec: 'ไม่ได้รับภูมิภาคที่ถูกต้อง',
  noWSHost: 'เซิร์ฟเวอร์ไม่ตอบสนองกับโฮสต์เว็บซ็อกเก็ต',
  pluginNotConf: 'ปลั๊กอินไม่ได้รับการกำหนดค่า',
  repOffline: 'มีการรายงาน [ออฟไลน์]',
  repOnline: 'มีการรายงาน [ออนไลน์]',
  revertWS: 'เปลี่ยนกลับเป็นเว็บซ็อกเก็ตเป็น',
  rfNotFound: 'ลองรีสตาร์ท Homebridge เนื่องจากไม่พบอุปกรณ์เสริมสำหรับ',
  rfTrigNo: 'ไม่ถูกกระตุ้น',
  rfTrigYes: 'ถูกกระตุ้น',
  sendLogin: 'กำลังส่งคำขอเข้าสู่ระบบ HTTP ()',
  sensorErr: 'ไม่รองรับเป็น ลด/เพิ่มความชื้นเนื่องจากอุปกรณ์ไม่รองรับเซ็นเซอร์',
  sensorNo: 'ปิดการใช้งาน',
  sensorNoDevice: 'ไม่พบอุปกรณ์โรงรถ/ล็อค อุปกรณ์นี้จะถูกตั้งค่าเป็นเซ็นเซอร์ปกติ',
  sensorYes: 'เปิดใช้งาน',
  shareWarn: 'การใช้อุปกรณ์ที่ใช้ร่วมกันกับคลาวด์อาจทำให้เกิดข้อผิดพลาด ใช้บัญชี eWeLink หลักของคุณ',
  smokeNo: 'ตรวจไม่พบควัน',
  smokeYes: 'ตรวจพบควัน',
  sonoffCamera: 'ดูวิกิ homebridge-ewelink สำหรับรายละเอียดเพื่อเปิดใช้งานกล้อง',
  stoppedLAN: 'การตรวจสอบ LAN หยุดลงอย่างสมบูรณ์',
  stoppedWS: 'เว็บซ็อกเก็ตปิดอย่างสมบูรณ์',
  storageClearErr: 'ไม่สามารถล้างโฟลเดอร์ที่เก็บข้อมูลเป็น',
  storageReadErr: 'ไม่สามารถอ่านโฟลเดอร์คงอยู่เป็น',
  storageSetupErr: 'ไม่สามารถตั้งค่าไคลเอนต์ที่เก็บข้อมูลเป็น',
  storageWriteErr: 'ไม่สามารถบันทึกอุปกรณ์เสริมลงในไฟล์เป็น',
  unreachable: 'มันเข้าถึงไม่ได้',
  updRec: 'ได้รับการปรับปรุง',
  updReq: 'ขอสถานะปัจจุบัน',
  updSend: 'กำลังส่งการปรับปรุง',
  valveNo: 'หยุดแล้ว',
  valveYes: 'กำลังดำเนินงาน',
  viaAL: 'ผ่านแสงแบบปรับได้',
  viaLAN: 'ผ่าน LAN',
  viaWS: 'ผ่าน WS',
  wsHostRec: 'ได้รับโฮสต์เว็บซ็อกเก็ต',
  wsLogin: 'กำลังส่งคำขอเข้าสู่ระบบ WS',
  wsLoginErr: 'ได้รับพารามิเตอร์ WS ที่ไม่รู้จัก',
  wsLoginError: 'การเข้าสู่ระบบ WS ล้มเหลวเนื่องจาก',
  wsLoginErrRecon: 'ไม่สามารถเปิด WS ได้และจะลองอีกครั้งใน 5 วินาที',
  wsLoginSuccess: 'เข้าสู่ระบบ WS สำเร็จ',
  wsLogin406: 'การเข้าสู่ระบบ WS ล้มเหลว [406] ดู http://bit.ly/hb-ewelink-errors',
  wsPingError: 'ไม่สามารถส่ง WS ping เป็น',
  wsRec: 'ได้รับข้อความ WS',
  wsReconnectClose: 'WS ปิดเหตุการณ์และจะพยายามเชื่อมต่อใหม่ใน 5 วินาที',
  wsReconnectError: 'เหตุการณ์ข้อผิดพลาด WS และจะพยายามเชื่อมต่อใหม่ใน 5 วินาที',
  wsRef: 'กำลังรีเฟรชการเชื่อมต่อ WS',
  wsRefFail: 'การรีเฟรชการเชื่อมต่อ WS ล้มเหลวเนื่องจาก',
  wsRequired: 'ต้องส่งการอัพเดทมาทางนี้',
  wsReqTimeout: 'หมดเวลาการร้องขอ',
  wsResend: 'เว็บซ็อกเก็ตไม่เปิด - โปรดลองอีกครั้งหลังจากผ่านไปสักครู่',
  wsUnkAct: 'ได้รับข้อความ WS มีการดำเนินการที่ไม่รู้จัก',
  wsUnkCmd: 'ได้รับคำสั่ง WS ที่ไม่รู้จัก',
  wsUnkRes: 'การตอบสนอง WS ที่ไม่รู้จัก',
  zWelcome: [
    'อย่าลืม ☆ ปลั๊กอินนี้บน GitHub หากคุณพบว่ามีประโยชน์!',
    'มีคำขอคุณสมบัติ? เข้าไปที่ http://bit.ly/hb-ewelink-issues เพื่อสอบถาม!',
    'สนใจสนับสนุนปลั๊กอินนี้หรือไม่? https://github.com/sponsors/bwp91',
    'เข้าร่วมชุมชน Discord ของปลั๊กอิน! https://discord.gg/cMGhNtZ3tW',
    'ขอบคุณที่ใช้ปลั๊กอินนี้ ฉันหวังว่าคุณจะพบว่ามีประโยชน์!',
    'ปลั๊กอินนี้สร้างด้วย ♥ โดย bwp91 จากสหราชอาณาจักร!',
    'ลองดูปลั๊กอิน Homebridge อื่นๆ ของฉันสิ! https://github.com/bwp91',
    'มีเวลาให้รีวิวปลั๊กอินนี้หรือไม่? http://bit.ly/hb-ewelink-review',
    'ปลั๊กอินนี้มีคะแนน 5☆ บน HOOBS! http://bit.ly/hb-ewelink-review',
    'ต้องการดูปลั๊กอินนี้ในภาษาของคุณเองหรือ? แจ้งให้เราทราบ!'
  ]
}