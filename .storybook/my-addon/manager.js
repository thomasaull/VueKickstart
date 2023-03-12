// .storybook/my-addon/manager.js

import { makeDecorator } from '@storybook/preview-api'

export default makeDecorator({
  name: 'withSomething',
  parameterName: 'something',
  wrapper: (storyFn, context, { parameters }) => {
    console.log('TEST')
    // Do something with `parameters`, which are set via { something: ... }

    // Note you may alter the story output if you like.
    // Although generally that's not advised.

    return storyFn(context)
  },
})

console.log('MANAGER JS')
