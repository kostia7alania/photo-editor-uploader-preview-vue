<template>
      <div>
        <h3>Preview</h3>
        <img-prev v-if="cropped" :src="cropped"/>
        <p v-else class="img-place"></p>
        <div class="img-edit-desc">

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
            <div class="cont-row">
              <div>Resolution</div>
              <div>{{originalImageData.naturalWidth}} x {{originalImageData.naturalHeight}}</div>
              <div>{{parseInt(w)}} x {{h}}</div>
            </div>
          </div>

        </div>
      </div>
</template>

<script>
export default {
  name: "photo-editor-preview",
  props: ["cropped", "w", "h", "originalImageData", "originalSize"],
  components: {
    imgPrev: () => import("../upload/img-prev.vue")
  },
  data() {
    return {};
  },
  computed: {
    getSizeFromBase64() {
      if (!this.cropped) return "";
      const len = this.cropped.length - this.cropped.split(",")[0].length;
      return 4 * Math.ceil(len / 3) * 0.5624896334383812;
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
ul {
  padding: 0 0 5 0;
}
.img-edit-desc {
  text-align: center;
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
}
.img-place {
  margin: 20px auto;
  height: 150px;
  background-repeat: repeat;
  width: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='lds-wave' width='80px' height='80px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Ccircle cx='11' cy='60.6957' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23e15b64' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='0s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='22' cy='42.0503' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23f47e60' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.125s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='33' cy='31.2706' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23f8b26a' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.25s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='44' cy='30.6213' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23abbd81' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.375s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='55' cy='39.3043' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23e15b64' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='66' cy='57.9497' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23f47e60' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.625s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='77' cy='68.7294' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23f8b26a' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.75s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='88' cy='69.3787' ng-attr-r='%7B%7Bconfig.radius%7D%7D' fill='%23abbd81' r='5'%3E%3Canimate attributeName='cy' values='30;70;30' times='0;0.5;1' dur='1s' calcMode='spline' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' begin='-0.875s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E");
}
</style>


