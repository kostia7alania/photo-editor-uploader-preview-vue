<template>
  <div class="img-frame">
    <img
      ref="viewer"
      :alt="alt_data"
      :src="image"
      :data-original="orig"
      @click.stop="prev_separate"
    />
  </div>
</template>
<script>
export default {
  name: "app-image-preview",
  props: {
    src: {},
    alt: {},
    base64: {},
    dataOriginal: {},
    hide_navbar: { default: () => false },
    hide_toolbar: { default: () => false }
  },
  data() {
    return {
      alt_data: this.alt || "Image preview",
      image: null,
      orig: this.dataOriginal || this.src,
      block_image: `data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='510px' height='510px' viewBox='0 0 510 510' style='enable-background:new 0 0 510 510;' xml:space='preserve'%3E%3Cg%3E%3Cg id='do-not-disturb'%3E%3Cpath d='M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M51,255c0-112.2,91.8-204,204-204c45.9,0,89.25,15.3,124.95,43.35l-285.6,285.6C66.3,344.25,51,300.9,51,255z M255,459c-45.9,0-89.25-15.3-124.95-43.35L415.65,130.05C443.7,165.75,459,209.1,459,255C459,367.2,367.2,459,255,459z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E`,
      viewer_instance: null
    };
  },
  beforeMount() {
    if (!this.initParams()) return;
    axios
      .get(this.src, { responseType: "arraybuffer" })
      .then(e => {
        if (e.data) {
          const file = e.data;
          //const base64 = btoa(new Uint8Array(e.data).reduce((data, byte) => data + String.fromCharCode(byte),""));

          const base64 = Buffer.from(e.data, "binary").toString("base64");
          this.image = "data:;base64," + base64;
          this.orig = this.dataOriginal;
        } else {
          this.image = this.block_image;
          this.alt_data = null;
        }
      })
      .catch(err => {
        console.warn("error image getting =>", err);
        this.image = this.block_image;
        this.alt_data = null;
      });
  },
  watch: {
    base64() {
      this.initParams();
    }
  },
  methods: {
    initParams() {
      if (this.base64) {
        this.image = this.base64;
      } else if (this.src.match("blob:") || this.src.match("data:")) {
        this.image = this.src;
      } else return true;
    },
    prev_separate(e) {
      //EventBus.$emit("prev_gallery", this.i);//i don't know HOT TO OPEN GALLERY +ignore editor pictures:-( let show always separate pictures!
      const options = {};
      this.hide_navbar && (options.navbar = 0);
      this.hide_toolbar && (options.toolbar = 0);

      this.viewer_destroy();
      this.viewer_instance = new Viewer(this.$refs.viewer, options).show();
    },
    viewer_destroy() {
      this.viewer_instance && this.viewer_instance.destroy();
    }
  },
  beforeDestroy() {
    this.viewer_destroy();
  }
};
</script>

<style lang="scss">
.img-frame {
  position: relative;
  width: 150px;
  height: 150px;
  background: #fcfdfd;
  margin: 20px auto;
  overflow: hidden;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
}

.img-frame img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 150px;
  max-width: 150px;
  cursor: pointer;
}

.vert {
  width: 100%;
}

.hor {
  height: 100%;
}
</style>
