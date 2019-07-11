<template>
    <div v-if="imgAltComp" class="v-viewer-modal-img">
      <!--
        <img
        :src="prev_img_src"
        :data-original="real_img_src"
        :alt="imgAltCompHTML"
      >
      -->
      <div>
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            :style="{'background-image': 'url('+prev_img_src+')'}"
            :data-original="real_img_src"
            :alt="imgAltComp"
          />
      </div>
    </div>
</template>
<script>
import config from "../../../config";

export default {
  name: "app-images-preview-open",
  props: ["img"],
  computed: {
    url() {
      return config.base_url;
    },
    prev_img_src() {
      return (
        this.url +
        "?action=get-picture&type=small&filename=" +
        this.img.FileName
      );
    },
    real_img_src() {
      return (
        this.url + "?action=get-picture&type=real&filename=" + this.img.FileName
      );
    },
    comments() {
      return this.img.Comments && this.img.Comments.length && this.img.Comments;
    },
    imgAltComp() {
      return `
        ${new Date(this.img.Date).toLocaleString("Ru-ru")}${
        this.comments ? " - " + this.comments : ""
      }
      `;
    },
    imgAltCompHTML() {
      return `<div class="v-viewer-modal-img">
                  <p><b>Date: </b> ${new Date(this.img.Date).toLocaleString(
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