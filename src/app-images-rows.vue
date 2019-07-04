<template>
  <div>
                    <div class="nav-btns">
                        <div><button type="button" class="modal-buttons" v-show="prevShow" @click="prevHandler">&#x2039; Previous</button></div>
                            <button style="width:200px;" type="button" @click="upload_mode = !upload_mode" class="modal-buttons">{{ upload_mode }}?"Show":"Upload"}} pictures</button>
                        <div><button type="button" class="modal-buttons" v-show="nextShow" @click="nextHandler">Next &#x203A;</button> </div>
                    </div>
                    <div>
                        <p><b>Remark: </b>{{elems[index].Remark}}</p>
                        <p><b>Nature: </b>{{elems[index].Nature}} - {{elems[index].Nature}}</p>
                        <p><b>Count of photos in the deficiency:</b> {{images.length}}</p>
                        <p v-if="images.length>0 && status==1">Click on the photo to enlarge</p>
                    </div>

                    <app-images-preview :images="images"/>

                    <div v-if="images.length==0 && status==1">
                        <h1 style="color:red"> No photos found...</h1>
                    </div>

                </div>
</template>

<script>
import appImagesPreviewVue from "./app-images-preview.vue";
export default {
  components: {
    "app-images-preview": appImagesPreviewVue
  }
};
</script>
