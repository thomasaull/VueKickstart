import { Parameters, app } from '@storybook/vue3'
import { useArgs, useParameter } from '@storybook/client-api'
import { h } from 'vue'

import { attachStuffToAppInstance } from '@/sharedMain'
import App from '@/App.vue'

attachStuffToAppInstance(app)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const decoratorApp = (story) => {
  const [iDontNeedThis, updateArgs] = useArgs()
  const layout = useParameter('appLayout', null)

  return {
    name: 'AppDecorator',

    components: {
      App,
      story,
    },

    provide: {
      updateArgs: updateArgs,
    },
    
    setup() {
      return {
        layout
      }
    },

    template: `
      <App :isStorybook="true" :storybookLayout="layout">
        <story/>
      </App>
    `,
  }
}

export const decorators = [decoratorApp]