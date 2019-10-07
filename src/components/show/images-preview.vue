<template>
    <div v-viewer="{ url: 'data-original' }" class="v-viewer-modal v-viewer-modal-custom" ref="viewer">

        <div v-for="img in INSP_PHOTOS" class="v-viewer-modal-row" :key="img.FileName">

            <images-preview-open :img="img"/>

            <div class="v-viewer-modal-desc">
                <p><b>{{DatePhotoLabel(img)}}:</b> {{DatePhoto(img) | toRuDate}}</p>
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
  data() {
    return {};
  },
  computed: {
    INSP_PHOTOS() {
      return this.$store.state.show.INSP_PHOTOS;
    }
  },
  methods: {
    DatePhoto(obj) {
      return obj.DatePhoto || obj.Date;
    },
    DatePhotoLabel(obj) {
      return "Photo loaded";
      //((obj.DatePhoto && "Photo date") || (obj.Date && "Photo date loaded"));
    }
  },
  filters: {
    toRuDate(d) {
      let out;
      if (!d.match(/\d\d:\d\d:\d\d/) || d.match("00:00:00"))
        out = new Date(d).toLocaleDateString("Ru-ru");
      else out = new Date(d).toLocaleString("Ru-ru");
      return out;
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
