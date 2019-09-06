import functions from '../../functions'

export default {
    state: {
        INSP_PHOTOS: [],
        LOADING: false,
        TOO_LONG_LOADING: false,
        ERROR: null,
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
        SET_TOO_LONG_LOADING(state, TOO_LONG_LOADING) {
            Vue.set(state, 'TOO_LONG_LOADING', TOO_LONG_LOADING)
        },
        SET_ERROR(state, ERROR) {
            Vue.set(state, 'ERROR', ERROR)
        },
        SET_INSP_PHOTOS(state, INSP_PHOTOS) {
            Vue.set(state, 'INSP_PHOTOS', INSP_PHOTOS)
        },
    },
    actions: {
        async GET_INSP_PHOTOS({ state, dispatch, commit, rootState }) {
            if (!rootState.def_uid || !rootState.insp_uid) return;
            commit('SET_LOADING_ON');
            commit('SET_INSP_PHOTOS', [])
            const url = `${rootState.BASE_URL}action=viewimage&def_uid=${rootState.def_uid}&insp_uid=${rootState.insp_uid}`;
            commit('SET_TOO_LONG_LOADING', setTimeout(() => (state.TOO_LONG_LOADING = true), 1000));
            window.clearTimeout(state.TOO_LONG_LOADING);
            commit('SET_ERROR', null)

            "axios" in window || (await import(/* webpackChunkName: "http" */ "../../http.js").then(
                m => (window.axios = m.default)
            ));
            axios
                .get(url)
                .then(res => {
                    const images = [];
                    const result = res.data;

                    if (typeof result == "object" && '@attributes' in result) {//все ок, ответ верен!
                        if (result['@attributes'].Observer)
                            commit('SET_CAN_UPLOAD', result['@attributes'].Observer == 'false')//if Observer = false, then user cant upload (READONLY mode)!

                        if (!("File" in result)) return commit('SET_INSP_PHOTOS', [])
                        if (typeof result.File["@attributes"] != "undefined")
                            images.push(result.File["@attributes"]);
                        else result.File.forEach(e => images.push(e["@attributes"]));
                        window.devMode && console.log(result.File["@attributes"]);
                        return commit('SET_INSP_PHOTOS', images)
                    }
                    throw "server wrong answer";
                })
                .catch(err => {
                    console.warn("GET_INSP_PHOTOS catch  .!.=>" + err);
                    err = typeof err == 'object' ? err.response.statusText : err;
                    commit('SET_ERROR', err)
                })
                .finally(() => {
                    window.clearTimeout(state.TOO_LONG_LOADING);
                    commit('SET_TOO_LONG_LOADING', false)
                    commit('SET_LOADING_OFF');
                    functions.modalPageTitleHandler();
                });
        }


    },

}