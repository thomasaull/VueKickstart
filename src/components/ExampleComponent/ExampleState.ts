import { createMachine } from 'xstate'
import { extractAllStates } from '@/composables/useXState'

import type { Typegen0 } from './ExampleState.typegen'

export type TState = Typegen0['matchesStates']

export const ExampleState = createMachine({
  tsTypes: {} as import('./ExampleState.typegen').Typegen0,
  schema: {
    events: {} as { type: 'GO' } | { type: 'HO' },
    services: {} as {
      invokeTest: any
      invokeTestWithReturn: {
        data: { id: string }
      }
    },
  },

  id: 'ExampleState',
  initial: 'default',

  states: {
    default: {
      on: {
        GO: 'anotherState',
        HO: 'anotherState',
      },

      meta: {
        jo: 'ho',
      },
    },

    anotherState: {
      on: {
        GO: 'default',
      },

      entry: ['testAction'],

      meta: {
        anotherStatesMeta: 'hello',
      },

      invoke: {
        id: 'invokeTest',
        src: 'fetchSome',
        onDone: {
          actions: () => {
            console.log('invoke done')
          },
        },
      },
    },
  },
})

export const states = extractAllStates(ExampleState)
