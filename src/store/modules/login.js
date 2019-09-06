import functions from '../../functions'

export default {
    state: {
        LOGIN_ERROR: null,
    },
    getters: {

    },
    mutations: {
        SET_LOADING_OFF(state) {
            Vue.set(state, 'LOADING', false)
        },
        SET_LOADING_ON(state) {
            Vue.set(state, 'LOADING', true)
        },
        SET_LOGIN_ERROR(state, LOGIN_ERROR) {
            Vue.set(state, 'LOGIN_ERROR', LOGIN_ERROR)
        },
    },
    actions: {
        DO_LOGIN({ state, commit, dispatch, rootState }, form) {
            commit('SET_LOADING_ON')
            commit('SET_LOGIN_ERROR', null)
            const formData = new FormData();
            formData.append("AuthUserName", form.AuthUserName);
            formData.append("AuthPassword", form.AuthPassword);
            const url = rootState.BASE_URL + "action=login";
            axios
                .post(url, formData)
                .then(res => {
                    if (typeof res.data !== 'object') throw "server wrong answer";
                    if (res.data.status == 1) {
                        commit('SET_LOGIN_ERROR', false)
                        dispatch('GET_INSP_PHOTOS')
                    }
                    window.devMode && window.devMode && console.log('res=>', res)
                })
                .catch(err => {
                    window.devMode && console.warn("DO_LOGIN catch  .!.=>" + err);
                    err = typeof err == 'object' ? err.response.data && err.response.data.msg || err.response.statusText : err;
                    commit('SET_LOGIN_ERROR', err)
                })
                .finally(() => {
                    commit('SET_LOADING_OFF', false)
                })
        },
    },

}