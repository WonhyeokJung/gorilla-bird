import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // 전역 import할 npm 모듈(패키지, 라이브러리)
    [
    '@pinia/nuxt',
    {
      autoImports: [
        'defineStore',
        'storeToRefs'
      ]
    }
    ]
  ],
  // 전역 css
  css: [
    '~/assets/css/soonsak.css'
  ],
  // global loading
})
