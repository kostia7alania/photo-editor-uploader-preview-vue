import functions from './functions'
window.devMode = process.env.NODE_ENV == 'development'



import( /* webpackChunkName: "main.scss" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./styles/main.scss")


window.showPicturesModal = function ({
    CAN_UPLOAD = false,
    upload_mode = false,
    selector = '#photos_modal',
    title = 'Photo manager',
    target = event.target
}) {
    const args = arguments[0];
    const def_uid = target.attributes.def.value
    const insp_uid = target.attributes.insp.value
    const deficiencies = functions.getDataFromTable({ target })
    //const devMode = process.env.NODE_ENV == 'development'
    //if (devMode) let elems = [{ "Code": "11129", "Nature": "Operational readiness of lifesaving appliances", "Remark": "Freefall life boat release system defective" }, { "Code": "10114", "Nature": "Voyage data recorder (VDR)/Simplified Voyage data recorder(S-VDR)", "Remark": "Hydrostatic release unit expired at VDR float-free capsule since December 2018" }, { "Code": "04110", "Nature": "Abandon ship drills", "Remark": "No record to document that freefall life boat has been manoeuvred in water in past 3 months" }]

    functions.reAppendToBody({ selector, title })
    let w = (window.innerWidth / 1.2)
    w = w > 1000 ? 1000 : w;
    $(selector).dialog({
        // width: "auto",
        title,
        closeOnEscape: false,
        modal: true,
        height: window.screen.availTop || 400,
        width: w || 600,
        minWidth: 577,
        maxWidth: 1777,
        position: ['center', '10'],
        minHeight: 200,

        maxHeigh: window.screen.height / 2,
        create: function (event) {
            //$(event.target).parent().css('position', 'fixed');
        },
        buttons: { /*  Ok: function() { $( this ).dialog( "destroy" ); }*/ },
        close: (() => EventBus.$emit('modal_closed')),
        // open: () => $(selector).dialog({ position: ['center', '10'] })
    });

    (async function () {
        if (!('Vue' in window))
            window.Vue =
                await import( //ОСТОРОЖНО! Тут теряется event и this
                    /* webpackChunkName: "VUE" */
                    /* webpackMode: "lazy" */
                    /* webpackPrefetch: true */
                    /* webpackPreload: true */
                    '../node_modules/vue/dist/vue.min.js')
                    .then(m => m.default)

        import(
            /* webpackChunkName: "viewer_init" */
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            './v-viewer-init').then(m => m.default)

        const createStore = await import(
            /*webpackChunkName: "store"*/
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            './store').then(m => m.default)

        const App = await import(
            /*webpackChunkName: "app_vue"*/
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            './App.vue').then(m => m.default)

        Vue.config.devtools = true

        window.EventBus = new Vue()

        window.VUE_PICTURE = new Vue({
            el: '#vue_insert',
            render: h => h(App, { props: { a: 1 } }),
            store: createStore()

        });
        const props_append = { def_uid, insp_uid, deficiencies, ...args }
        const keys = Object.keys(props_append);
        keys.forEach(key => store.commit("SET_STATE", { key, val: props_append[key] }));



    }())



}