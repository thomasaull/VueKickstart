/**
 * API Docs: https://storybook.js.org/docs/react/addons/addons-api
 */
import { useParameter } from '@storybook/addons'

import StateWrapper from '@/../.storybook/StateWrapper.vue'

export const withStates = (story) => {
  const additionalStates = useParameter('additionalStates', [])

  return {
    name: 'DecoratorWithStates',
    components: {
      StateWrapper,
      story,
    },

    setup() {
      return {
        additionalStates,
      }
    },

    template: `
       <StateWrapper :additionalStates="additionalStates">
         <template v-slot:default="{ state }">
           <story :class="'is-'+state" />
         </template>
       </StateWrapper>
     `,
  }
}
