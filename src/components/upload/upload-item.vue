<template>
  <div class="file-container" :class="{'file-container-highlighted': isAlreadyUploaded}">
      <div v-if="isAlreadyUploaded">
        <p class="already-uploaded-text">This image is already uploaded!</p>
      </div>
    <div class="files-row">
        <div class="m_p-5 text-left upload-left-side">
          <upload-item-info :upd="upd"/>

          <vue-textarea
              :readonly="isBlockedTextArea"
              :value="upd.comment"
              @input="SET_UP_COMMENT"
            />
        </div>

        <div class="upload-right-side">

          <img-prev
            :src="createObjectUrl"
            :base64="upd.base64"
            :alt="img_prev_alt"
            :cls="canUpload"
            hide_navbar="true"
          />

          <uploadItemButtons
            @edit="edit"
            :upd="upd"
            :editor="editor"
            :isBlockedUpload="isBlockedUpload"
            :isBlockedDelete="isBlockedDelete"
            :isBlockedEdit="isBlockedEdit"
            :isBlockedRevert="isBlockedRevert"
          />

          <error-render v-if="upd.error" :error="upd.error || error" :upload_mode="true"/>

        </div>
    </div>
    <div>
      <progressVue :percentage="PERCENTAGE" v-if="loading"/>
      <p class="text-red" v-if="ERROR_maxSize"><b>ERROR:</b> Exceeded the maximum file size of {{maxFileSize}} MB</p>
      <p class="text-red" v-if="ERROR"><b>ERROR:</b> {{ERROR}} </p>
    </div>
  <app-photo-editor v-if="editor" :alt="img_prev_alt" :editor="editor" :upd="upd" @save="saveEditor" @cancel="cancelEditor"/>

  </div>
</template>

<script>
import { loading, error, delay, timeout } from "../../stages";

const uploadItemInfo = () => ({
  component: import(
    /* webpackChunkName: "upload-item-info"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./upload-item-info"
  ),
  loading,
  error,
  delay,
  timeout
});
const appPhotoEditor = () => ({
  component: import(
    /* webpackChunkName: "app-photo-editor"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "../photo-editor/app-photo-editor.vue"
  ),
  loading,
  error,
  delay,
  timeout
});
const uploadItemButtons = () => ({
  component: import(
    /* webpackChunkName: "uploadItemButtons"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./upload-item-buttons"
  ),
  loading,
  error,
  delay,
  timeout
});

export default {
  name: "upload-item",
  props: ["upd"],
  components: {
    errorRender: () => import("../error-render.vue"),
    imgPrev: () => import("../img-prev.vue"),
    progressVue: () => import("./progress.vue"),
    vueTextarea: () => import("../elements/vue-textarea.vue"),
    appPhotoEditor,
    uploadItemButtons,
    uploadItemInfo
  },
  data() {
    return {
      editor: null
    };
  },

  computed: {
    isAlreadyUploaded() {
      return this.$store.state.show.INSP_PHOTOS.filter(
        e => e.Hash == this.upd.hash
      ).length;
    },
    ERROR() {
      return this.upd.ERROR;
    },
    PERCENTAGE() {
      this.upd.PERCENTAGE;
    },
    createObjectUrl() {
      return window.URL.createObjectURL(this.upd.file);
    },
    isBlockedUpload() {
      return this.loading || this.ERROR_maxSize || this.editor;
    },
    isBlockedDelete() {
      return this.loading;
    },
    isBlockedEdit() {
      return this.isBlockedDelete; // || this.ERROR_maxSize;
    },
    isBlockedRevert() {
      return !this.upd.base64 || this.loading;
    },
    canUpload() {
      return (this.$store.state.CAN_UPLOAD && "blocked-btn") || "";
    },
    loading() {
      return this.upd.CANCEL_SOURCE;
    },
    getSizeFromBase64() {
      const img = this.upd.base64;
      if (!img) return "";
      const len = img.length - img.split(",")[0].length;
      return 4 * Math.ceil(len / 3) * 0.5624896334383812;
    },
    url() {
      return this.$store.state.BASE_URL;
    },
    maxFileSize() {
      return this.$store.state.maxFileSize;
    },
    ERROR_maxSize() {
      if (
        //this.upd.base64 && (this.upd.base64.length * (3 / 4)) / 1024 / 1024 > this.maxFileSize
        this.getSizeFromBase64
      )
        return this.getSizeFromBase64 / 1024 / 1024 > this.maxFileSize;

      return this.upd.file.size / 1024 / 1024 > this.maxFileSize;
    },
    isBlockedTextArea() {
      return this.loading || this.ERROR_maxSize;
    },
    img_prev_alt() {
      const comment = this.upd.comment
        ? `. Comment: "${this.upd.comment}"`
        : "";
      const changed = this.upd.base64 ? " [CHANGED]" : "";
      return this.upd.file.name + comment + changed;
    }
  },
  methods: {
    SET_UP_COMMENT(comment) {
      this.$store.commit("SET_UP_COMMENT", { comment, hash: this.upd.hash });
    },
    cancelEditor() {
      this.editor = null;
    },
    saveEditor(base64) {
      this.$store.commit("SET_BASE64", { hash: this.upd.hash, base64 });
      this.editor = null;
    },
    edit() {
      this.editor = this.editor ? null : this.createObjectUrl;
    },
    upload() {
      this.$store.dispatch("UPLOAD_INSP_PHOTO", this.upd.hash);
    }
  }
};
</script>


<style lang="scss" scoped>
.text-left {
  text-align: left;
}
.file-container {
  padding: 5px;
  border-top: 5px dashed #006798;
}
.files-row {
  display: flex;
  justify-content: space-between;

  .upload-right-side {
    display: flex;
    align-content: space-between;
    align-items: center;
    flex: 2 2 20em;
  }
}
.m_p-5 > p {
  margin: 5px;
}
.already-uploaded-text {
  text-align: center;
  color: red;
  font-size: 2em;
}
.file-container-highlighted {
  color: white;
  background: linear-gradient(
      45deg,
      rgba(103, 0, 31, 0.8),
      rgba(34, 101, 163, 0.5)
    ),
    url(./bg-image-flowers.jpg);
  background-size: cover;
}
</style>


