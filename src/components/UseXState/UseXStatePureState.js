import { Machine } from 'xstate'

export const UseXStatePureState = () => {
  return Machine({
    id: 'UseXStatePureState',
    initial: 'default',

    states: {
      default: {},

      anoterState: {
        initial: 'subState',
        states: {
          subState: {}
        }
      }
    }
  })
}
