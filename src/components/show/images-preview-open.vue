<template>
  <div v-if="imgAltComp" class="v-viewer-modal-img">
    <!--
        <img
        :src="prev_img_src"
        :data-original="real_img_src"
        :alt="imgAltCompHTML"
      >
    -->
    <span
        @click="copySrc"
        data-title-right-top :data-title="$t('images-preview-open.click-to-copy')"
        class='row-index'>
          {{indexBadge}}
        </span>
      <input type="hidden" ref='to-coppy' :value="fullImgSrcComp">
      <img
        v-if="imgError === false"
        :src="prev_img_src"
        :style="{'background-image': bg}"
        :data-original="real_img_src"
        :alt="imgAltComp"
        @error="imgErrorHandler"
      />

      <svg
        v-else
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="111px"
        height="111px"
        viewBox="0 0 510 510"
        style="enable-background:new 0 0 510 510;"
        xml:space="preserve"
      >
        <g>
          <g id="block">
            <path
              d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M51,255c0-112.2,91.8-204,204-204
			c45.9,0,89.25,15.3,124.95,43.35l-285.6,285.6C66.3,344.25,51,300.9,51,255z M255,459c-45.9,0-89.25-15.3-124.95-43.35
			L415.65,130.05C443.7,165.75,459,209.1,459,255C459,367.2,367.2,459,255,459z"
            />
          </g>
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>

      <!--
            :style="{'background-image': 'url('+prev_img_src+')'}"

          <imgPrev

            hide_toolbar="false" hide_navbar="false"
            v-if="prev_img_src"
            :src="prev_img_src"
            :dataOriginal="real_img_src"
            :alt="imgAltComp"
      />-->
  </div>
</template>
<script>
export default {
  name: "images-preview-open",
  props: ["img", "i"],
  data() {
    return {
      indexBadge: this.i + 1,
      imgError: false,
      bg:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    };
  },
  components: {
    imgPrev: () => import("../img-prev.vue")
  },
  watch: {
    indexBadge(neww, old) {
      if (neww !== old) {
        setTimeout(() => (this.indexBadge = this.i + 1), 1000);
      }
    }
  },
  computed: {
    fullImgSrcComp() {
      return location.href + this.real_img_src;
    },
    url() {
      return this.$store.state.BASE_URL;
    },
    prev_img_src() {
      return (
        this.url + "action=get-picture&size=small&filename=" + this.img.FileName
      );
    },
    real_img_src() {
      return (
        this.url + "action=get-picture&size=real&filename=" + this.img.FileName
      );
    },
    imgAltComp() {
      /*let d;
      let what;
      ["DateOfInspect", "DateOfSubmit", "Date"].some((e, i) => {
        d = this.img[e];
        return (
          new Date(d) != "Invalid Date" &&
          ((i == 0 && (what = "Date of Inspect")) ||
            (i == 1 && (what = "Date of Submit")) ||
            (i == 2 && (what = "Modified date")))
        );
      });
      let out;
      if (!d.match(/\d\d:\d\d:\d\d/) || d.match("00:00:00"))
        out = new Date(d).toLocaleDateString("Ru-ru");
      else out = new Date(d).toLocaleString("Ru-ru");
      const c = this.img.Comments;
      const com = c && "<span class='preview-user-comment'>" + c + "</span>";
      const ret = `<b>${what}</b>:  ${out}
                  <br><b>Comment</b>: ${com} `;
      return ret;
      */
      const DateOfInspect = new Date(this.img.DateOfInspect).toLocaleDateString(
        "ru"
      );
      let caption = "";
      let titleDate = "";
      if ("DatePhotoFromBrowserYes" in this.img) {
        const DatePhoto = new Date(this.img.DatePhoto).toLocaleString("ru");
        // Сказали УБРАТЬ даты из подписи фоток
        //новая версия фоток, где есть ето поле в БД;
        if (this.img.DatePhotoFromBrowserYes == 1) {
          caption = `<span title='${this.$t(
            "images-preview-open.when-it-was-loaded"
          )}'>, ${this.$t(
            "images-preview-open.Photo-date"
          )}: s ${DatePhoto}</span>`;
          titleDate =
            `. ${this.$t("images-preview-open.when-it-was-loaded")}: ` +
            DatePhoto;
        } else if (this.img.DatePhotoFromBrowserYes == "0") {
          caption = `<span title='${this.$t(
            "images-preview-open.Photo-date"
          )}'>,
          ${this.$t("images-preview-open.Photo-date")}: ${DatePhoto}</span>`;
          titleDate = `. ${this.$t(
            "images-preview-open.Photo-date"
          )}: ${DatePhoto}`;
        }
        if (DatePhoto == "Invalid Date") {
          caption = `<span title='N/A'>, ${this.$t(
            "images-preview-open.Photo-date"
          )}: N/A </span>`;
          titleDate = `. ${this.$t("images-preview-open.Photo-date")}: N/A`;
        }
      }
      const Edited = ""; //(this.img.Edited == "1" && "<span title='This image was edited by user in the our editor'>[EDITED]</span><br>") || //пока вырубаем оповещение о том,что фотка была отредактирована! || "";
      const editedTitle =
        (this.img.Edited == "1" &&
          `. ${this.$t("images-preview-open.photo-was-edited")}.`) ||
        "";
      const c = this.img.Comments;
      const com = c && "<span class='preview-user-comment'>" + c + "</span>";
      const dtInsp = this.$t("images-preview-open.Date-of-inspection");
      const dOfInsp = `<span title='${dtInsp}'>${DateOfInspect}</span>`;
      //(Edited && 0) || "" /*пока вырубили показ отредактированности*/
      const ret = `${(caption && 0) || ""}
                  <br><b title='${dtInsp}: ${DateOfInspect}${titleDate}${editedTitle}'>
                  ${
                    com
                      ? `${this.$t("images-preview-open.Photo-comments")}:`
                      : ""
                  }</b> ${com} `;
      return ret;
    }
    /* imgAltCompHTML() {
      https://sun9-19.userapi.com/c851228/v851228860/1edbb8/3GcV18H2cU0.jpg
      https://sun9-43.userapi.com/c851228/v851228860/1edbc2/tNqICZ9wugM.jpg
      return `<div class="v-viewer-modal-img">
                  <p><b>Date: </b> ${new Date(this.img.Date).toLocaleString(
                    "Ru-ru"
                  )}</p>
                  ${
                    this.img.Comments.trim().length > 0
                      ? "<p><b>Photo comments: </b> " + this.img.Comments + "</p>"
                      : ""
                  }
                </div>`;
    }*/
  },
  methods: {
    imgErrorHandler() {
      this.imgError = true;
    },
    copySrc() {
      if (typeof this.indexBadge !== "number") return;
      const toCopy = this.$refs["to-coppy"];
      toCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      toCopy.select();
      try {
        this.indexBadge = document.execCommand("copy") ? "✓" : "x";
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      toCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style lang="scss">
.v-viewer-modal-img {
  display: flex;
  align-items: center;
  position: relative;
  img {
    max-height: 111px;
    width: 111px;
    cursor: pointer;
    margin: 0px 5px 5px 0;
    background-size: contain;
    /*background-image: url(https://cdn2.iconfinder.com/data/icons/picons-basic-3/57/basic3-010_creative_commons-256.png);*/
    /*AKA PLACeHOLDER->    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='111' height='111'%3E%3Crect x='2' y='2' width='107' height='107' style='fill:%23DEDEDE;stroke:%23555555;stroke-width:2'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='monospace, sans-serif' fill='%23555555'%3E111×111%3C/text%3E%3C/svg%3E");*/
  }

  .row-index {
    min-width: 20px;
    text-align: center;
    position: absolute;
    color: black !important;
    top: 1px;
    background: #ffcc009e;
    /* border: 1px solid red; */
    border-radius: 50%;
    padding: 4px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.4);
      background: yellow;
      color: red !important;
    }
    &:active {
      transform: scale(0.8);
      background: green;
      color: yellow !important;
    }
  }
}
</style>