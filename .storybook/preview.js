// https://storybook.js.org/docs/guides/guide-vue/
// import { addDecorator } from '@storybook/vue'
// import { useArgs } from '@storybook/client-api'

// import '@/sharedMain'
// import App from '@/AppVue.vue'

// export const parameters = {
//   controls: { expanded: true }
//   actions: { argTypesRegex: "^on[A-Z].*" },
// }

// addDecorator(() => {
//   const [iDontNeedThis, updateArgs] = useArgs()

//   return {
//     name: 'DecoratorDefault',
//     components: { App },
//     provide: {
//       updateArgs: updateArgs
//     },

//     template: `
//       <div class="is-storybook" style="position: relative;">
//         <App>
//           <story/>
//         </App>
//       </div>
//     `
//   }
// })
