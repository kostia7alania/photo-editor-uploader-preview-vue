





<template>
  <div class="panel-btns">
      <button
        :class="{'blocked-btn': isBlockedUpload}"
        class="modal-buttons"
        @click="upload" type="button">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 471.2 471.2" style="enable-background:new 0 0 471.2 471.2;" xml:space="preserve"><g><g><path d="M457.7,230.15c-7.5,0-13.5,6-13.5,13.5v122.8c0,33.4-27.2,60.5-60.5,60.5H87.5c-33.4,0-60.5-27.2-60.5-60.5v-124.8c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v124.8c0,48.3,39.3,87.5,87.5,87.5h296.2c48.3,0,87.5-39.3,87.5-87.5v-122.8C471.2,236.25,465.2,230.15,457.7,230.15z"/><path d="M159.3,126.15l62.8-62.8v273.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V63.35l62.8,62.8c2.6,2.6,6.1,4,9.5,4c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.8-85.8c-2.5-2.5-6-4-9.5-4c-3.6,0-7,1.4-9.5,4l-85.8,85.8c-5.3,5.3-5.3,13.8,0,19.1C145.5,131.35,154.1,131.35,159.3,126.15z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        {{ $t('upload-item-buttons.Upload') }}
      </button>

      <button
        :class="{'blocked-btn': isBlockedCancel}"
        class="modal-buttons"
        @click="cancelUploading" type="button">

         <svg version="1.1" id="Capa_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 65.518 65.518" style="enable-background:new 0 0 65.518 65.518;" xml:space="preserve"><g><path d="M32.759,0C14.696,0,0,14.695,0,32.759s14.695,32.759,32.759,32.759s32.759-14.695,32.759-32.759S50.822,0,32.759,0z M6,32.759C6,18.004,18.004,6,32.759,6c6.648,0,12.734,2.443,17.419,6.472L12.472,50.178C8.443,45.493,6,39.407,6,32.759z M32.759,59.518c-5.948,0-11.447-1.953-15.895-5.248l37.405-37.405c3.295,4.448,5.248,9.947,5.248,15.895C59.518,47.514,47.514,59.518,32.759,59.518z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
         {{ $t('upload-item-buttons.Cancel') }}
      </button>

      <button
        :class="{'blocked-btn': isBlockedDelete}"
        class="modal-buttons"
        @click="remove" type="button">
        <svg version="1.1" id="Capa_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 408.483 408.483" style="enable-background:new 0 0 408.483 408.483;" xml:space="preserve"><g><g><path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/><path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        {{ $t('upload-item-buttons.Delete') }}
      </button>

        <button
        :class="{'blocked-btn': isBlockedEdit, 'editor-open-btn':editor}"
        class="modal-buttons"
        @click="edit" type="button">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"> <g> <g> <path d="m119.2,114.3h-109.4c-2.3,0-4.1,1.9-4.1,4.1s1.9,4.1 4.1,4.1h109.5c2.3,0 4.1-1.9 4.1-4.1s-1.9-4.1-4.2-4.1z"/> <path d="m5.7,78l-.1,19.5c0,1.1 0.4,2.2 1.2,3 0.8,0.8 1.8,1.2 2.9,1.2l19.4-.1c1.1,0 2.1-0.4 2.9-1.2l67-67c1.6-1.6 1.6-4.2 0-5.9l-19.2-19.4c-1.6-1.6-4.2-1.6-5.9-1.77636e-15l-13.4,13.5-53.6,53.5c-0.7,0.8-1.2,1.8-1.2,2.9zm71.2-61.1l13.5,13.5-7.6,7.6-13.5-13.5 7.6-7.6zm-62.9,62.9l49.4-49.4 13.5,13.5-49.4,49.3-13.6,.1 .1-13.5z"/> </g> </g></svg>

        {{ $t('upload-item-buttons.Editor') }}
          {{editor?"-":'+'}}
        </button>

        <button
        :class="{'blocked-btn': isBlockedRevert}"
        class="modal-buttons"
        @click="revert" type="button">
          <svg version="1.1" id="Capa_4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.63 511.631" style="enable-background:new 0 0 511.63 511.631;" xml:space="preserve"><g><path d="M496.5,233.842c-30.841-76.706-114.112-115.06-249.823-115.06h-63.953V45.693c0-4.952-1.809-9.235-5.424-12.85c-3.617-3.617-7.896-5.426-12.847-5.426c-4.952,0-9.235,1.809-12.85,5.426L5.424,179.021C1.809,182.641,0,186.922,0,191.871c0,4.948,1.809,9.229,5.424,12.847L151.604,350.9c3.619,3.613,7.902,5.428,12.85,5.428c4.947,0,9.229-1.814,12.847-5.428c3.616-3.614,5.424-7.898,5.424-12.848v-73.094h63.953c18.649,0,35.349,0.568,50.099,1.708c14.749,1.143,29.413,3.189,43.968,6.143c14.564,2.95,27.224,6.991,37.979,12.135c10.753,5.144,20.794,11.756,30.122,19.842c9.329,8.094,16.943,17.7,22.847,28.839c5.896,11.136,10.513,24.311,13.846,39.539c3.326,15.229,4.997,32.456,4.997,51.675c0,10.466-0.479,22.176-1.428,35.118c0,1.137-0.236,3.375-0.715,6.708c-0.473,3.333-0.712,5.852-0.712,7.562c0,2.851,0.808,5.232,2.423,7.136c1.622,1.902,3.86,2.851,6.714,2.851c3.046,0,5.708-1.615,7.994-4.853c1.328-1.711,2.561-3.806,3.71-6.283c1.143-2.471,2.43-5.325,3.854-8.562c1.431-3.237,2.43-5.513,2.998-6.848c24.17-54.238,36.258-97.158,36.258-128.756C511.63,291.039,506.589,259.344,496.5,233.842z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        {{ $t('upload-item-buttons.Revert') }}
        </button>
    </div>
</template>

<script>
export default {
  name: "upload-item-buttons",
  props: [
    "upd",
    "editor",
    "isBlockedUpload",
    "isBlockedDelete",
    "isBlockedEdit",
    "isBlockedRevert"
  ],
  data() {
    return {};
  },

  computed: {
    img_prev_alt() {
      const comment = this.upd.comment
        ? `. Photo comments: "${this.upd.comment}"`
        : "";
      const changed = this.upd.base64 ? " [CHANGED]" : "";
      return this.upd.name + comment + changed;
    },
    isBlockedCancel() {
      return !this.upd.CANCEL_SOURCE;
    }
  },
  methods: {
    remove() {
      this.$store.commit("REMOVE_FROM_UPLOADING_LIST", this.upd.hash);
    },
    revert() {
      this.$store.commit("SET_BASE64", { hash: this.upd.hash, base64: null });
    },
    edit() {
      this.$emit("edit");
    },
    cancelUploading() {
      this.upd.CANCEL_SOURCE.cancel("Operation canceled by the user");
    },
    upload() {
      this.$store.dispatch("UPLOAD_INSP_PHOTO", this.upd.hash);
    }
  }
};
</script>


<style lang="scss" scoped>
.editor-open-btn {
  color: red;
}
.blocked-btn {
  color: #322525 !important;
  background: grey !important;
  pointer-events: none;
}
.panel-btns {
  display: flex;
  flex-direction: column;

  & button {
    width: 133px;
    height: 30px;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    svg {
      vertical-align: middle;
      width: 19px;
      margin-right: 5px;
    }
  }
}
</style>

