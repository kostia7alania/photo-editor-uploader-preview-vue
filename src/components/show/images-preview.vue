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
export default {
  name: "images-preview",
  components: {
    imagesPreviewOpen: () => import("./images-preview-open.vue")
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

<style scoped>
.v-viewer-modal-row {
  display: flex;
}
.v-viewer-modal-desc {
  word-break: break-word;
}
</style>
