<template>
  <div class="upload-item-info">
    <p><b>{{ $t('upload-item-info.Name') }}:</b> {{upd.file.name}}</p>
    <p><b>{{ $t('upload-item-info.Type') }}:</b> {{upd.file.type}}</p>
    <p data-title-left-top :data-title="exif_comp"><b>{{ $t('upload-item-info.Date') }}:</b> {{fileDate}}</p>
    <p v-if="!upd.base64" :class="ERROR_maxSize&&'text-red'"><b>{{ $t('upload-item-info.Size') }}:</b>  {{size_filter_m(upd.file.size)}}</p>
    <p v-else data-title-left-top :data-title=" $t('upload-item-info.Before-editing')+': '+ size_filter_m(upd.file.size)" ><b>{{ $t('upload-item-info.New-size') }}:</b>         {{size_filter_m(getSizeFromBase64) }}</p>
    <p><b>{{ $t('upload-item-info.Photo-comments') }}:</b></p>
  </div>
</template>

<script>
export default {
  name: "upload-item-info",
  props: ["upd"],
  data() {
    return {};
  },
  beforeMount() {
    (async () => {
      if (!("EXIF" in window))
        window.EXIF = await import(
          /* webpackChunkName: "exif-JS" */
          /* webpackMode: "lazy" */
          /* webpackPrefetch: true */
          /* webpackPreload: true */
          "exif-js"
        ).then(m => m.default);
      window.EXIF;
      const that = this;

      EXIF.getData(this.upd.file, function() {
        var allMetaData = EXIF.getAllTags(this);
        ("DateTime" in allMetaData || "GPSDateStamp" in allMetaData) &&
          that.$store.commit("SET_EXIF", {
            hash: that.upd.hash,
            EXIF: allMetaData
          });
      });
    })();
  },
  computed: {
    exif_comp() {
      const exif = this.upd.EXIF;
      if (!exif) return this.$t("upload-item-info.Data-modified");
      const parseDate = dt =>
        new Date(dt.replace(/:/g, ".")).toLocaleDateString("ru");

      const DateTime =
        (exif.DateTime &&
          parseDate(exif.DateTime.split(" ")[0]) +
            " " +
            exif.DateTime.split(" ")[1]) ||
        "";
      const GPSDateStamp =
        (exif.GPSDateStamp && parseDate(exif.GPSDateStamp)) || "";
      let out = "";
      out += DateTime
        ? `${this.$t("upload-item-info.EXIF-DateTime")}: ${DateTime}`
        : "";
      out += out ? ". " : "";
      out += GPSDateStamp
        ? `${this.$t("upload-item-info.GPS-Date-Stamp")}: ${GPSDateStamp}`
        : "";

      return out;
    },
    fileDate() {
      const f = this.upd.file;
      const mod = f.lastModified || f.lastModifiedDate;
      return this.dateFmt(new Date(mod));
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
        ? `. ${this.$t("upload-item-info.Photo-comments")} : "${
            this.upd.comment
          }"`
        : "";
      const changed = this.upd.base64
        ? ` ${this.$t("upload-item-info.CHANGED")}`
        : "";

      return this.upd.file.name + comment + changed;
    }
  },
  methods: {
    dateFmt(e) {
      return e.toLocaleString("ru-RU");
    },
    size_filter_m(e) {
      if (!e) return "";
      return e / 1024 / 1024 > 1
        ? (e / 1024 / 1024).toFixed(0) + " " + this.$t("size.MB")
        : (e / 1024).toFixed(0) + " " + this.$t("size.KB");
    }
  }
};
</script>


<style lang="scss" scoped>
.upload-item-info {
  flex: 1 1 20em;
  max-width: 42vw;
  p {
    margin: 3px;
  }
}
.text-red {
  color: red;
}
</style>


