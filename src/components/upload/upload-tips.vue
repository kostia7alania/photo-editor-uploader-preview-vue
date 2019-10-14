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

         <p><b>{{ $t('upload-tips.You-can-choose') }}</b></p>
          <p><b>{{ $t('upload-tips.Recommended-file-types') }}</b>: {{ $t('upload-tips.file-types') }}</p>
          <p><b>{{ $t('upload-tips.Recommended-file-size') }} </b>: {{ $t('upload-tips.file-size') }}
            <b>{{ $t('upload-tips.Resolution') }}</b>: {{ $t('upload-tips.Resolution_val') }}.</p>
          <p> {{ $t('upload-tips.Click-choose-or-drag') }}. </p>
        </template>
      </div>
</template>

<script>
export default {
  name: "upload-tips",
  data() {
    return {};
  },
  computed: {
    showTip() {
      return this.$store.state.SHOW_UPLOAD_TIP;
    },
    tipIcon() {
      return (this.showTip && "x") || "?";
    },
    title() {
      return (
        (this.showTip && this.$t("upload-tips.Close-tip")) ||
        this.$t("upload-tips.Show-tip")
      );
    }
  },
  methods: {
    toggleShowUploadTip() {
      this.$store.commit("TOGGLE_SHOW_UPLOAD_TIP");
    }
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

