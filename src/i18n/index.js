import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zhHant from './locales/zh-Hant.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en:        { translation: en },
      'zh-Hant': { translation: zhHant },
    },
    lng: 'zh-Hant',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

// Keep html[lang] in sync so CSS :lang() / [lang="zh-Hant"] selectors fire correctly
document.documentElement.lang = 'zh-Hant'
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

export default i18n
