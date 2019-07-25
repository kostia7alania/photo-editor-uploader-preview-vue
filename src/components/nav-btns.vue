<template>

    <div class="nav-btns">
      <div><button v-if="!upload_mode" type="button" class="modal-buttons" v-show="prevShow" @click="$emit('prevHandler')">&#x2039; Previous</button></div>
      <button style="width:200px;" type="button" @click="$emit('upload_mode_toggle')" class="modal-buttons">{{upload_mode__toggle_text}}</button>
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
  props: ["upload_mode", "def_uid", "index", "elems"],

  mounted() {
    EventBus.$on("destroyMe", this.destroyMe.bind(this));
  },

  beforeDestroy: () => EventBus.$emit("destroyMe"),

  computed: {
    upload_mode__toggle_text() {
      return `${this.upload_mode ? "< Back to show" : "Upload"} pictures`;
    },
    nextShow() {
      let index = 0;
      this.elems.forEach((e, i) => {
        if (e.def == this.def_uid) index = i;
      });
      return this.elems.length - 1 > index ? true : false;
    },
    prevShow() {
      let index = 0;
      this.elems.forEach((e, i) => {
        if (e.def == this.def_uid) index = i;
      });
      return index > 0;
    }
  },

  methods: {
    destroyMe() {
      $("#photos_modal").remove();
      EventBus.$off("get_info_global");
      EventBus.$off("modal_closed");
      window.removeEventListener("keydown", this.keyHandler);
    },

    keyHandler(e) {
      if (this.upload_mode) return;
      e = e || window.event;
      if (e.key === "ArrowRight") this.nextHandler();
      if (e.key === "ArrowLeft") this.prevHandler();
      if (e.key === "Escape") EventBus.$emit("destroyMe");
    },
    nextHandler() {
      if (this.nextShow && typeof this.index != "undefined") return;
      this.$emit("change_def", this.elems[this.index + 1]["def"]);
    },

    prevHandler() {
      if (this.prevShow && typeof this.index != "undefined") return;
      this.$emit("change_def", this.elems[this.index - 1]["def"]);
    }
  }
};
</script>
