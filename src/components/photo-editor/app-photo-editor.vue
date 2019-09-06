<template>
  <div>
    <header>
      <h1>Crop and save </h1>
    </header>

  <section class="cropper">

    <div v-if="editor" class="box">
        <img class="orig_img" :src="editor" ref='original'>
    </div>

    <div class="box-2">
      <div>
        <div class="options">
         <slider label="Width"  v-model="width" :min="width_min" :max="width_max"/>
          <!-- <slider label="Height" v-model="h" :min="min" :max="max"/>-->

        </div>
        <div class="btns-row">
          <button @click="rotateToggle" class="btn save" :class="rotate_open && 'text-red'">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="33" height="26" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><g id="screen-rotation"><path d="M419.475,63.75c84.15,38.25,142.8,119.85,153,216.75h38.25C595.425,122.4,465.375,0,304.725,0c-5.1,0-10.2,0-17.85,0l96.9,96.9L419.475,63.75z M258.825,43.35c-15.3-15.3-38.25-15.3-53.55,0l-163.2,163.2c-15.3,15.3-15.3,38.25,0,53.55l306,306c15.301,15.301,38.25,15.301,53.551,0L564.825,402.9c15.301-15.301,15.301-38.25,0-53.551L258.825,43.35z M376.125,540.6l-306-306l163.2-163.2l306,306L376.125,540.6z M189.975,548.25c-84.15-38.25-142.8-119.85-153-216.75h-35.7c12.75,158.1,142.8,280.5,303.45,280.5c5.1,0,10.2,0,17.85,0l-96.899-96.9L189.975,548.25z"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </button>
          <button class="btn save" @click="cancel">Cancel</button>
          <button class="btn save" @click="save" :class="{'disabled': save_disabled }">Save</button>
        </div>

        <slider v-if="rotate_open" label="Angle"  v-model="rotate_angle" :min="0" :max="360"/>

      </div>

      <photo-editor-prev
        :cropped="cropped"
        :w="width"
        :h="height"
        :originalImageData="originalImageData"
        :originalSize="upd.file.size"
      />

    </div>
  </section>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

import { loading, error, delay, timeout } from "../../stages";

const photoEditorPrev = () => ({
  component: import(
    /* webpackChunkName: "photo--EditorPrev"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./photo-editor-preview"
  ),
  loading,
  error,
  delay,
  timeout
});
const slider = () => ({
  component: import(
    /* webpackChunkName: "slider"*/
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./slider/slider"
  ),
  loading,
  error,
  delay,
  timeout
});

const fixResizeBuge = e => e.stopImmediatePropagation();

export default {
  name: "app-photo-editor",
  props: ["editor", "upd"],
  components: {
    slider,
    photoEditorPrev
  },
  data() {
    return {
      rotate_open: false,
      rotate_angle: 0,
      cropped: null,
      width: 300,
      height: 300,
      width_min: 100,
      width_max: 1200,
      cropper_instance: null,
      detail: {},
      refresh_timeout: null,
      imageSmoothingQuality: ["low", "medium", "high"],
      imageSmoothingQuality_active: 0,
      originalImageData: {}
    };
  },
  computed: {
    save_disabled() {
      return !this.cropped || this.cropped.length < 10;
    }
  },
  watch: {
    rotate_angle(neww, old) {
      if (neww != old) {
        this.rotate_handler(-old);
        this.rotate_handler(neww);
      }
    },
    width(neww, old) {
      this.preview();
    },
    height(neww, old) {
      this.preview();
    }
  },
  beforeMount: () => window.addEventListener("resize", fixResizeBuge),
  beforeDestroy: () =>
    document.querySelectorAll(".cropper").length ||
    window.removeEventListener("resize", fixResizeBuge), //|| console.warn("UNMOUNTED");
  mounted() {
    const image = this.$refs["original"];
    window.cropper_instance = this.cropper_instance = new Cropper(image, {
      // init cropper
      //aspectRatio: 16 / 9,
      autoCropArea: 0.9,
      zoomable: false,
      movable: false,
      minContainerWidth: 200,
      minContainerHeight: 100,
      crop: event => {
        this.$set(this, "detail", event.detail);
        if (window.devMode) {
          console.log("x ", event.detail.x);
          console.log("y ", event.detail.y);
          console.log("width ", event.detail.width);
          console.log("height ", event.detail.height);
          console.log("rotate ", event.detail.rotate);
          console.log("scaleX ", event.detail.scaleX);
          console.log("scaleY ", event.detail.scaleY);
        }
        this.preview();
        const w = event.detail.width;
        if (this.width == w) return;
        if (this.width_min > w) return;
        if (this.width > w) return;
        //if( this.width_min > w) return this.width = w;

        this.width_max = parseInt(w);

        this.originalImageData = this.cropper_instance.getImageData();
      }
    });
  },
  methods: {
    rotateToggle() {
      this.rotate_open = !this.rotate_open;
    },
    rotate_handler(angle) {
      if (!angle) return console.warn("angle undefined");
      this.cropper_instance.rotate(angle); //.move(1, -1)
    },
    preview() {
      this.cropped = null;
      clearTimeout(this.refresh_timeout);
      this.refresh_timeout = setTimeout(() => {
        this.cropped = this.cropper_instance
          .getCroppedCanvas({
            minWidth: 10,
            minHeight: 10,
            maxWidth: 1500,
            maxHeight: 1500,
            width: this.width,
            rotate: this.rotate_angle,
            imageSmoothingQuality: "high"
          })
          .toDataURL("image/jpeg");
        window.devMode && console.log("preview _timeout");
        this.refresh_timeout = null;
      }, 150);
      window.devMode && console.log("preview add to timeout shedule");
    },
    save() {
      if (this.save_disabled)
        return window.devMode && console.log("BTN IS BLOCKED");
      this.$emit("save", this.cropped);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="scss" scoped>
.btns-row {
  display: flex;
}
h1 {
  text-align: center;
}
.cropper {
  margin: 1em auto;
  max-width: 768px;
  display: flex;
  align-items: flex-start;
  height: auto;

  .box {
    padding: 0.5em;
    width: 100%;
    margin: 0.5em;
  }

  .box-2 {
    padding: 1px;
    width: calc(100% / 2 - 1em);
  }

  .options label,
  .options input {
    width: 5em;
    padding: 0.2em 0.5em;
  }
  .options label {
    min-width: 30%;
  }

  .btn {
    background: white;
    color: black;
    border: 1px solid black;
    padding: 0.5em 1em;
    text-decoration: none;
    margin: 0.8em 0.3em;
    display: inline-block;
    cursor: pointer;
    transition: 0.2s;
    &:active {
      transform: scale(0.9);
    }
    &:hover {
      transform: scale(1.1);
    }

    &.disabled {
      background: gray;
      &:active,
      &:hover {
        transform: scale(1);
      }
    }
  }

  img.orig_img {
    max-width: 100%;
  }
}
.text-red {
  color: red;
}
</style>


