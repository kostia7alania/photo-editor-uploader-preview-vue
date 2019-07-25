//import axios from 'axios'
//window.axios = axios
const getModule = async () => {
    if (!('axios' in window))
        window.axios = await import(
            /* webpackChunkName: "VUE" */
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../node_modules/axios/dist/axios.js').then(m => m.default);
    return window.axios
}
export default getModule();//('axios' in window) && window.axios || axios;


//USAGE:
//"axios" in window ||    (await import(/* webpackChunkName: "http" */ "./http.js").then(        m => (window.axios = m.default)    ));