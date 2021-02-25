// https://storybook.js.org/docs/guides/guide-vue/
import { addDecorator } from '@storybook/vue'
import { useArgs } from '@storybook/client-api'
import Vue from 'vue'
import Router from 'vue-router'

import { sharedComponentParts } from '@/sharedMain'
import App from '@/AppVue.vue'

Vue.use(Router)

export const parameters = {
  // controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' }
}

addDecorator(() => {
  const [iDontNeedThis, updateArgs] = useArgs()

  return {
    ...sharedComponentParts,
    router: new Router(),

    name: 'DecoratorDefault',

    components: {
      App
    },

    provide: {
      updateArgs: updateArgs
    },

    template: `
      <App :isStorybook="true">
        <story/>
      </App>
    `
  }
})
