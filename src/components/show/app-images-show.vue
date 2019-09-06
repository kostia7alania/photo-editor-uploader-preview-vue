<template>
  <div>
    <h6 class="text-center">{{longLoadingAlert}}</h6>
    <loadingVue v-if="loading"/>
    <error-Render v-else-if="error" :error="error"/>
    <images-rows v-else/>
    <!--<keep-alive></keep-alive>-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { loading, error, delay, timeout } from "../../stages";

const imagesRows = () => ({
  component: import(
    /* webpackChunkName: "images-rows"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./images-rows"
  ),
  loading,
  error,
  delay,
  timeout
});

export default {
  mounted() {
    this["GET_INSP_PHOTOS"]();
  },
  components: {
    imagesRows,
    loadingVue: () => import("../Loading"),
    errorRender: () => import("../error-render")
  },
  computed: {
    error() {
      return this.$store.state.show.ERROR;
    },
    loading() {
      return this.$store.state.show.LOADING;
    },
    longLoadingAlert() {
      return (
        (this.$store.state.show.TOO_LONG_LOADING === true &&
          "Component loading too long ...") ||
        ""
      );
    }
  },
  methods: {
    ...mapActions(["GET_INSP_PHOTOS"])
  }
};
</script>
<style>
</style>
