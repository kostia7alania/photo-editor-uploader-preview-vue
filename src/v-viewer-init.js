import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
//import Vue from 'vue'

export default (() => { // https://github.com/fengyuanchen/viewerjs#options
    window.Vue.use(VueViewer.default);
    var options = {
        title: [
            1,
            function (image, imageData) {
                var alt = image.alt;
                var nw = imageData.naturalWidth;
                var nh = imageData.naturalHeight;
                var descr = `${alt} (${nw}× ${nh})`;
                return descr;
            }
        ],
        show: (e) => console.warn('show', e)
    };
    Viewer.setDefaults(options);
})()