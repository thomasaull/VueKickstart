// import { Parameters, app } from '@storybook/vue3'
import { type Preview, setup, type VueRenderer } from '@storybook/vue3'
// import { useArgs, useParameter } from '@storybook/client-api'
import { makeDecorator, useArgs } from '@storybook/preview-api'
// import { h } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { attachStuffToAppInstance } from '@/sharedMain'
import App from '@/App.vue'
import type { PartialStoryFn, Args } from '@storybook/types'

/**
 * Apparently there's a new way of how to add stuff to app instance
 * @see https://github.com/storybookjs/storybook/issues/18222#issuecomment-1432699890
 */
setup((app) => {
  attachStuffToAppInstance(app)

  // Create fake router
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // Add fake routes
    ],
  })

  app.use(router)
})

// const decoratorApp = (story: PartialStoryFn<VueRenderer, Args>) => {
//   const [args, updateArgs, resetArgs] = useArgs()
//   // const layout = useParameter('appLayout', null)

//   return {
//     name: 'AppDecorator',

//     components: {
//       App,
//       story,
//     },

//     provide: {
//       updateArgs: updateArgs,
//     },

//     setup() {
//       return {
//         // layout,
//       }
//     },

//     template: `
//         <App :isStorybook="true" :storybookLayout="layout">
//           <story/>
//         </App>
//       `,
//   }
// }

const decorator = makeDecorator({
  name: 'withSomething',
  parameterName: 'something',
  wrapper: (storyFn, context, { parameters }) => {
    console.log('jojojo')
    const [args, updateArgs, resetArgs] = useArgs()
    // Do something with `parameters`, which are set via { something: ... }

    // Note you may alter the story output if you like.
    // Although generally that's not advised.

    return storyFn(context)
  },
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  /**
   * Decorators currently cause the component to re-mount when chaning an arg
   * Should be fixed with the next update though
   * @see https://github.com/storybookjs/storybook/issues/21235
   */
  decorators: [
    // (story, context) => {
    //   // const [args, updateArgs, resetArgs] = useArgs()
    //   // console.log(updateArgs)
    //   return {
    //     components: { story },
    //     template: '<div style="margin: 3em;"><story /></div>',
    //   }
    // },
  ],
}

export default preview

// export const decorators = [decoratorApp]
