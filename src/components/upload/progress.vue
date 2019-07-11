<template>
    <div class="container">
              <input style="display:none" type="radio" name="switch-color" id="red" checked>
                <div class="chart" :class="chartClass">
                    <div :class="progressClass" class="bar white">
                        <div class="face top">
                            <div class="growing-bar"></div>
                        </div>
                        <div class="face side-0">
                            <div class="growing-bar"></div>
                        </div>
                        <div class="face floor">
                            <div class="growing-bar"></div>
                        </div>
                        <div class="face side-a"></div>
                        <div class="face side-b"></div>
                        <div class="face side-1">
                            <div class="growing-bar"></div>
                        </div>
                    </div>
                </div>
  </div>
</template>
<script>
export default {
  name: "progress-bar",
  props: ["percentage"],
  data() {
    return {
      //  percentage: 0
    };
  },
  mounted() {
    /*const a = setInterval(
      (() => {
        this.percentage++;
        console.log(this.percentage);
        if (this.percentage == 100) {
          clearInterval(a);
        }
      }).bind(this),
      44
    );
    */
  },
  computed: {
    progressClass() {
      return `bar-${this.percentage}`;
    },
    chartClass() {
      return this.percentage < 1 || this.percentage > 99 ? "font-size-0" : "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~compass-mixins/lib/compass/reset";
@import "~compass-mixins/lib/compass/css3";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:700, 300");
$yellow: #f1c40f;
$lime: #76c900;
$navy: #0a4069;
$cyan: #57caf4;
$red: #ec008c;
$red: $lime;
$white: #fefefe;
$gray: #444;
$lightGray: lighten($gray, 30);

$transitionDuration: 0.3s;
$transition: all $transitionDuration ease-in-out;
.chart {
  font-size: 1em;
  /*perspective: 1000px;*/
  perspective: 100000px;
  perspective-origin: 50% 50%;
  backface-visibility: visible;
}

$faceColor: rgba($white, 0.3);
$growColor: rgba($red, 0.6);

.bar {
  font-size: 1em;
  position: relative;
  height: 10em;
  transition: $transition;
  transform: rotateX(60deg) rotateY(0deg);
  transform-style: preserve-3d;
  .face {
    font-size: 2em;
    position: relative;
    width: 100%;
    height: 2em;
    background-color: $faceColor;
    &.side-a,
    &.side-b {
      width: 2em;
    }
  }
  .side-a {
    transform: rotateX(90deg) rotateY(-90deg) translateX(2em) translateY(1em)
      translateZ(1em);
  }
  .side-b {
    transform: rotateX(90deg) rotateY(-90deg) translateX(4em) translateY(1em)
      translateZ(-1em);
    position: absolute;
    right: 0;
  }
  .side-0 {
    transform: rotateX(90deg) rotateY(0) translateX(0) translateY(1em)
      translateZ(-1em);
  }
  .side-1 {
    transform: rotateX(90deg) rotateY(0) translateX(0) translateY(1em)
      translateZ(3em);
  }
  .top {
    transform: rotateX(0deg) rotateY(0) translateX(0em) translateY(4em)
      translateZ(2em);
  }
  .floor {
    box-shadow: 0 0.1em 0.6em rgba(0, 0, 0, 0.3),
      0.6em -0.5em 3em rgba(0, 0, 0, 0.3), 1em -1em 8em $white;
  }
}

.growing-bar {
  transition: $transition;
  background-color: $growColor;
  width: 100%;
  height: 2em;
}

@mixin drawSkin($color, $name) {
  .bar.#{$name} {
    .side-a,
        // &.bar-100 .side-b,
        .growing-bar {
      background-color: rgba($color, 0.6);
    }
    .side-0 .growing-bar {
      box-shadow: -0.5em -1.5em 4em $color;
    }
    .floor .growing-bar {
      box-shadow: 0em 0em 2em $color;
    }
  }
}

@mixin drawFaces($color, $name) {
  .chart .bar.#{$name} .face {
    background-color: rgba($color, 0.2);
  }
}

@include drawSkin(rgba($red, 0.8), "red");

@include drawFaces(rgba($red, 0.6), "red-face");

@for $i from 0 to 101 {
  .bar-#{$i} {
    .growing-bar {
      width: percentage($i/100);
    }
  }
}

/*
END // CHART'S RULES
*
*
*/

input[id="red"]:checked ~ .chart {
  @extend .bar.red;
}

input[id="pos-0"]:checked ~ .chart {
  @extend .bar-25;
}
input[id="pos-1"]:checked ~ .chart {
  @extend .bar-50;
}
input[id="pos-2"]:checked ~ .chart {
  @extend .bar-75;
}
input[id="pos-3"]:checked ~ .chart {
  @extend .bar-100;
}

.font-size-0 {
  font-size: 0em;
}
</style>

