
window.EventBus = new Vue();

import App from './App.vue';

if (window.pic_prew_vue != 1) {
    new Vue({
        el: '#app',
        render: h => h(App),
    });
    window.pic_prew_vue = 1;
}




if (!document.querySelectorAll('#modal').length) {
    var div = document.createElement('div')
    div.innerHTML = '<div id="modal" title="Photo manager"><div id="photos_modal_app"></div></div>'
    var photosDiv = div.querySelector('#modal')
    document.body.prepend(photosDiv)
}

window.showModal = function showModal(def_uid, insp_uid, that, upload_mode = false, readOnly = true) {
    console.log('agr=>',arguments)
    let elems = [];
    let baseUrl = './'
    if(process.env.NODE_ENV != 'development') {
        $(that).parents('table')//getted -> tbody;;;;
        .find('tr').each( (e,tr) => {
            if($(tr).find('td').length<2) return;
            const get = (tr,n) => $(tr).find('td:nth-child('+n+')').html()
            elems.push({
                Code: get(tr, 2),
                Nature: get(tr, 3),
                Remark: get(tr, 4),
                insp: $(tr).find('.showModal').attr('insp'),
                def: $(tr).find('.showModal').attr('def')
            })

        })

        $( "#modal" ).dialog({
            closeOnEscape: false,
            modal: true,
            height: 400,
            width: 600,
            buttons: { /*  Ok: function() { $( this ).dialog( "destroy" ); }*/ }
          });
        $.unblockUI();
    } else { // development DATA:
        //baseUrl = './api'
        elems = [{"Code":"11129","Nature":"Operational readiness of lifesaving appliances","Remark":"Freefall life boat release system defective"},{"Code":"10114","Nature":"Voyage data recorder (VDR)/Simplified Voyage data recorder(S-VDR)","Remark":"Hydrostatic release unit expired at VDR float-free capsule since December 2018"},{"Code":"04110","Nature":"Abandon ship drills","Remark":"No record to document that freefall life boat has been manoeuvred in water in past 3 months"}]
    }
    const props = {def_uid, insp_uid, elems, upload_mode, readOnly, baseUrl}
    EventBus.$emit('get_info_global', props) //photos_modal_app.get_info(props) //easy .!.
}

