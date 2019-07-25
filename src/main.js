
window.showModal = async function showModal({
    upload_mode = false,
    readOnly = true,
    selector = '#photos_modal',
    title = 'Photo manager'
}) {

    const def_uid = event.target.attributes.def.value
    const insp_uid = event.target.attributes.insp.value

    const that = event.target
    //const devMode = process.env.NODE_ENV == 'development'
    //if (devMode) let elems = [{ "Code": "11129", "Nature": "Operational readiness of lifesaving appliances", "Remark": "Freefall life boat release system defective" }, { "Code": "10114", "Nature": "Voyage data recorder (VDR)/Simplified Voyage data recorder(S-VDR)", "Remark": "Hydrostatic release unit expired at VDR float-free capsule since December 2018" }, { "Code": "04110", "Nature": "Abandon ship drills", "Remark": "No record to document that freefall life boat has been manoeuvred in water in past 3 months" }]

    const functions = await import(/* webpackChunkName: "functions" */ './functions').then(m => m.default)

    import(/* webpackChunkName: "main.scss" */ "./styles/main.scss")

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
        minWidth: 777,
        maxWidth: 1777,
        position: ['center', '10'],
        minHeight: window.screen.availTop || 400,
        maxHeigh: window.screen.height / 2,

        create: function (event) { $(event.target).parent().css('position', 'fixed'); },
        buttons: { /*  Ok: function() { $( this ).dialog( "destroy" ); }*/ },
        close: (() => EventBus.$emit('modal_closed')),
        open: () => $(selector).dialog({ position: ['center', '10'] })
    })
    /* OLDWAY:
        //import { reAppendToBody, getDataFromTable } from './functions'
        //reAppendToBody(that)
        */
    //OLD WAY => import App from './App.vue'
    //!('Vue' in window) &&
    if (!('Vue' in window))
        window.Vue = await import(
            /* webpackChunkName: "VUE" */
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../node_modules/vue/dist/vue.min.js').then(m => m.default)
    window.EventBus = new Vue()
    await import(
        /* webpackChunkName: "viewer_init" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        './v-viewer-init').then(m => m.default)
    Vue.config.devtools = true

    const App = await import(
        /*webpackChunkName: "app_vue"*/
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        './App.vue').then(m => m.default)
    window.VUE_PICTURE = new Vue({ el: '#vue_insert', render: h => h(App), });

    const elems = functions.getDataFromTable({ that })
    const props = { def_uid, insp_uid, elems, upload_mode, readOnly }
    EventBus.$emit('get_info_global', props) //photos_modal_app.get_info(props) //easy .!.
}

