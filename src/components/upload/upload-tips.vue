<template>
      <div class="upload-tips text-left">
        <span
            @click="toggleShowUploadTip"
            class="close-tip"
           :data-title="title"
           data-title-left
        >
          {{tipIcon}}
        </span>
        <template v-if="showTip">
          <p><b>You can choose and upload multiple images at once.</b></p>
          <p><b>Recommended file types</b>: jpeg (jpg), png, gif.</p>
          <p>
            <b>Max recommended file size</b>: 5 mb.
            <b>Resolution</b>: within 4k.</p>
          <p> Click "choose" or drag files to this page to add files to the preview pane. </p>
        </template>
      </div>
</template>

<script>
export default {
  name: "upload-tips",
  data() {
    return {
    };
  },
  computed: {
    showTip(){
      return this.$store.state.SHOW_UPLOAD_TIP
    },
    tipIcon() {
      return (this.showTip && "x") || "?";
    },
    title() {
      return (this.showTip && "Close tip") || "Show tip";
    }
  },
  methods: {
    toggleShowUploadTip(){
      this.$store.commit('TOGGLE_SHOW_UPLOAD_TIP')
    },
  }
};
</script>

<style scoped lang="scss">
.close-tip {
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  top: 20px;
  right: 32px;

  &:hover {
    color: red;
    transform: scale(1.5);
  }
}
.upload-tips {
  p {
    padding: 0px;
    margin: 0px;
  }
}
</style>

