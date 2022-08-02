import { Machine, StateMachine } from 'xstate'
// import { DefineComponent } from 'vue'
// import UseXStatePure from '@/components/UseXState/UseXStatePure.vue'
import { SomeMethod } from './UseXStatePure'

interface Methods {
  someMethod: typeof SomeMethod
}

// someMethod('abc')

interface Schema {
  states: {
    default: Record<string, unknown>
    anotherState: {
      states: {
        subState: Record<string, unknown>
      }
    }
  }
}

type Event = { type: 'GO' }

interface Context {
  score: number
}

// Record<string, never>,
// Schema,
// EventObject

function abc() {
  console.log('invoke abc')
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

export function blupp(message: string): void {
  console.log('myFunction', message)
}

export function UseXStatePureState(
  methods: Methods
): StateMachine<Context, Schema, Event> {
  // export function UseXStatePureState(method: {
  //   (): void
  // }): StateMachine<Context, Schema, Event> {
  //   console.log(method)

  return Machine<Context, Schema, Event>({
    id: 'UseXStatePureState',
    initial: 'default',

    context: {
      score: 10,
    },

    states: {
      default: {
        on: {
          GO: 'anotherState',
        },
      },

      anotherState: {
        initial: 'subState',
        states: {
          subState: {
            invoke: {
              id: 'soSomething',
              src: () => methods.someMethod('abc'),
              // onDone: {
              //   target: '#UseXStatePureState.default',
              // },
              // onError: {
              //   target: '#UseXStatePureState.default',
              // },
            },
          },
        },
      },
    },
  })
}

// export const UseXStatePureState = () => {
//   return Machine({
//     id: 'UseXStatePureState',
//     initial: 'default',
//     // initial: 'anotherState',

//     states: {
//       default: {
//         on: {
//           GO: 'anotherState',
//         },
//       },

//       anotherState: {
//         initial: 'subState',
//         states: {
//           subState: {},
//         },
//       },
//     },
//   })
// }
