<i18n>
{
  "en": {
    "comment-placeholder":"The video list is empty",
    "Click the button": "Click the button to get the list with uploaded videos"
  },
  "ru": {
    "comment-placeholder":"Список пуст",
    "Click the button": "Для получения списка видео нажмите на кнопку"
   }
}
</i18n>

<template>
    <textarea
        :class="cls"
        :placeholder="$t('comment-placeholder')"
        rows="20"
        name="comment[text]"
        id="comment_text"
        cols="40"
        class="ui-autocomplete-input"
        autocomplete="off"
        role="textbox"
        aria-autocomplete="list"
        aria-haspopup="true"
        :maxlength="max || 1000"
        v-model.trim="model"
    >
    </textarea>
</template>
<script>
export default {
  name: "text-area",
  props: ["value", "max", "cls"],
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(e) {
        this.$emit(
          "input",
          e && e.replace(/\r?\n{2,}/gim, "\r\n").replace(/(	| ){1,}/g, " ")
        );
      }
    }
  }
};
</script>

<style scoped>
textarea {
  max-width: 50vw;
  min-width: 22vw;
  height: 95px;
  max-height: 222px;
  min-height: 30px;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
  border-color: -moz-use-text-color #ffffff #ffffff -moz-use-text-color;
  border-image: none;
  border-radius: 6px 6px 6px 6px;
  border-style: none solid solid none;
  border-width: medium 1px 1px medium;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.3s ease 0.1s;
}

textarea:focus {
  background: none repeat scroll 0 0 #ffffff;
  outline-width: 0;
}

.blocked-btn {
  color: #322525 !important;
  background: grey !important;
  pointer-events: none;
}

textarea {
  flex: 0 0 80%;

  max-width: 100%;
}
</style>
