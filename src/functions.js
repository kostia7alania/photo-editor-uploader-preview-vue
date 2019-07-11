/*export const reAppendToBody = () => {
    $('#photos_modal').remove()
    const div = document.createElement('div')
    div.innerHTML = `
            <div id="photos_modal" title="Photo manager">
                <div id="photos_modal_app">
                    <div id="vue_insert"></div>
                </div>
            </div>`
    const photosDiv = div.querySelector('#photos_modal')
    document.body.prepend(photosDiv)
}

export const getDataFromTable = selector => {
    let elems = [];
    const get = (tr, n) => $(tr).find('td:nth-child(' + n + ')').html()
    $(selector)
        .closest('table')
        .find('tr')
        .each((e, tr) => {
            if ($(tr).find('td').length < 2) return;
            elems.push({
                Code: get(tr, 2),
                Nature: get(tr, 3),
                Remark: get(tr, 4),
                insp: $(tr).find('[insp]').attr('insp'),
                def: $(tr).find('[def]').attr('def')
            })
        })
    return elems
}*/



export default {
    reAppendToBody({ selector = '#photos_modal', title = 'Photo manager' }) {
        $(selector).remove()
        const div = document.createElement('div')
        div.innerHTML = `
            <div id="photos_modal" title="${title}">
                <div id="photos_modal_app">
                    <div id="vue_insert">

                   <h1 style="text-align:center"> LOADING . . . </h1>

                    </div>
                </div>
            </div>`
        const photosDiv = div.querySelector(selector)
        document.body.prepend(photosDiv)
    },
    getDataFromTable({ that }) {
        let elems = [];
        const get = (tr, n) => $(tr).find('td:nth-child(' + n + ')').html()
        $(that)
            .closest('table')
            .find('tr')
            .each((e, tr) => {
                if ($(tr).find('td').length < 2) return;
                elems.push({
                    Code: get(tr, 2),
                    Nature: get(tr, 3),
                    Comments: get(tr, 4), // <!-- elem.Remark <- deprecated!!-->
                    insp: $(tr).find('[insp]').attr('insp'),
                    def: $(tr).find('[def]').attr('def')
                })
            })
        return elems
    }
}