<template>
  <div class="img-frame">
    <img
      ref="viewer"
      :alt="alt || 'Image preview'"
      :src="src"
      :data-original="src"
      @click.stop="prev_separate"
    />
  </div>
</template>
<script>
export default {
  props: { src: {}, alt: {} },
  data() {
    return {
      viewer_instance: null
    };
  },
  methods: {
    prev_separate(e) {
      //EventBus.$emit("prev_gallery", this.i);//i don't know HOT TO OPEN GALLERY +ignore editor pictures:-( let show always separate pictures!
      this.viewer_destroy();
      this.viewer_instance = new Viewer(this.$refs.viewer).show();
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
