<template>
    <div style="text-align:center">
      <div style="margin-bottom:10px;">
        <p><b>You can choose and upload multiple images at once.</b></p>
        <p>Types of files - gif, png, jpg, jfif, etc.</p>
        <p>The maximum size should not exceed 5 mbyte and the resolution should be within 4k.</p>
        <p>Please, choose files for preview and further upload.</p>
      </div>
      <div style="margin-bottom:10px;">
        <input @change="input_change_handler" style="color: transparent;width: 86px;" multiple accept="image/*" type="file">
      </div>

      <div style="margin-bottom:10px;">

        <h1 style="color:green" v-if="loading==0">All uploads are completed!</h1>
        <h1 style="color:red" v-if="loading==2">Uploaded with errors! Maybe you should see below for details.</h1>

        <div v-for="(upd,i) in uploading_list" :key="i" class="files_container" style="padding: 10px; border: 1px solid #006798;" >
        <div style="display:flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="color:red" v-if="upd.error==1">Error while uploading the file!</h1>
            <h1 style="color:red" v-if="(upd.size/1024/1024)>maxFileSize">Exceeded the maximum file size of {{maxFileSize}} MB!</h1>
            <p><b>Name:</b> {{upd.name}}</p>
            <p><b>Type:</b> {{upd.type}}</p>
            <p><b>Size:</b>         {{upd.size | size_filter}}</p>
            <p><b>Modified Date:</b> {{upd.lastModifiedDate}}</p>
            <p><b>Your comments:</b></p>
            <textarea cols="40" rows="5" @keyup="$data.uploading_list[i].comment = $event.target.value" :value="$data.uploading_list[i].comment"> </textarea>
          </div>
          <div><img style="height: 160px; max-width: 144px; padding: 0 10px;" :src="upd.url"></div>
          <div> <button type="button" class="modal-buttons" v-bind="{['disabled']: loading==1}" @click="delete_handler(i)">Delete</button> </div>
        </div>
      </div>

      </div>
      <div v-if="uploading_list.length>0" >
        <button type="button" class="modal-buttons" v-bind="{['disabled']: loading==1}" @click="upload">{{loading==1?"Loading...":uploading_list.length>1?'Upload all':'Upload'}}</button>
      </div>
  </div>
</template>
<script>
export default {
  name: "app-images-upload",
  props: ["insp_uid", "def_uid", "baseUrl"],
  data() {
    return {
      maxFileSize: 5, // ограничение в 5 мегабайт!
      uploading_list: [],
      loading: -1
    };
  },
  methods: {
    delete_handler(i) {
      this.uploading_list.splice(i, 1);
    },
    upload() {
      this.loading = 1;
      console.log("upload", this._data);
      window.formData = new FormData();
      this.uploading_list.forEach((e, i) => {
        formData.append("files-" + i, e.fileSelf);
        formData.append("comments[]", e.comment);
      });
      formData.append("insp_uid", this.insp_uid);
      formData.append("def_uid", this.def_uid);
      config = { headers: { "content-type": "multipart/form-data" } };
      const url = this.baseUrl + "?action=savepic_kost";
      axios
        .post(url, formData, config)
        .then(e => {
          if (!e.data) throw "no data.!.";
          data = e.data.errors;
          data.forEach(el => (this.uploading_list[el].error = 1));
          //this.uploading_list.forEach((el,i)=>el.error==0?this.uploading_list.splice(i,1):'');
          this.uploading_list = this.uploading_list.filter(el => el.error == 1);
          this.loading = 0;
        })
        .catch(e => {
          this.loading = 2;
          console.log("catch->", e);
          alert("Error");
          this.loading = 3;
        });
    },
    input_change_handler(e) {
      this.loading = -1;
      if ("files" in e.target && e.target.files.length > 0) {
        var f = e.target.files;
        for (let i = 0; i < f.length; i++) {
          if (f[i].type.indexOf("image") != -1) {
            this.uploading_list.push({
              name: f[i].name,
              size: f[i].size,
              type: f[i].type,
              url: window.URL.createObjectURL(f[i]),
              lastModifiedDate: f[i].lastModifiedDate.toLocaleString(),
              comment: "",
              fileSelf: f[i]
            });
          } else alert("This file is not a picture: " + f[i].name + "!");
        }
        e.target.value = "";
      }
    }
  },
  mounted() {
    console.log("pic uploader component mounted .!.");
  },
  filters: {
    size_filter(e) {
      window.size = e;
      console.log("size", e);
      return e / 1024 / 1024 > 1
        ? (e / 1024 / 1024).toFixed(0) + " MB"
        : (e / 1024).toFixed(0) + " KB";
    }
  }
};
</script>