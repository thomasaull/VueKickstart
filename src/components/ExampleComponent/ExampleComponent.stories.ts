import type { Meta, StoryObj } from '@storybook/vue3'

// // import type { Meta, Story, Action } from '@/types/storybook'
import { useArgs } from '@storybook/preview-api'

import ExampleComponent, {
  propTypes,
  type Props,
  type Emit,
} from '@/components/ExampleComponent/ExampleComponent.vue'

// interface Args extends Props {
//   exampleArg: string
// }

type PropType = {
  allowed: readonly string[]
  default?: string
}

type Options<Component> = {
  propTypes?: Record<string, PropType>
  argTypes?: Meta<Component>['argTypes']
}

function generateStoryMeta<Component>(
  component: Component,
  options?: Options<Component>
) {
  const argTypesNormalized: Meta['argTypes'] = {}

  if (options?.propTypes) {
    Object.entries(options.propTypes).map(([id, propType]) => {
      argTypesNormalized[id] = {
        control: 'select',
        options: propType.allowed,
      }
    })
  }

  const argTypesFinal = {
    ...argTypesNormalized,
    ...options?.argTypes,
  }

  console.log(argTypesFinal)

  return {
    component: component,
    argTypes: argTypesFinal,
  }
}

type MyMeta = Meta<typeof ExampleComponent>

const meta: Meta<typeof ExampleComponent> = {
  ...generateStoryMeta(ExampleComponent, {
    propTypes,
    argTypes: {
      date: { control: 'date' },
    },
  }),

  title: 'ExampleComponent',
  component: ExampleComponent,

  // argTypes: {
  //   myProp: {
  //     control: 'select',
  //     options: propTypes.myProp.allowed,
  //   },
  //   state: {
  //     control: 'select',
  //     options: propTypes.state.allowed,
  //   },
  //   date: {
  //     control: 'date'
  //   }
  // },

  // argTypes: {
  //   'onUpdate:value': (value) => {
  //     console.log('bla', value)
  //   },
  //   // onClick: { action: 'clicked '}
  // },

  args: {
    myProp: propTypes.myProp.default,
    date: new Date(),
    value: 'Blupp',
  },
}

export default meta
type Story = StoryObj<typeof ExampleComponent>

export const Blupp: Story = {
  render: (args, context) => {
    const [_, updateArgs, resetArgs] = useArgs()

    return {
      components: { ExampleComponent },

      setup() {
        console.log(context.argTypes.date?.control?.type)

        return {
          blupp: (value: Emit['update:value']) => {
            updateArgs({ value: value })
          },
        }
      },

      template: '<ExampleComponent v-bind="args" @update:value="blupp" />',
    }
  },
}

function storyRender(args, context): Story['render'] {
  console.log('storyRender', args, context)

  return {
    components: { ExampleComponent },
    template: '<ExampleComponent v-bind="args" @update:value="blupp" />',
  }
}

export const Test: Story = {
  render: storyRender,
}

export const Default: Story = {
  args: {
    myProp: 'anotherOne',
  },
}

// const Template: Story<Args> = (args, { argTypes }) => {
//   return {
//     components: { ExampleComponent },
//     props: Object.keys(argTypes),

//     template: `
//     <ExampleComponent
//       v-bind="$props"
//     />
//   `,
//   }
// }

// export const Default = Template.bind({})
// Default.args = {}

// import type { Meta, StoryObj } from '@storybook/vue3'
// import { cloneDeep } from 'lodash-es'

// import Button from './ExampleComponent.vue'

// // More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
// const meta: Meta<typeof Button> = {
//   title: 'Example/Button',
//   component: Button,
//   // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/vue/writing-docs/docs-page
//   tags: ['autodocs'],
//   argTypes: {
//     myProp: { control: 'select', options: ['example', 'anotherOne'] },
//   },

//   args: {
//     message: 'Blupp bla',
//   },
// }

// export default meta
// type Story = StoryObj<typeof Button>
// /*
//  *👇 Render functions are a framework specific feature to allow you control on how the component renders.
//  * See https://storybook.js.org/docs/7.0/vue/api/csf
//  * to learn how to use render functions.
//  */
// export const Primary: Story = {}

// export const Blupp: Story = {
//   render: (args) => {
//     const [_, updateArgs, resetArgs] = useArgs()
//     // const [value, setValue] = useState('Secondary');
//     // console.log('args', args)

//     return {
//       components: { Button },

//       setup() {
//         setTimeout(() => {
//           console.log('timeout')

//           updateArgs({message: 'Changed again '})
//         }, 1000)

//         // argsCloned.message = 'aosdij'

//         return {
//           args,
//           bla: 'blupp',
//         }
//       },

//       template: `
//         oias: {{ args }}, {{ bla }}
//         <Button v-bind="args" />
//       `,
//     }
//   },
// }
