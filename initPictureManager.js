function initPictureManeger() {
    debugger;
    var BASE_URL = './api/?api=picture-manager&'
    var upload_mode = this.innerText.match(/upload/i);
    showPicturesModal({
        CAN_UPLOAD: window.CAN_UPLOAD,
        upload_mode: upload_mode,
        target: this,
        BASE_URL: BASE_URL,
        locale: 'en',
        title: 'Deficiency Image Data'
    });
}

document.querySelectorAll(".prev_manag a").forEach(function (e) {
    e.addEventListener("click", initPictureManeger);
});