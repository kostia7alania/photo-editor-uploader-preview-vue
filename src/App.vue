<template>
      <div v-if="init" class="application">
          <navBtnsVue
            @upload_mode_toggle="upload_mode_toggle"
            :prevShow="prevShow"
            :nextShow="nextShow"
            :upload_mode="upload_mode"
            @nextHandler="nextHandler"
            @prevHandler="prevHandler"
          />
          <app-images-upload v-if="upload_mode" :def_uid="def_uid" :insp_uid="insp_uid"/>
          <div v-else>
              <LoadingVue v-if="loading"/>
              <error-render v-else-if="error" :error="error" @get_info="get_info"/>
              <div v-else>
                  <!--<appImagesRowsVue
                    v-for="elem in elems"
                    :key="elem.def + elem.insp"
                    :elem="elem"
                    :images="images"
                    :index="index"
                  />-->
                  <appImagesRowsVue
                    :elem="elems[index]"
                    :images="images"
                    :index="index"
                  />
              </div>
              <!--
              <div style="position: absolute;text-align: center; bottom: 0px; left:0px; right:0px" class="poll-down">

                    <button style="text-align:center; width:100%;  border-radius:0;"
                     type="button" @click="upload_mode = !upload_mode" class="modal-buttons">{{upload_mode?"Show":"Upload"}} pictures</button>
              </div>
              -->
          </div>



      </div>
</template>

<script>
import appImagesRowsVue from "./components/show/app-images-rows.vue";
import appImagesUploadVue from "./components/upload/app-images-upload.vue";
import LoadingVue from "./components/Loading.vue";
import config from "../config";
import navBtnsVue from "./components/nav-btns.vue";
import errorRenderVue from "./components/error-render.vue";

export default window.photos_modal_app = {
  name: "photos_modal_app",
  components: {
    "app-images-upload": appImagesUploadVue,
    LoadingVue,
    appImagesRowsVue,
    navBtnsVue,
    "error-render": errorRenderVue
  },
  data() {
    return {
      init: 0,
      upload_mode: false, // true - upload_mode || false -  show_mode
      readOnly: true,
      error: null,
      loading: true,
      images: [],
      def_uid: null,
      insp_uid: null,
      elems: []
    };
  },
  mounted() {
    EventBus.that = this;
    console.log("MAIN  mounted .!.");
    EventBus.$on("get_info_global", this.get_info_global.bind(this));
    EventBus.$on("modal_closed", () => {
      window.VUE_PICTURE.$destroy();
      window.VUE_PICTURE = undefined;
    });
    window.addEventListener("keydown", this.keyHandler);
  },
  beforeDestroy() {
    this.destroyMe();
  },
  watch: {
    upload_mode(neww, old) {
      !this.upload_mode && this.get_info();
    }
  },
  computed: {
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
    },
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
    destroyMe() {
      $("#photos_modal").remove();
      EventBus.$off("get_info_global");
      EventBus.$off("modal_closed");
      window.removeEventListener("keydown", this.keyHandler);
    },
    keyHandler(e) {
      if (this.upload_mode) return;
      e = e || window.event;
      if (e.keyCode == "38") {
      } else if (e.keyCode == "40") {
      } else if (/*e.keyCode == "39"*/ e.key === "ArrowRight") {
        this.nextHandler();
      } else if (/*e.keyCode == "37"*/ e.key === "ArrowLeft") {
        this.prevHandler();
      } else if (e.key === "Escape") {
        this.destroyMe();
      }
    },
    upload_mode_toggle() {
      this.upload_mode = !this.upload_mode;
    },
    nextHandler() {
      if (this.nextShow && typeof this.index != "undefined") return;
      this.def_uid = this.elems[this.index + 1]["def"];
      this.get_info();
    },

    prevHandler() {
      if (this.prevShow && typeof this.index != "undefined") return;
      this.def_uid = this.elems[this.index - 1]["def"];
      debugger;
      this.get_info();
    },
    init_params({ def_uid, insp_uid, elems, upload_mode, readOnly }) {
      this.def_uid = def_uid;
      this.insp_uid = insp_uid;
      this.elems = elems;
      this.upload_mode = upload_mode;
      this.readOnly = readOnly;
    },
    get_info_global(props) {
      this.init = 1;
      this.init_params(props);
      !props.upload_mode && this.get_info();
    },
    async get_info() {
      const that = EventBus.that;
      that.images = [];
      const url = `${config.base_url}?action=viewimage_kost&def_uid=${that.def_uid}&insp_uid=${that.insp_uid}`;
      that.loading = true;
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
          console.warn("server wrong answer");
        })
        .catch(err => {
          console.log("result is EMPTY .!.=>" + err);
          that.error = err;
        })
        .finally(() => {
          that.loading = false;
          that.modalPageTitleHandler();
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
