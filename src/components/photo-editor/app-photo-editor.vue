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
          <button class="btn save" @click="$emit('close')">Cancel</button>
          <button class="btn save" :class="{'disabled': save_disabled }" @click="save">Save</button>
        </div>
      </div>

      <editorPrev v-if="cropped" :cropped="cropped" :w="width" :h="height"/>

    </div>
  </section>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import sliderVue from "./slider/slider";
import { setTimeout } from "timers";
export default {
  name: "app-photo-editor",
  props: ["editor"],
  components: {
    slider: sliderVue,
    editorPrev: () => import("./photo-editor-preview")
  },
  data() {
    return {
      cropped: null,
      width: 300,
      height: 300,
      width_min: 100,
      width_max: 1200,
      cropper_instance: null,
      detail: {},
      refresh_timeout: null
    };
  },
  computed: {
    save_disabled() {
      return !this.cropped;
    }
  },
  watch: {
    width(neww, old) {
      this.preview();
    },
    height(neww, old) {
      this.preview();
    }
  },
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
        window.e = event;
        this.$set(this, "detail", event.detail);
        console.log(event.detail.x);
        console.log(event.detail.y);
        const w = event.detail.width;
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
        if (this.width == w) return;
        if (this.width_min > w) return;
        if (this.width > w) return;
        //if( this.width_min > w) return this.width = w;

        this.width_max = w;
        this.preview();
      }
    });
  },
  methods: {
    preview() {
      this.cropped = null;
      clearTimeout(this.refresh_timeout);
      this.refresh_timeout = setTimeout(() => {
        this.cropped = this.cropper_instance
          .getCroppedCanvas({ width: this.width })
          .toDataURL("image/jpeg");
        console.log("preview _timeout");
        this.refresh_timeout = null;
      }, 300);
      console.log("preview add to timeout shedule");
    },
    save() {
      if (this.save_disabled) return console.log("BTN IS BLOCKED");
      console.log("save=>", this.cropped);
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
  height: 100%;

  .box {
    padding: 0.5em;
    width: 100%;
    margin: 0.5em;
  }

  .box-2 {
    padding: 0.5em;
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
</style>


