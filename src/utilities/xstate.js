import { interpret } from 'xstate'
import { inspect } from '@xstate/inspect'

class xState {
  constructor(machine, component = null, options) {
    this.stateMachine = undefined

    this.state = {
      service: undefined,
      current: undefined,
      context: {},
      meta: undefined,
      path: undefined,
      restartWith: this.restartWith.bind(this),
    }

    this.setup(machine, component, options)
  }

  setup(machine, component, options) {
    this.stateMachine = machine(component)

    this.state.service = interpret(this.stateMachine, {
      devTools: process.env.NODE_ENV === 'development',
    })

    if (options?.inspect && process.env.NODE_ENV === 'development') {
      inspect({
        // iframe: false
      })
    }

    this.start(options)
  }

  start(options = {}) {
    this.state.service.onTransition((newState) => {
      this.state.current = newState
      this.state.context = newState.context ? newState.context : {}

      this.state.meta = getMergedMeta(this.state.current.meta)
      this.state.path = getStatePath(this.state.current)
    })

    let initialState = undefined
    if (options.initialState) {
      initialState = this.stateMachine.getInitialState(options.initialState)
    }

    this.state.service.start(initialState)
  }

  restartWith(statePath) {
    this.state.service.stop()
    this.start({ initialState: statePath })
  }
}

export function useXState(machine, component, options) {
  const xStateInstance = new xState(machine, component, options)
  return xStateInstance.state
}

function getStatePath(state) {
  const stateStrings = state.toStrings()
  const path = stateStrings[stateStrings.length - 1]

  return path
}

function getMergedMeta(meta) {
  // https://xstate.js.org/docs/guides/states.html#state-meta-data
  return Object.keys(meta).reduce((acc, key) => {
    const value = meta[key]

    // Assuming each meta value is an object
    Object.assign(acc, value)

    return acc
  }, {})
}

export function extractAllStates(stateMachine) {
  const machine = stateMachine()

  // Filter out root state
  const filteredStates = machine.stateIds.filter((state) => {
    const splitted = state.split('.')

    if (splitted.length === 1) {
      return false
    }

    return true
  })

  // Transform `#root.myState` to `myState`
  let statesWithoutPrefix = filteredStates.map((state) => {
    const transformedString = state.replace(`${machine.id}.`, '')
    return transformedString
  })

  return statesWithoutPrefix
}
