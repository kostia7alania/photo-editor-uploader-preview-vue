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
        let cls = '', id = '';
        if (selector.match('#')) id = `id="${selector.replace('#', '')}_app"`
        else if (selector.match('.')) cls = `class="${selector.replace('.', '')}"`
        div.innerHTML = `
            <div ${id} ${cls}>
                <div id="vue_insert">
                    <h1 style="text-align:center"> LOADING . . . </h1>
                </div>
            </div>`
        if (selector.match('#')) div.setAttribute('id', selector.replace('#', ''));
        else if (selector.match('.')) div.setAttribute('class', selector.replace('.', ''));
        div.setAttribute('title', title);
        document.body.prepend(div)
    },
    getDataFromTable({ target }) {
        let elems = [];
        const get = (tr, n) => $(tr).find('td:nth-child(' + n + ')').html()
        $(target)
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
    },
    modalPageTitleHandler() {
        //const old = $("#photos_modal").dialog("option", "title");
        const modalTitle = "Photo manager";
        const index = store.getters.deficiencies_index
        const elems = store.state.deficiencies
        const title_page = !Number.isNaN(index + 1) && elems.length
            ? ` (${index + 1} / ${elems.length})`
            : "";
        const modal = $("#ui-dialog-title-photos_modal");
        const page = modal.find("#insp-page");
        if (page.length) page.text(title_page);
        else modal.append(`<span id="insp-page">${title_page}</span>`);
    }
}
/*
export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => { // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
*/

