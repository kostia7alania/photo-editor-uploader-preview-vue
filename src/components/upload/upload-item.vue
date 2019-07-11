<template>
  <div class="files-container">
    <div class="files-row">
        <div class="m_p-5 text-left upload-left-side">
          <p><b>Name:</b> {{upd.name}}</p>
          <p><b>Type:</b> {{upd.type}}</p>
          <p><b>Modified Date:</b> {{upd.lastModifiedDate}}</p>
          <p><b>Size:</b>         {{upd.size | size_filter}}</p>
          <p><b>Your comments:</b></p>
          <vue-textarea :readonly="isBlockedTextArea" :obj="upd" obj_key='comment'/>
        </div>
        <div class="upload-right-side">
          <img-prev :src="upd.url" :alt="img_prev_alt"/>
          <div class="panel-btns">
              <button
                :class="{'blocked-btn': isBlockedDelete}"
                class="modal-buttons"
                @click="$emit('delete')" type="button">Delete</button>
              <button
                :class="{'blocked-btn': isBlockedUpload}"
                class="modal-buttons"
                @click="upload" type="button">

                Upload</button>
              <button
                :class="{'blocked-btn': isBlockedCancel}"
                class="modal-buttons"
                @click="cancelUploading" type="button">Cancel</button>
            </div>

          <error-render v-if="upd.error" :error="upd.error || error" :upload_mode="true"/>

        </div>
    </div>

    <progressVue :percentage="percentage" />
    <p class="text-red" v-if="ERROR_maxSize"><b>ERROR:</b> Exceeded the maximum file size of {{maxFileSize}} MB</p>
    <p class="text-red" v-if="errorMsg"><b>ERROR:</b> {{errorMsg}} </p>
  </div>
</template>

<script>
import config from "../../../config";
import errorRenderVue from "../error-render.vue";
import imgPrevVue from "./img-prev.vue";
import progressVue from "./progress.vue";
import vueTextareaVue from "../elements/vue-textarea.vue";
export default {
  name: "upload-item",
  props: ["upd", "insp_uid", "def_uid"],
  components: {
    "error-render": errorRenderVue,
    "img-prev": imgPrevVue,
    progressVue,
    "vue-textarea": vueTextareaVue
  },
  data() {
    return {
      loading: false,
      source: null,
      errorMsg: null,
      percentage: null
    };
  },

  computed: {
    url() {
      return config.base_url;
    },
    maxFileSize() {
      return config.maxFileSize;
    },
    ERROR_maxSize() {
      return this.upd.size / 1024 / 1024 > this.maxFileSize;
    },
    isBlockedTextArea() {
      return this.loading || this.ERROR_maxSize;
    },
    isBlockedDelete() {
      return this.loading;
    },
    isBlockedUpload() {
      return this.loading || this.ERROR_maxSize;
    },
    isBlockedCancel() {
      return !this.source;
    },
    img_prev_alt() {
      const comment = this.upd.comment
        ? `. Comment: "${this.upd.comment}"`
        : "";
      return this.upd.name + comment;
    }
  },
  methods: {
    onUploadProgress(e) {
      this.percentage = Math.round((e.loaded * 100.0) / e.total || 100);
      console.log("progressEvent=>", this.percentage);
    },
    cancelUploading() {
      this.source.cancel("Operation canceled by the user");
    },
    async upload() {
      this.loading = true;
      this.errorMsg = null;

      "axios" in window ||
        (await import(/* webpackChunkName: "http" */ "../../http.js").then(
          m => (window.axios = m.default)
        ));

      const formData = new FormData();
      const e = this.upd;
      formData.append(`files-0`, e.fileSelf);
      formData.append("comments[]", e.comment);
      formData.append("insp_uid", this.insp_uid);
      formData.append("def_uid", this.def_uid);

      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const config = {
        onUploadProgress: this.onUploadProgress,
        cancelToken: source.token,
        headers: { "content-type": "multipart/form-data" }
      };
      const url = this.url + "?action=savepic_kost";
      this.source = source;
      axios
        .post(url, formData, config)
        .then(res => {
          if (typeof res.data !== "object" || !("errors" in res.data))
            throw { message: "no data.!." };
          else if (res.data.errors.length > 0)
            this.errorMsg = res.data.errors[0] || "An error has occurred";
          else setTimeout(() => this.$emit("finished"));
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            this.errorMsg = error.message;
          }
          console.log(error, error.config);
        })
        .finally(() => {
          this.loading = false;
          this.source = false;
          this.percentage = false;
        });
    }
  },
  filters: {
    size_filter(e) {
      window.size = e;
      console.log("size", e);
      return e / 1024 / 1024 > 1
        ? (e / 1024 / 1024).toFixed(0) + " MB"
        : (e / 1024).toFixed(0) + " KB";
    }
  }
};
</script>


<style lang="scss">
.text-left {
  text-align: left;
}
.files-container {
  padding: 5px;
  border: 1px solid #006798;
  border-radius: 6px;
}
.files-row {
  display: flex;
  justify-content: space-between;

  .upload-left-side {
    flex: 1 1 20em;
    max-width: 42vw;
  }

  .upload-right-side {
    flex: 2 2 20em;
  }
}
.m_p-5 > p {
  margin: 5px;
}
</style>

<style scoped>
.blocked-btn {
  color: #322525 !important;
  background: grey !important;
  pointer-events: none;
}
.upload-right-side {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
}
.panel-btns {
  display: flex;
}
</style>

