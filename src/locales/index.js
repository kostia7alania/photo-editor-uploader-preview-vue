import VueI18n from 'vue-i18n'

function loadLocaleMessages() {
  const locales = require.context('', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}


export default function createVueI18n() { //функция - защита от утечек на серваке=)  https://ssr.vuejs.org/ru/guide/data.html#%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85
  Vue.use(VueI18n)
  return window.VueI18n = new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages(),
    //silentTranslationWarn: false,//=> Whether suppress warnings outputted when localization fails.=>https://github.com/kazupon/vue-i18n/issues/283
    silentFallbackWarn: true          //Whether suppress warnings when falling back to either fallbackLocale or root.=> https://kazupon.github.io/vue-i18n/api/#constructor-options
  });
}
