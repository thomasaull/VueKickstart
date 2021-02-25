// https://storybook.js.org/docs/addons/api/#makedecorator-api
import { makeDecorator } from '@storybook/addons'

import StateWrapper from '@/../.storybook/StateWrapper.vue'
import ThemeDark from '@/../.storybook/ThemeDark.vue'

export const dark = makeDecorator({
  name: 'dark',

  wrapper: (getStory, context, { parameters }) => {
    return {
      name: 'DecoratorThemeDark',
      components: { ThemeDark },

      template: `
        <ThemeDark>
          <story></story>
        </ThemeDark>
      `
    }
  }
})

export const withStates = makeDecorator({
  name: 'withStates',
  parameterName: 'additionalStates',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: false,

  wrapper: (getStory, context, { parameters }) => {
    return {
      name: 'DecoratorStates',
      components: { StateWrapper },

      data() {
        return {
          additionalStates: parameters || []
        }
      },
      template: `
        <StateWrapper :additionalStates="additionalStates">
          <template v-slot:default="{state}">
            <story :class="'is-'+state"></story>
          </template>
        </StateWrapper>
      `
    }
  }
})
