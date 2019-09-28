const devMode = process.env.NODE_ENV == 'development' //window.location.href.match('https')
window.devMode && console.warn('MODE => ', process.env.NODE_ENV, process)
//const BASE_URL = devMode ? './api/?api=picture-manager&' : './api/?api=picture-manager&'
const BASE_URL = './api/?api=picture-manager&'

const state = {
  production: 1, // 0 тест, 1 - продакшн
  saveState: 0,//как изначально работать с сохранением состояния (после обновления стр);
  insp_uid: null,
  def_uid: null,
  upload_mode: false,
  CAN_UPLOAD: false,

  SHOW_UPLOAD_TIP: true,

  deficiencies: [],
  //https://apcis.tmou.org/develop/api?
  BASE_URL,//'http://localhost:8383/rest-api',
  maxFileSize: 5//в мегабайтах
};
export default state
