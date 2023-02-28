/**
 * How to restart state machines
 * @see https://github.com/statelyai/xstate/issues/1476#issuecomment-1164368550
 */

/**
 * @todo Add destroy method
 */
import { ref, shallowRef, watch } from 'vue'
import type { Ref } from 'vue'
import { useMachine } from '@xstate/vue'

import type {
  AnyStateMachine,
  AreAllImplementationsAssumedToBeProvided,
  InternalMachineOptions,
  InterpreterFrom,
  InterpreterOptions,
  StateFrom,
  StateValueFrom
} from 'xstate'

import { inspect } from '@xstate/inspect'

import type { MaybeLazy, UseMachineOptions } from '@xstate/vue/lib/types'

interface Options {
  initialStatePath?: string
  syncStateWith?: Ref
  inspect?: boolean
}

/**
 * Copied and adapted from
 * @see https://github.com/statelyai/xstate/blob/main/packages/xstate-vue/src/useMachine.ts
 */
type RestParams<TMachine extends AnyStateMachine> = AreAllImplementationsAssumedToBeProvided<
  TMachine['__TResolvedTypesMeta']
> extends false
  ? [
      options: InterpreterOptions &
        UseMachineOptions<TMachine['__TContext'], TMachine['__TEvent']> &
        InternalMachineOptions<
          TMachine['__TContext'],
          TMachine['__TEvent'],
          TMachine['__TResolvedTypesMeta'],
          true
        > &
        Options
    ]
  : [
      options?: InterpreterOptions &
        UseMachineOptions<TMachine['__TContext'], TMachine['__TEvent']> &
        InternalMachineOptions<
          TMachine['__TContext'],
          TMachine['__TEvent'],
          TMachine['__TResolvedTypesMeta']
        > &
        Options
    ]

/**
 * Copied and adapted from
 * @see https://github.com/statelyai/xstate/blob/main/packages/xstate-vue/src/useMachine.ts
 */
type UseMachineReturn<
  TMachine extends AnyStateMachine,
  TInterpreter = InterpreterFrom<TMachine>
> = {
  state: Ref<StateFrom<TMachine> | undefined>
  path: Ref<StateValueFrom<TMachine> | undefined>
  meta: Ref<TMeta | undefined>
  service: Ref<TInterpreter | undefined>
  restartWith: (statePath: string) => void
}

export type UseMachineReturnInitialized<
  TMachine extends AnyStateMachine,
  TInterpreter = InterpreterFrom<TMachine>
> = {
  state: Ref<StateFrom<TMachine>>
  path: Ref<StateValueFrom<TMachine>>
  meta: Ref<TMeta>
  service: Ref<TInterpreter>
  restartWith: (statePath: string) => void
}

type TState = ReturnType<typeof useMachine>['state']['value']
type TMeta = TState['meta']

export function isInitializedXState<TMachine extends AnyStateMachine>(
  result: UseMachineReturn<TMachine>
): asserts result is UseMachineReturnInitialized<TMachine> {
  // TODO: Make checks and return error if they fail
  const bla = 'qsd'
  // @ts-ignore Test
  if (bla === 'asd') {
    throw new Error('Blupp')
  }
}

export function useXState<TMachine extends AnyStateMachine>(
  machine: MaybeLazy<TMachine>,
  ...[options = {}]: RestParams<TMachine>
): UseMachineReturnInitialized<TMachine> {
  const state = shallowRef<StateFrom<TMachine>>()
  const path = ref<StateValueFrom<TMachine>>()
  const meta = shallowRef<TMeta>()
  const service = shallowRef<InterpreterFrom<TMachine>>()

  // Apparently it's important to start the inspector before the state machine is initialized
  if (options?.inspect && import.meta.env.DEV === true) {
    inspect({
      iframe: false
    })
  }

  const start = (initialStatePath?: string) => {
    let initialState

    if (options?.initialStatePath) {
      // @ts-ignore Can't figure out how to use this with ts
      initialState = machine.getInitialState(options.initialStatePath)
    }

    if (initialStatePath) {
      // @ts-ignore Can't figure out how to use this with ts
      initialState = machine.getInitialState(initialStatePath)
    }

    const xstate = useMachine(machine, {
      devTools: options?.inspect && import.meta.env.DEV === true,
      state: initialState,
      ...options
    })

    service.value = xstate.service
    state.value = xstate.state.value // This is probably not neeeded

    xstate.service.onTransition((newState) => {
      state.value = newState as StateFrom<TMachine>
      path.value = getStatePath<TMachine>(state.value)
      meta.value = getMergedMeta(newState.meta)
    })
  }

  const restartWith = (statePath: string) => {
    if (!service.value) return

    service.value.stop()
    start(statePath)
  }

  // Update state when prop changes
  if (options.syncStateWith) {
    watch(
      options.syncStateWith,
      () => {
        if (!options.syncStateWith?.value) return
        if (!service.value) return
        restartWith(options.syncStateWith.value)
      },
      {
        immediate: true
      }
    )
  }

  if (options.syncStateWith?.value) {
    start(options.syncStateWith.value)
  } else {
    start()
  }

  const result = {
    state,
    path,
    meta,
    service,
    restartWith
  }

  isInitializedXState<TMachine>(result)

  return result
}

function getStatePath<TMachine extends AnyStateMachine>(
  state: StateFrom<TMachine>
): StateValueFrom<TMachine> {
  const stateStrings = state.toStrings()
  const path = stateStrings[stateStrings.length - 1] as StateValueFrom<TMachine>

  return path
}

function getMergedMeta(meta: TMeta) {
  // https://xstate.js.org/docs/guides/states.html#state-meta-data
  return Object.keys(meta).reduce((acc, key) => {
    const value = meta[key]

    // Assuming each meta value is an object
    Object.assign(acc, value)

    return acc
  }, {})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractAllStates(machine: any) {
  // Filter out root state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredStates = machine.stateIds.filter((state: any) => {
    const splitted = state.split('.')

    if (splitted.length === 1) {
      return false
    }

    return true
  })

  // Transform `#root.myState` to `myState`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statesWithoutPrefix = filteredStates.map((state: any) => {
    const transformedString = state.replace(`${machine.id}.`, '')
    return transformedString
  })

  return statesWithoutPrefix
}
