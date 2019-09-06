//import Vue from 'vue'; --- в тот же вью нужно импортировать!
import Vuex from 'vuex'; Vue.use(Vuex);
import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';
import state from './state.js';
import upload from './modules/upload'
import show from './modules/show'
import login from './modules/login'

import createPersistedState from 'vuex-persistedstate'

/*import Axios from 'axios';require('es6-promise').polyfill();var axios = require('axios');Vue.use(Axios);*/
export default function createStore() { //функция - защита от утечек на серваке=)  https://ssr.vuejs.org/ru/guide/data.html#%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85
  return window.store = new Vuex.Store({
    namespaced: true,
    //plugins: [createPersistedState()],
    state,
    getters,
    mutations,
    actions,
    modules: { upload, show, login }
  });
}