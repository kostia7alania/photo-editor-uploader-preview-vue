import 'viewerjs/dist/viewer.css'
//import Vue from 'vue'

(async function () {
    if (!('Viewer' in window))
        await import(
            /* webpackChunkName: "viewer_init" */
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            './v-viewer-init').then(m => m.default)
}())
export default (() => { // https://github.com/fengyuanchen/viewerjs#options
    window.Vue.use(VueViewer.default);
    var options = {
        title: [
            1,
            function (image, imageData) {
                var alt = image.alt;
                var nw = imageData.naturalWidth;
                var nh = imageData.naturalHeight;
                var descr = `${alt}
                <br>${nw} × ${nh}`;
                return descr;
            }
        ],
        show: (e) => window.devMode && console.warn('show', e)
    };
    window.Viewer.setDefaults(options);
})()