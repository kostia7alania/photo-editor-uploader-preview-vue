<template>

    <div class="nav-btns">
      <div> <button title='Go to the previous deficiency. You can also press the left button on the keyboard'
      v-if="!upload_mode" type="button" class="modal-buttons" v-show="prevShow" @click="prevHandler">&#x2039; Previous</button></div>
      <div>
        <button v-if="SHOW_TOGGLE_upload_mode" type="button" @click="TOGGLE_upload_mode" class="modal-buttons main-button" :class="upload_mode && 'main_button__upload_mode'">
          <svg v-if="upload_mode" height="26" viewBox="0 -37 511.99933 511" width="45px" xmlns="http://www.w3.org/2000/svg"><path d="m505.871094 140.699219-376.863282-139.621094c-4.820312-1.78125-10.175781.683594-11.953124 5.507813-.003907.003906-.003907.007812-.007813.011718l-41.71875 113.558594c-1.773437 4.824219.699219 10.175781 5.523437 11.949219h.007813l43.683594 16.039062-9.625 26.222657c-1.769531 4.824218.703125 10.167968 5.527343 11.941406l87.382813 32.082031-6.421875 17.480469c-5.835938 15.65625-.390625 33.28125 13.265625 42.910156v47.5h-125.242187c-6.0625-13.859375-18.46875-23.921875-33.285157-26.992188v-19.546874c0-5.140626-4.164062-9.308594-9.308593-9.308594h-37.527344c-5.140625 0-9.308594 4.167968-9.308594 9.308594v148.925781c0 5.144531 4.167969 9.308593 9.308594 9.308593h37.527344c5.144531 0 9.308593-4.164062 9.308593-9.308593v-19.542969c14.816407-3.074219 27.222657-13.132812 33.285157-26.996094h125.242187v9.308594c0 15.421875 12.5 27.925781 27.921875 27.925781s27.925781-12.503906 27.925781-27.925781v-103.113281c8.460938-4.195313 14.996094-11.472657 18.253907-20.339844l6.421874-17.480469 78.640626 28.855469c1.027343.378906 2.109374.570313 3.203124.570313 3.902344 0 7.394532-2.433594 8.742188-6.097657l3.488281-9.503906c30.289063 5.699219 59.460938-14.234375 65.15625-44.519531 2.105469-11.191406.738281-22.757813-3.917969-33.148438l56.425782-28.972656c4.574218-2.34375 6.382812-7.953125 4.039062-12.527344-1.0625-2.078125-2.867187-3.679687-5.054687-4.488281zm-272.585938 146.5625 7.707032 2.792969c3.507812 1.257812 7.1875 1.980468 10.910156 2.140624v34.085938h-18.617188zm-195.753906 132.101562h-18.914062v-130.3125h18.914062zm37.230469-55.847656c-.015625 11.828125-7.46875 22.371094-18.617188 26.332031v-71.28125c11.148438 3.957032 18.601563 14.5 18.617188 26.332032zm18.90625-18.617187h158.234375v18.617187h-158.234375zm148.925781 55.847656c-5.140625 0-9.308594-4.167969-9.308594-9.308594v-9.308594h18.617188v9.308594c0 5.140625-4.167969 9.308594-9.308594 9.308594zm35.128906-156.652344-6.421875 17.480469c-3.546875 9.640625-14.238281 14.585937-23.886719 11.046875l-17.507812-6.414063c-9.648438-3.542969-14.601562-14.238281-11.058594-23.890625 0 0 0 0 0-.003906l6.425782-17.46875 47.179687 17.320312zm93.796875 14.613281-235.921875-86.632812 6.425782-17.480469 139.796874 51.335938c3.308594 1.203124 7.019532.449218 9.59375-1.957032l26.121094-24.589844 73.234375 26.898438zm62.933594-36.378906c-5.898437 15.902344-21.761719 25.839844-38.640625 24.203125l14.382812-39.179688 23.492188-12.097656c3.675781 8.601563 3.949219 18.28125.765625 27.074219zm-31.417969-32.183594c-.492187.042969-.980468.128907-1.460937.257813l-82.988281-30.472656c-3.308594-1.214844-7.019532-.460938-9.589844 1.953124l-26.152344 24.59375-186.832031-68.609374 35.289062-96.085938 348.265625 129.027344zm0 0"/><path d="m172.328125 126.054688 6.414063-17.476563 17.476562 6.417969-6.417969 17.476562zm0 0"/><path d="m207.277344 138.886719 6.414062-17.476563 17.476563 6.417969-6.417969 17.472656zm0 0"/><path d="m242.226562 151.726562 6.417969-17.476562 17.472657 6.417969-6.417969 17.476562zm0 0"/></svg>
          <svg v-else id="Capa_1" enable-background="new 0 0 512 512" height="26" viewBox="0 0 512 512" width="55" xmlns="http://www.w3.org/2000/svg"><path d="m391 332c-24.15 0-46.107 9.564-62.288 25.1l-96.254-59.633c5.492-12.728 8.542-26.747 8.542-41.467s-3.05-28.739-8.543-41.466l96.254-59.633c16.182 15.535 38.139 25.099 62.289 25.099 49.626 0 90-40.374 90-90s-40.374-90-90-90-90 40.374-90 90c0 14.651 3.521 28.495 9.758 40.732l-94.001 58.238c-19.276-23.184-48.321-37.97-80.757-37.97-57.897 0-105 47.103-105 105s47.103 105 105 105c32.436 0 61.481-14.786 80.757-37.97l94.001 58.238c-6.237 12.237-9.758 26.081-9.758 40.732 0 49.626 40.374 90 90 90s90-40.374 90-90-40.374-90-90-90zm0-302c33.084 0 60 26.916 60 60s-26.916 60-60 60-60-26.916-60-60 26.916-60 60-60zm-255 301c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm255 151c-33.084 0-60-26.916-60-60s26.916-60 60-60 60 26.916 60 60-26.916 60-60 60z"/></svg>
          {{upload_mode__toggle_text}}
        </button>
      </div>
      <div> <button title="Go to the next deficiency. You can also press the right button on the keyboard"
      v-if="!upload_mode" type="button" class="modal-buttons" v-show="nextShow" @click="nextHandler">Next &#x203A;</button> </div>
    </div>

    <!--
      <div v-else style="display: flex;" class="poll-down">
      <button style="wide-btn"
        type="button" @click="TOGGLE_upload_mode" class="modal-buttons">
         pictures
      </button>
    </div>
    -->

</template>


<script>
export default {
  mounted() {
    window.addEventListener("keydown", this.keyHandler);
    EventBus.$on("destroyMe", this.destroyMe.bind(this));
    this.upload_mode && !this.CAN_UPLOAD && this.TOGGLE_upload_mode(); //если юзеру не разрешено выгружать, а он каким-то образом все таки попал в аплоадер, то выкидываем его за шкирку
  },
  beforeDestroy: () => EventBus.$emit("destroyMe"),
  computed: {
    CAN_UPLOAD() {
      return this.$store.state.CAN_UPLOAD;
    },
    SHOW_TOGGLE_upload_mode() {
      return this.CAN_UPLOAD || this.upload_mode;
    },
    def_uid() {
      return this.$store.state.def_uid;
    },
    upload_mode() {
      return this.$store.state.upload_mode;
    },
    upload_mode__toggle_text() {
      return `${this.upload_mode ? "Show" : "Upload"} pictures`;
    },
    nextShow() {
      return this.deficiencies.length - 1 > this.index;
    },
    prevShow() {
      return this.index > 0;
    },
    deficiencies() {
      return this.$store.state.deficiencies || [];
    },
    index() {
      return this.$store.getters.deficiencies_index;
    }
  },

  methods: {
    TOGGLE_upload_mode() {
      store.commit("TOGGLE_upload_mode");
    },
    destroyMe() {
      $("#photos_modal").remove();
      EventBus.$off("modal_closed");
      window.removeEventListener("keydown", this.keyHandler);
    },

    keyHandler(e) {
      if (this.upload_mode || document.querySelector(".viewer-in")) return;
      e = e || window.event;
      if (e.key === "ArrowRight") this.nextHandler();
      if (e.key === "ArrowLeft") this.prevHandler();
      if (e.key === "Escape") EventBus.$emit("destroyMe");
    },
    nextHandler() {
      this.$store.commit(
        "SET_def_uid",
        this.deficiencies[this.index + 1]["def"]
      );
      this.$store.dispatch("GET_INSP_PHOTOS");
    },

    prevHandler() {
      this.$store.commit(
        "SET_def_uid",
        this.deficiencies[this.index - 1]["def"]
      );
      this.$store.dispatch("GET_INSP_PHOTOS");
    }
  }
};
</script>
<style scoped lang='scss'>
.nav-btns {
  & button {
    height: 35px;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &.main-button {
      width: 200px;
      &.main_button__upload_mode {
        /*  width: 233px;*/
        background: #3085d6;
      }
    }
  }
}
</style>