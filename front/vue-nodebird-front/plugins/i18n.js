// export default function {
//   install: (app, options) => {
//     // inject a globally available $translate() method
//     app.config.globalProperties.$translate = (key) => {
//       // retrieve a nested property in `options`
//       // using `key` as the path
//       return key.split('.').reduce((o, i) => {
//         if (o) return o[i]
//       }, options)
//     }
//   }
// }

function hello() {
  return 'hello world'
}

export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      myPlugin: hello,
      hello
    }
  }
});