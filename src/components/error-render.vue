<template>
  <div class="text-red text-center">
    <h2>Error!</h2>
    <div v-if="error && !upload_mode">
      <div class="error-wrapper" v-if="!authRequired">
        <p>Error in the request...</p>
        Please, check you internet-connection or try again later.
        <p><input type="text" readonly :value="error"></p>
        <button class="modal-buttons" @click="get_info">REFRESH</button>
      </div>

      <login v-else />
    </div>
    <div v-else-if="typeof error == 'string'">
      <input readonly :value="error" type="text">
    </div>
    <div v-else-if='upload_mode'>
      Uploaded with errors!
      Maybe you should see below for details.
    </div>
  </div>
</template>
<script>
export default {
  props: ["error"],
  components: {
    login: () => import("./login")
  },
  computed: {
    upload_mode() {
      return this.$store.state.upload_mode;
    },
    authRequired() {
      return this.error == "Unauthorized";
    }
  },
  methods: {
    get_info() {
      this.$store.dispatch("GET_INSP_PHOTOS");
    }
  }
};
</script>
