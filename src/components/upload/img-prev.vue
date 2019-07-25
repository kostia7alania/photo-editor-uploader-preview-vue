<template>
  <div class="img-frame" ref="viewer">
    <img
      :alt="alt || 'Image preview'"
      :src="src"
      :data-original="src"
      @click="click_handler"
    />
  </div>
</template>
<script>
export default {
  props: ["src", "alt"],
  methods: {
    click_handler() {}
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
