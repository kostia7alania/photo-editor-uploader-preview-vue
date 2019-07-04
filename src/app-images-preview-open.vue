<template>
    <div class="v-viewer-modal-img">
        <img :data-original="'?action=get-picture&type=real&filename='+img.FileName"
            :src="'?action=get-picture&type=small&filename='+img.FileName"
            :alt="imgAltComp">
    </div>
</template>
<script>
export default {
  name: "app-images-preview-open",
  props: ["img"],
  computed: {
    imgAltComp() {
      return `<div class="v-viewer-modal-img">
                  <p><b>Date: </b> ${new Date(this.img.Date).toLocaleDateString(
                    "Ru-ru"
                  )}</p>
                  ${
                    this.img.Comments.trim().length > 0
                      ? "<p><b>Comment:</b> " + this.img.Comments + "</p>"
                      : ""
                  }
                </div>`;
    }
  }
};
</script>