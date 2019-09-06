const mutations = {

  sendFeedBack(obj, { index, prop, state }) {// console.log('appErrorsCommit', arguments)
    //obj[prop][index] = state;
    window.devMode && console.log(arguments)
  },
  changeData(state, { index, prop, val }) {// console.log('appErrorsCommit', arguments)
    Vue.set(state, obj[prop], val)
    window.devMode && console.log(arguments)
  },

  SET_STATE(state, { key, val }) {
    Vue.set(state, key, val)
  },


  SET_CREATED_SIGN(state, CREATED_SIGN) {
    Vue.set(state, 'CREATED_SIGN', CREATED_SIGN)
  },
  TOGGLE_upload_mode(state) {
    Vue.set(state, 'upload_mode', !state.upload_mode)
  },
  SET_def_uid(state, def_uid) {
    Vue.set(state, 'def_uid', def_uid)
  },

  TOGGLE_SHOW_UPLOAD_TIP(state, SHOW_UPLOAD_TIP) {
    Vue.set(state, 'SHOW_UPLOAD_TIP', !state.SHOW_UPLOAD_TIP)
  },
  SET_CAN_UPLOAD(state, CAN_UPLOAD) {
    Vue.set(state, 'CAN_UPLOAD', CAN_UPLOAD)
  }
}

export default mutations;