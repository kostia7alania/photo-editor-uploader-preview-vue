<template>
          <div class='cont'>
            <div class="cont-row">
              <div> &nbsp; </div>
              <div>{{ $t('photo-info.Original') }}</div>
              <div>{{ $t('photo-info.New') }} </div>
            </div>
            <div class="cont-row">
              <div>{{ $t('photo-info.Size') }}</div>
              <div>{{size_filter_m(originalSize)}}</div>
              <div v-if="getSizeFromBase64">{{size_filter_m(getSizeFromBase64)}}</div>
              <div v-else>...</div>
            </div>
            <div class="cont-row" v-if="0">
              <div>{{ $t('photo-info.Resolution') }}</div>
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
  methods: {
    size_filter_m(e) {
      if (!e) return "";
      return e / 1024 / 1024 > 1
        ? (e / 1024 / 1024).toFixed(0) + " " + this.$t("size.MB")
        : (e / 1024).toFixed(0) + " " + this.$t("size.KB");
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


