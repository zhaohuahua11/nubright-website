import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'

// 目前只有英文，语言切换器已移除。保留 i18next 是因为全站组件都在用 t()，
// 文案集中在 locales/en.json 里改起来方便；以后要加语言，在 resources 补一项即可。
i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

document.documentElement.lang = 'en'

export default i18n
