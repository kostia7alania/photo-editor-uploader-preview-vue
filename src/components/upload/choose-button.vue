<template>
      <div class="choose-btn">
        <input id="pic-upd" @change="changeHandler" multiple accept="image/*" type="file">
        <label for="pic-upd" class="btn draw-border">Choose images</label>
      </div>
</template>

<script>
export default {
  dete() {
    return {};
  },
  methods: {
    changeHandler(e) {
      if ("files" in e.target && e.target.files.length) {
        this.$store.dispatch("CHOOSE_PHOTO_HANDLER", e.target.files);
        e.target.value = "";
      }
    }
  }
};
</script>

<style lang='scss' scoped>
#pic-upd {
  display: none;
}

//=== Drawing effect
@mixin btn-border-drawing(
  $color: #ccc,
  $hover: black,
  $width: 2px,
  $vertical: top,
  $horizontal: left,
  $duration: 0.25s
) {
  box-shadow: inset 0 0 0 $width $color;
  color: $color;
  transition: color $duration $duration/3;
  position: relative;

  &::before,
  &::after {
    border: 0 solid transparent;
    box-sizing: border-box;
    content: "";
    pointer-events: none;
    position: absolute;
    width: 0;
    height: 0;

    #{$vertical}: 0;
    #{$horizontal}: 0;
  }

  &::before {
    $h-side: if($horizontal == "left", "right", "left");
    border-#{$vertical}-width: $width;
    border-#{$h-side}-width: $width;
  }

  &::after {
    $v-side: if($vertical == "top", "bottom", "top");

    border-#{$v-side}-width: $width;
    border-#{$horizontal}-width: $width;
  }

  &:hover {
    color: $hover;

    &::before,
    &::after {
      border-color: $hover;
      transition: border-color 0s, width $duration, height $duration;
      width: 100%;
      height: 100%;
    }

    &::before {
      transition-delay: 0s, 0s, $duration;
    }

    &::after {
      transition-delay: 0s, $duration, 0s;
    }
  }
  &:active {
    color: black;
    transform: scale(3);
  }
}

.draw-border {
  text-align: center;
  @include btn-border-drawing(#4caf50, #cd0a0a, 4px, bottom, right);
}

//=== Button styling, semi-ignore
.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem "Roboto Slab", sans-serif;
  padding: 1em 2em;
  letter-spacing: 0.05rem;

  &:focus {
    outline: 2px dotted #55d7dc;
  }

  &:active {
    transform: scale(0.9);
  }
}

.choose-btn {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
