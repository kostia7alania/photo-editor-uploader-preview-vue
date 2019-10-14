<template>
    <div v-viewer="{ url: 'data-original' }" class="v-viewer-modal v-viewer-modal-custom" ref="viewer">

        <div v-for="img in INSP_PHOTOS" class="v-viewer-modal-row" :key="img.FileName">

            <images-preview-open :img="img"/>

            <div class="v-viewer-modal-desc">
              <div class="desc--date">
                <p
                  data-title-right
                :data-title="$t('images-preview.Photo-was-taken')+': ' + photoTaken(img)"><b>
                  {{ $t('images-preview.Photo-date') }}:
                  </b> <span> {{datePhoto(img) | toRuDate}}</span></p>
              </div>
                <p v-if="img.Comments"><b>{{ $t('images-preview.Photo-comments') }}:</b> {{img.Comments}}</p>
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
    datePhoto(obj) {
      return obj.DateOfSubmit || this.Date;
    },
    photoTaken(obj) {
      if (obj.DatePhotoFromBrowserYes == "0")
        return new Date(obj.DatePhoto).toLocaleString("Ru-ru");
      return "N/A";
    }
  },
  filters: {
    toRuDate(d) {
      if (!d) return;
      let out;
      if (!d.match(/\d\d:\d\d:\d\d/) || d.match("00:00:00"))
        out = new Date(d).toLocaleDateString("Ru-ru");
      else out = new Date(d).toLocaleString("Ru-ru");
      return out;
    }
  }
};
</script>

<style scoped lang='scss'>
.v-viewer-modal-row {
  display: flex;
}
.v-viewer-modal-desc {
  word-break: break-word;
  .desc--date {
    p {
      margin: 0 0 2px 0;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
