<template>
          <div class='cont'>
            <div class="cont-row">
              <div> &nbsp; </div>
              <div>Original</div>
              <div>New</div>
            </div>
            <div class="cont-row">
              <div>Size</div>
              <div>{{originalSize | size_filter}}</div>
              <div v-if="getSizeFromBase64">{{getSizeFromBase64 | size_filter}}</div>
              <div v-else>...</div>
            </div>
            <div class="cont-row" v-if="0">
              <div>Resolution</div>
              <div>{{originalImageData.naturalWidth}} x {{originalImageData.naturalHeight}}</div>
              <div>{{parseInt(w)}} x {{height_computed}}</div>
            </div>
          </div>
</template>

<script>
export default {
  name: "photo-info",
  props: ["cropped", "w", "h", "originalImageData", "originalSize"],
  components: {
    imgPrev: () => import("../img-prev.vue")
  },
  data() {
    return {};
  },
  computed: {
    getSizeFromBase64() {
      if (!this.cropped) return "";
      const len = this.cropped.length - this.cropped.split(",")[0].length;
      return 4 * Math.ceil(len / 3) * 0.5624896334383812;
    },
    coef() {
      return (
        this.originalImageData.naturalHeight /
        this.originalImageData.naturalWidth
      );
    },
    height_computed() {
      return parseInt(this.w * this.coef);
    }
  },
  filters: {
    size_filter(e) {
      if (!e) return " ";
      //console.log("size", e);
      return e / 1024 / 1024 > 1
        ? (e / 1024 / 1024).toFixed(0) + " MB"
        : (e / 1024).toFixed(0) + " KB";
    }
  }
};
</script>

<style lang="scss" scoped>
.cont {
  display: flex;
  & > .cont-row {
    & > div {
      min-height: 18px;
      min-width: 97px;
      border: 1px solid red;
      padding: 5px;
    }
    & > div:nth-child(1) {
      background: red;
      color: green;
    }
    &:nth-child(1) {
      background: #f0f0f0;
      color: red;
    }
  }
}
</style>


