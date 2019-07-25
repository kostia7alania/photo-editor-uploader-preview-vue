<template>
  <div class="slidecontainer">
    <div class="label-row">
      <label for="img-w">{{label}}</label>
      <input type="number" class="img-w" id="img-w"
        v-model="val"
        @blur="blur_handler($event.target.value)"
        :min="min" :max="max"/>
        <label for="myRange">px</label>
    </div>
    <input type="range" class="slider" id="myRange"
      v-model="val"
      :min="min" :max="max">
  </div>
</template>

<script>
export default {
  name: "slider",
  props: ["label", "value", "min", "max"],
  data() {
    return {};
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(e) {
        const res = this.blur_handler(e);
        if (res) this.$emit("input", +e);
      }
    }
  },
  mounted() {},
  methods: {
    blur_handler(val) {
      if (!val || ("" + val).trim() == "" || +val < +this.min)
        this.$emit("input", +this.min);
      else if (val > +this.max) this.$emit("input", +this.max);
      else return true;
    }
  }
};
</script>

<style lang="scss" scoped>
[for="img-w"] {
  width: 70px;
}
label,
input {
  width: 5em;
  padding: 0.2em 0.5em;
}
label {
  min-width: 30%;
}

/* SLIDER */
.slidecontainer {
  /*  width: 100%;*/
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
</style>


