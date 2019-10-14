<template>
    <div v-if="imgAltComp" class="v-viewer-modal-img">
      <!--
        <img
        :src="prev_img_src"
        :data-original="real_img_src"
        :alt="imgAltCompHTML"
      >
      -->
      <div>
         <img
            :src="prev_img_src"
            :style="{'background-image': bg}"
            :data-original="real_img_src"
            :alt="imgAltComp"
          />
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
    </div>
</template>
<script>
export default {
  name: "images-preview-open",
  props: ["img"],
  data() {
    return {
      bg:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    };
  },
  components: {
    imgPrev: () => import("../img-prev.vue")
  },
  computed: {
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
          )}'>, ${this.$t("Photo-date")}: ${DatePhoto}</span>`;
          titleDate = `. ${this.$t("when-it-was-loaded")}: ` + DatePhoto;
        } else if (this.img.DatePhotoFromBrowserYes == "0") {
          caption = `<span title='${this.$t(
            "images-preview-open.Photo-date"
          )}'>, ${this.$t(
            "images-preview-open.Photo-date"
          )}: ${DatePhoto}</span>`;
          titleDate =
            ". ${this.$t('images-preview-open.Photo-date')}: " + DatePhoto;
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
      const dOfInsp = `<span title='${this.$t(
        "images-preview-open.Date-of-inspection"
      )}'>${DateOfInspect}</span>`;
      //(Edited && 0) || "" /*пока вырубили показ отредактированности*/

      const ret = `${(caption && 0) || ""}
                  <br><b title='${this.$t(
                    "images-preview-open.Date-of-inspection"
                  )}: ${DateOfInspect}${titleDate}${editedTitle}'>
                  ${
                    com
                      ? `${this.$t("images-preview-open.Photo-comments")}:`
                      : ""
                  }</b> ${com} `;
      return ret;
    }
    /* imgAltCompHTML() {
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
  }
};
</script>