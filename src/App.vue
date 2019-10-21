<template>
  <div class="application">
    <nav-Btns/>
    <!--<keep-alive></keep-alive>-->
    <app-images-upload v-if="upload_mode"/>
    <appImagesShow v-else/>
  </div>
</template>

<script>
import { loading, error, delay, timeout } from "./stages";

const appImagesUpload = () => ({
  component: import(
    /* webpackChunkName: "app-images-upload"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./components/upload/app-images-upload.vue"
  ),
  loading,
  error,
  delay,
  timeout
});

const navBtns = () => ({
  component: import(
    /* webpackChunkName: "nav--Btns"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./components/nav-btns.vue"
  ),
  loading,
  error,
  delay,
  timeout
});

const appImagesShow = () => ({
  component: import(
    /* webpackChunkName: "app-images-show"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./components/show/app-images-show.vue"
  ),
  loading,
  error,
  delay,
  timeout
});

export default window.photos_modal_app = {
  name: "APP_photos_modal_app",
  components: {
    appImagesUpload,
    appImagesShow,
    navBtns
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => this.$store.dispatch("GET_INSP_PHOTOS"));
    window.e = this;
    EventBus.that = this;
    //console.log("MAIN  mounted .!.");
    EventBus.$on("modal_closed", () => {
      window.VUE_PICTURE.$destroy();
      window.VUE_PICTURE = undefined;
    });
  }, 
  computed: { 
    upload_mode() {
      return this.$store.state.upload_mode;
    },
    elems() {
      return this.$store.state.deficiencies;
    },
    index() {
      return this.$store.getters.deficiencies_index;
    }
  }
};
</script>

<style lang="scss">
.application ::selection {
  color: #ff0; /* Цвет текста */
  background: #000; /* Цвет фона */
}
</style>
