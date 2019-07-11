<template>
  <div>

    <div>
      <b>Remark: </b>{{elem.Comments}}<br> <!-- elem.Remark <- deprecated!!-->
      <b>Nature: </b>{{elem.Code}} - {{elem.Nature}}<br>
      <b>Count of photos in the deficiency:</b> {{images.length}}<br>
      <div class="text-gray" v-if="images.length>0">Click on the photo to enlarge</div>
    </div>

    <app-images-preview :images="images"/>

    <div v-if="images.length==0" class="text-center">
        <h1 style="color:red"> No photos found...</h1>
    </div>
  </div>
</template>

<script>
import appImagesPreviewVue from "./app-images-preview.vue";
export default {
  props: ["elem", "index", "images"],
  components: {
    "app-images-preview": appImagesPreviewVue
  },
  mounted() {}
};
</script>
<style>
.text-gray {
  font-size: 0.8em;
  color: #4a89dc;
}
</style>
