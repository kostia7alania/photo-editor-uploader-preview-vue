<template>
    <div v-if="init">
        <div v-if="upload_mode">
            <div style="display: flex;" class="poll-down">
                <button style="text-align:center; width:100%; border-radius:0;"
                        type="button" @click="upload_mode_handler" class="modal-buttons">
                        &#xab; Back to show pictures
                </button>
            </div>

            <app-images-upload :def_uid="def_uid" :insp_uid="insp_uid" :baseUrl='baseUrl'/>
        </div>
        <div v-else>
            <Loading v-if="status==0"/>
            <div v-if="status==1">

            </div>
            <div v-if="status==2">
                Error in the request...
                Please, check you internet-connection or try again later.
            </div>
            <div style="position: absolute;text-align: center; bottom: 0px; left:0px; right:0px" class="poll-down">
                <!--<button style="text-align:center; width:100%;  border-radius:0;"
                    type="button" @click="upload_mode = !upload_mode" class="modal-buttons">{{upload_mode?"Show":"Upload"}} pictures</button>-->
            </div>
        </div>
    </div>
</template>

<script>
import appImagesUploadVue from "./app-images-upload.vue";
import LoadingVue from "./Loading.vue";

export default (window.photos_modal_app = {
  name: "photos_modal_app",
  components: {
    "app-images-upload": appImagesUploadVue,
    Loading: LoadingVue
  },
  data() {
    return {
      init: 0,
      upload_mode: null, // true - upload_mode || false -  show_mode
      readOnly: true,
      status: -1,
      images: [],
      def_uid: null,
      insp_uid: null,
      elems: [],
      index: "",
      baseUrl: "./"
    };
  },
  mounted() {
    this.init = 1;
    console.log("MAIN  mounted .!.");
    EventBus.$on("get_info_global", this.get_info_global);
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
    }
  },
  methods: {
    upload_mode_handler() {
      this.upload_mode = !this.upload_mode;
      if (this.upload_mode == 0) this.get_info();
    },
    nextHandler() {
      let index = 0;
      this.elems.forEach((e, i) => {
        if (e.def == this.def_uid) {
          index = i;
        }
      });
      this.def_uid =
        this.elems.length - 1 > index
          ? this.elems[index + 1]["def"]
          : this.elems[0]["def"]; //берем следующую деф);
      this.get_info();
    },

    prevHandler() {
      this.elems.forEach((e, i) => {
        if (e.def == this.def_uid) {
          this.def_uid =
            i > 0
              ? this.elems[i - 1]["def"]
              : this.elems[this.elems.length - 1]["def"]; //берем следующую деф);
        }
      });
      this.get_info();
    },
    init_params({
      def_uid,
      insp_uid,
      elems,
      upload_mode,
      readOnly,
      baseUrl = "./"
    }) {
      this.def_uid = def_uid;
      this.insp_uid = insp_uid;
      this.elems = elems;
      this.upload_mode = upload_mode;
      this.readOnly = readOnly;
      this.baseUrl = baseUrl;
    },
    get_info_global(props) {
      this.init_params(props);
      this.get_info();
    },
    get_info(props) {
      this.upload_mode = 0;
      this.init = 1; // show
      this.status = 0;
      this.images = [];

      const url = `${this.baseUrl}?action=viewimage_kost&def_uid=${
        this.def_uid
      }&insp_uid=${this.insp_uid}`;
      axios
        .post(url)
        .then(res => {
          const result = res.data;
          if (result) {
            this.images = [];
            if ("File" in result) {
              if (typeof result.File["@attributes"] != "undefined")
                this.images.push(result.File["@attributes"]);
              else result.File.forEach(e => this.images.push(e["@attributes"]));
            }
          }
          this.status = 1;
          this.elems.forEach(
            (el, ind) =>
              (this.index =
                el.def == this.def_uid && el.insp == this.insp_uid
                  ? ind
                  : this.index)
          );
        })
        .catch(err => {
          console.log("result is EMPTY .!.=>" + err);
          this.status = 2;
          this.index = "";
        });
    }
  }
});
</script>

