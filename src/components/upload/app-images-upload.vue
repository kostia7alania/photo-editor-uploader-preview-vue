<template>
  <div class="modal-picture-uploader text-center" v-viewer="{ url: 'data-original' }">


      <div>
        <drag-drop @fileListHandler="fileListHandler"/>

        <upload-tips/>

        <choose-button @fileListHandler="fileListHandler"/>

          <transition-group name="slide" tag="div">

            <upload-item
                v-for="(upd,i) in uploading_list"
                :upd="upd"
                :insp_uid="insp_uid"
                :def_uid="def_uid"
                @delete="delete_handler(i)"
                @finished="finished_handler(i)"
                :key="upd.url"
                />
          </transition-group>
    </div>

  </div>
</template>

<script>
const loading = {
  template: `<h1 style="color:red">!!!!!!!!! LOADING !!!!!!!!!</h1>`
};
const error = { template: `<div>. . . ERROR...</div>` };
const con = { loading, error, delay: 20, timeout: 25000 };

const uploadTips = () => ({
  component: import(/* webpackChunkName: "upload-tips" */ "./upload-tips.vue"),
  ...con
});
const uploadItem = () => ({
  component: import(
    /* webpackChunkName: "upload-item" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./upload-item.vue"
  )
});
const chooseButton = () => ({
  component: import(
    /* webpackChunkName: "choose-button" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    "./choose-button.vue"
  )
});
const dragDrop = () => ({
  component: import(
    /* webpackChunkName: "drag-drop" */
    "./drag-drop.vue"
  )
});

export default {
  name: "app-images-upload",
  props: ["insp_uid", "def_uid"],
  components: {
    uploadItem,
    chooseButton,
    dragDrop,
    uploadTips
  },
  data() {
    return {
      uploading_list: []
    };
  },
  methods: {
    delete_handler(i) {
      this.uploading_list.splice(i, 1);
      //this.uploading_list = Object.assign({}, this.uploading_list); //this.uploading_list.push(e);
    },
    finished_handler(i) {
      let name = this.uploading_list[i].name;
      this.uploading_list.splice(i, 1);
      swal.fire({
        toast: true /*position: 'top-end',*/,
        showConfirmButton: false,
        timer: 5000,
        title:
          "Uploaded" +
          ((name && `: <span class="text-red"> ${name}</span>`) || ""),
        type: "success"
      });
    },

    fileListHandler(f) {
      const fileList = [];
      [...f].forEach(file => {
        if (file.type.indexOf("image") != -1) {
          fileList.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url: window.URL.createObjectURL(file),
            lastModifiedDate: file.lastModifiedDate.toLocaleString(),
            comment: "",
            fileSelf: file
          });
        } else console.warn("This file is not a picture: " + file.name + "!");
      });
      this.uploading_list = [...this.uploading_list, ...fileList];
    }
  }
};
</script>

<style>
.img_prev {
  height: 160px;
  max-width: 144px;
  padding: 0 10px;
}

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

