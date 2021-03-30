// https://storybook.js.org/docs/guides/guide-vue/
// import { addDecorator } from '@storybook/vue'
import { Parameters, Decorators, app } from '@storybook/vue3'; 
import { useArgs } from '@storybook/client-api'

import Vue from 'vue'
import Router from 'vue-router'

import store from "@/store";
// import { sharedComponentParts } from '@/sharedMain'
// import App from '@/AppVue.vue'
// Vue.use(Router)

app.use(store)

export const parameters = {
  // controls: { expanded: true },
  // actions: { argTypesRegex: "^on[A-Z].*" },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
}

export const decorators = [
  () => ({
    template: `
      <div style="border: 2px solid fuchsia; padding: 20px;">
        <story />
      </div>`
  }),
];

// addDecorator(() => {
//   const [iDontNeedThis, updateArgs] = useArgs()

//   return {
//     ...sharedComponentParts,
//     router: new Router(),

//     name: 'DecoratorDefault',

//     components: {
//       App
//     },

//     provide: {
//       updateArgs: updateArgs
//     },

//     template: `
//       <App :isStorybook="true">
//         <story/>
//       </App>
//     `
//   }
// })
