<template>

    <div class="nav-btns">
      <div><button v-if="!upload_mode" type="button" class="modal-buttons" v-show="prevShow" @click="$emit('prevHandler')">&#x2039; Previous</button></div>
      <button style="width:200px;" type="button" @click="toggle" class="modal-buttons">{{upload_mode__toggle_text}}</button>
      <div><button v-if="!upload_mode" type="button" class="modal-buttons" v-show="nextShow" @click="$emit('nextHandler')">Next &#x203A;</button> </div>
    </div>

    <!--
      <div v-else style="display: flex;" class="poll-down">
      <button style="wide-btn"
        type="button" @click="upload_mode_toggle" class="modal-buttons">
         pictures
      </button>
    </div>
    -->

</template>


<script>
export default {
  props: ["prevShow", "nextShow", "upload_mode"],
  methods: {
    toggle() {
      this.$emit("upload_mode_toggle");
    }
  },
  computed: {
    upload_mode__toggle_text() {
      return `${this.upload_mode ? "< Back to show" : "Upload"} pictures`;
    }
  }
};
</script>
