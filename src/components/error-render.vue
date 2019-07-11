<template>
  <div class="text-red text-center">
    <h1>Error!</h1>
    <div v-if="error && !upload_mode">
        <p>Error in the request...</p>
        Please, check you internet-connection or try again later.
        <p><input type="text" readonly :value="error"></p>
        <button class="modal-buttons" @click="$emit('get_info')">REFRESH</button>
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
  props: ["error", "upload_mode"]
};
</script>
