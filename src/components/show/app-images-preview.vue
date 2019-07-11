<template>
    <div v-viewer="options" class="v-viewer-modal v-viewer-modal-custom" ref="viewer">

        <div v-for="img in images" class="v-viewer-modal-row" :key="img.FileName">

            <images-preview-open :img="img"/>

            <div class="v-viewer-modal-desc">
                <p><b>Date:</b> {{img.Date | toRuDate}}</p>
                <p><b>Comment:</b> {{img.Comments}}</p>
            </div>

        </div>

    </div>
</template>
<script>
import appImagesPreviewOpenVue from "./app-images-preview-open.vue";
export default {
  name: "app-images-preview",
  components: {
    "images-preview-open": appImagesPreviewOpenVue
  },
  props: ["images"],
  data() {
    return { options: { url: "data-original" } };
  },
  mounted() {
    window.that = this;
  },
  filters: {
    toRuDate(e) {
      return new Date(e).toLocaleString("RU-ru");
    }
  }
};
</script>

<style>
.v-viewer-modal-row {
  display: flex;
}
</style>
