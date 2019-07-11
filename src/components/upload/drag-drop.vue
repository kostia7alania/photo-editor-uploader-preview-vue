<template>
      <div v-show="dragOver" class="drag-overlay">
        Release the mouse to add files.
      </div>
</template>

<script>
export default {
  name: "drag-drop",
  data() {
    return {
      dragOver: false,
      dropArea: document
    };
  },
  mounted() {
    const dropArea = this.dropArea;
    this.prevent_stop(dropArea);
    ["dragenter", "dragover"].forEach(name =>
      dropArea.addEventListener(name, this.SET_DRAGOVER_TRUE, false)
    );

    ["dragleave", "drop"].forEach(
      name => dropArea.addEventListener(name, this.SET_DRAGOVER_FALSE),
      false
    );

    dropArea.addEventListener("drop", this.handleDrop, false);
  },

  beforeDestroy() {
    const dropArea = this.dropArea;

    ["dragenter", "dragover", "dragleave", "drop"].forEach(name =>
      dropArea.removeEventListener(name, this.prevent_stop_func)
    );

    ["dragenter", "dragover"].forEach(name =>
      dropArea.removeEventListener(name, this.SET_DRAGOVER_TRUE)
    );
    ["dragleave", "drop"].forEach(name =>
      dropArea.removeEventListener(name, this.SET_DRAGOVER_FALSE)
    );

    dropArea.removeEventListener("drop", this.handleDrop);
  },

  methods: {
    prevent_stop_func: e => {
      e.preventDefault();
      e.stopPropagation();
    },
    prevent_stop(dropArea) {
      ["dragenter", "dragover", "dragleave", "drop"].forEach(name =>
        dropArea.addEventListener(name, this.prevent_stop_func, false)
      );
    },
    SET_DRAGOVER_TRUE() {
      this.dragOver = true;
    },
    SET_DRAGOVER_FALSE() {
      this.dragOver = false;
    },
    handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      this.$emit("fileListHandler", files);
    }
  }
};
</script>

<style>
.drag-overlay {
  position: absolute;
  font-size: 5em;
  background: #ffcc0094;
  border-radius: 30px;
  z-index: -1;
}
</style>