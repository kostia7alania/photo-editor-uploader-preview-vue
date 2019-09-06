<template>
  <div class="modal-picture-uploader text-center" v-viewer="{ url: 'data-original' }">


      <div>
        <drag-drop/>

        <upload-tips/>

        <choose-button/>

          <transition-group name="slide" tag="div">

            <upload-item
                v-for="(upd,i) in ARRAY_UPLOADING_LIST"
                :upd="upd"
                :key="upd.hash"
                />
          </transition-group>
    </div>

  </div>
</template>

<script>
import stages from "../../stages";
import { loading, error, delay, timeout } from "../../stages";

const uploadTips = () => ({
  component: import(/* webpackChunkName: "upload-tips" */ "./upload-tips.vue"),
  //loading, error,delay,timeout
});
const uploadItem = () => ({
  component: import(
    /* webpackChunkName: "upload-item" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./upload-item.vue"
  ),
  loading,
  error,
  delay,
  timeout
});
const chooseButton = () => ({
  component: import(
    /* webpackChunkName: "choose-button" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./choose-button.vue"
  ),
  loading,
  error,
  delay,
  timeout
});
const dragDrop = () => ({
  component: import(
    /* webpackChunkName: "drag-drop" */
    "./drag-drop.vue"
  ),
  loading,
  error,
  delay,
  timeout
});

export default {
  name: "app-images-upload",
  components: {
    uploadItem,
    chooseButton,
    dragDrop,
    uploadTips
  },
  data() {
    return {};
  },
  computed: {
    ARRAY_UPLOADING_LIST() {
      return this.$store.getters.ARRAY_UPLOADING_LIST;
    }
  }
};
</script>

<style>
.text-green {
  color: green;
}
.text-red {
  color: red;
}

.items-center {
  align-items: center;
}

.drag-overlay {
  position: absolute;
  font-size: 5em;
  background: #ffcc0094;
  border-radius: 30px;
  z-index: -1;
}

/* slide animation */
.slide-leave-active,
.slide-enter-active {
  transition: 0.8s;
}
.slide-enter {
  opacity: 1;
  transform: translate(0, 100%);
}

.slide-leave {
  opacity: 0;
}

.slide-leave-to {
  transform: translate(0, -100%);
}

.slide-move {
  transition: 0.8s;
}
</style>

