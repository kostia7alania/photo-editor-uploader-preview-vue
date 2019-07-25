<template>
      <div class="application">
          <nav-Btns
            @upload_mode_toggle="upload_mode_toggle"
            @change_def="def_uid = $event"
            :upload_mode="upload_mode"
            :def_uid="def_uid"
            :index="index"
            :elems="elems"
          />

          <keep-alive v-if="upload_mode">
            <app-images-upload :def_uid="def_uid" :insp_uid="insp_uid"/>
          </keep-alive>

          <div v-else>
              <h6 class="text-center">{{tooLongLoading===true?"Component loading too long ...":''}}</h6>
              <Loading v-if="loading"/>
              <error-Render v-else-if="error" :error="error" @get_info="get_info"/>
              <keep-alive v-else>
                <app-Images-Rows :elem="elems[index]" :images="images" :index="index"/>
              </keep-alive>

          </div>
      </div>
</template>

<script>
import Loading from "./components/Loading.vue";
import navBtns from "./components/nav-btns.vue";
import errorRender from "./components/error-render.vue";

const loading = {
  template: `<h1 style="text-align:center">!!!!!!!!! LOADING !!!!!!!!!</h1>`
};
const error = { template: `<div>. . . ERROR...</div>` };

const appImagesUpload = () => ({
  component: import(
    /* webpackChunkName: "app-images-upload"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./components/upload/app-images-upload.vue"
  ),
  loading,
  error,
  delay: 20,
  timeout: 25000
});
const appImagesRows = () => ({
  component: import(
    /* webpackChunkName: "app-images-rows"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./components/show/app-images-rows.vue"
  ),
  loading,
  error,
  delay: 20,
  timeout: 25000
});

import config from "../config";

export default window.photos_modal_app = {
  name: "photos_modal_app",
  components: {
    appImagesUpload,
    appImagesRows,
    Loading,
    errorRender,
    navBtns
  },
  data() {
    return {
      upload_mode: false, // true - upload_mode || false -  show_mode
      readOnly: true,
      error: null,
      loading: true,
      tooLongLoading: false,
      images: [],
      def_uid: null,
      insp_uid: null,
      elems: []
    };
  },
  mounted() {
    EventBus.that = this;
    //console.log("MAIN  mounted .!.");
    EventBus.$on("get_info_global", this.get_info_global.bind(this));
    EventBus.$on("modal_closed", () => {
      window.VUE_PICTURE.$destroy();
      window.VUE_PICTURE = undefined;
    });
    window.addEventListener("keydown", this.keyHandler);
  },
  watch: {
    upload_mode(neww, old) {
      !this.upload_mode && this.get_info();
    }
  },
  computed: {
    index() {
      let index;
      this.elems.some(
        (el, i) =>
          el.def == this.def_uid && el.insp == this.insp_uid && (index = i)
      );
      return index;
    }
  },
  methods: {
    upload_mode_toggle() {
      this.upload_mode = !this.upload_mode;
    },

    init_params({ def_uid, insp_uid, elems, upload_mode, readOnly }) {
      this.def_uid = def_uid;
      this.insp_uid = insp_uid;
      this.elems = elems;
      this.upload_mode = upload_mode;
      this.readOnly = readOnly;
      this.get_info();
    },
    get_info_global(props) {
      this.init_params(props);
      // !props.upload_mode && this.get_info();
    },
    async get_info() {
      const that = EventBus.that;
      that.images = [];
      const url = `${config.base_url}?action=viewimage_kost&def_uid=${that.def_uid}&insp_uid=${that.insp_uid}`;
      that.loading = true;

      window.clearTimeout(that.tooLongLoading);
      that.tooLongLoading = setTimeout(
        () => (that.tooLongLoading = true),
        1000
      );
      that.error = null;
      "axios" in window ||
        (await import(/* webpackChunkName: "http" */ "./http.js").then(
          m => (window.axios = m.default)
        ));
      axios
        .post(url)
        .then(res => {
          that.images = [];
          const result = res.data;
          if (typeof result == "object" && "File" in result) {
            if (typeof result.File["@attributes"] != "undefined")
              that.images.push(result.File["@attributes"]);
            else result.File.forEach(e => that.images.push(e["@attributes"]));
            console.log(result.File["@attributes"]);
            return;
          }
          throw "server wrong answer";
          console.warn("server wrong answer");
        })
        .catch(err => {
          console.log("result is EMPTY .!.=>" + err);
          that.error = err;
        })
        .finally(() => {
          that.loading = false;
          that.modalPageTitleHandler();
          window.clearTimeout(that.tooLongLoading);
          that.tooLongLoading = false;
        });
    },
    modalPageTitleHandler() {
      //const old = $("#photos_modal").dialog("option", "title");
      const modalTitle = "Photo manager";

      const title_page =
        !Number.isNaN(this.index + 1) && this.elems.length
          ? ` (${this.index + 1} / ${this.elems.length})`
          : "";
      const modal = $("#ui-dialog-title-photos_modal");
      const page = modal.find("#page");
      if (page.length) {
        page.text(title_page);
      } else {
        modal.append(`<span id="page">${title_page}</span>`);
      }
    }
  }
};
</script>

<style lang="scss">
.application ::selection {
  color: #ff0; /* Цвет текста */
  background: #000; /* Цвет фона */
}
</style>
