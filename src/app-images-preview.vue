<template>
    <div v-viewer="options" class="v-viewer-modal v-viewer-modal-custom" ref="viewer" >
        <div v-for="img in images" :key="img.FileName">

            <app-images-preview-open :img="img"/>

            <div class="v-viewer-modal-desc">
                <p><b>Date:</b> {{img.Date | toRuDate}}</p>
                <p v-if="img.Comments.trim().length>0"><b>Comment:</b> {{img.Comments}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "app-images-preview",
  props: ["images"],
  data() {
    return { options: { url: "data-original" } };
  },
  mounted() {
    console.log("v-vue mounted .!.");
  },
  filters: {
    toRuDate(e) {
      return new Date(e).toLocaleDateString("RU-ru");
    }
  }
};
</script>