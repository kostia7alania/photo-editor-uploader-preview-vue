<template>
  <div>

    <div class="images-rows--description">
      <b>Remark: </b>{{remark}}<br> <!-- elem.Remark <- deprecated!!-->
      <b>Nature: </b>{{nature}}<br>
      <b>Date of inspect:</b> {{DateOfInspect}}<br>
      <b>Count of photos in the deficiency:</b> {{photosCount}}<br>
      <div class="text-gray" v-if="photosCount>0">Click on the photo to enlarge</div>
    </div>

    <app-images-preview/>

    <div v-if="photosCount===0" class="text-center">
        <h1 style="color:red"> No photos found...</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    appImagesPreview: () => import("./images-preview.vue")
  },
  mounted() {},
  computed: {
    DateOfInspect() {
      const i = this.$store.state.show.INSP_PHOTOS;
      if (!i || !i.length) return "";
      const d = i[0].DateOfInspect;
      let out;
      if (!d.match(/\d\d:\d\d:\d\d/) || d.match("00:00:00"))
        out = new Date(d).toLocaleDateString("Ru-ru");
      else out = new Date(d).toLocaleString("Ru-ru");

      return out;
    },
    remark() {
      return this.elem && this.elem.Comments;
    },
    nature() {
      return this.elem && `${this.elem.Code} - ${this.elem.Nature}`;
    },
    photosCount() {
      return (this.INSP_PHOTOS && this.INSP_PHOTOS.length) || "";
    },
    INSP_PHOTOS() {
      return this.$store.state.show.INSP_PHOTOS;
    },
    elem() {
      return this.$store.state.deficiencies[
        this.$store.getters.deficiencies_index
      ];
    }
  }
};
</script>
<style>
.text-gray {
  font-size: 0.8em;
  color: #4a89dc;
}
.images-rows--description {
}
</style>
