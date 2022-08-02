<template>
  <!-- <div class="UseXStatePure">xstate path: {{ xstate.path }}</div> -->
  <!-- {{ state.toStrings() }} -->
  Hallo
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import { interpret } from 'xstate'
// import { useMachine } from '@xstate/vue'
import { interpret } from 'xstate'

// import { useXState, extractAllStates } from '@/utilities/xstate'
// import useXState from '@/utilities/useXState'
// import propValidator from '@/utilities/propValidator'

import { UseXStatePureState } from '@/components/UseXState/UseXStatePureState'

import { SomeMethod } from './UseXStatePure'

export const propTypes = {
  state: {
    // allowed: extractAllStates(UseXStatePureState),
    allowed: ['abc', 'jkl'],
  },
}

export default defineComponent({
  name: 'UseXStatePure',
  components: {},

  // props: {
  //   state: {
  //     type: String,
  //     default: undefined,
  //     validator: (value: string) =>
  //       propValidator.oneOf(value, propTypes.state.allowed),
  //   },
  // },
  // props: {
  //   state: {
  //     type: String,
  //     default: undefined,
  //   },
  // },

  setup(props, context) {
    props
    // console.log(props.book.)
    // const machine = UseXStatePureState()
    // const { state, send, service } = useMachine(machine)
    // service

    // const initialState = machine.getInitialState('default')
    // initialState
    // console.log(initialState)

    // service.onTransition((newState) => {
    //   console.log('onTransition', newState.toStrings())

    //   // this.state.current = newState
    //   // this.state.context = newState.context ? newState.context : {}

    //   // this.state.meta = getMergedMeta(this.state.current.meta)
    //   // this.state.path = getStatePath(this.state.current)
    // })

    // service.stop()
    // service.start(initialState)

    // // send('GO')

    // //  let initialState = undefined
    // // if (options.initialState) {
    // //   initialState = this.stateMachine.getInitialState(options.initialState)
    // // }

    // return {
    //   state,
    //   send,
    // }

    // let someMethodImplementation: typeof someMethod
    const someMethod: typeof SomeMethod = (blupp) => {
      console.log('jo', blupp)

      return new Promise((resolve) => resolve)
    }

    const machine = UseXStatePureState({
      someMethod,
    })
    // const machine = UseXStatePureState()

    const service = interpret(machine, {})
    let current = undefined

    service.onTransition((newState) => {
      current = newState
      console.log('onTransition', current.toStrings())
    })

    const initialState = machine.getInitialState('anotherState')
    console.log(initialState)

    // service.start()
    service.start(initialState)

    // service.send('GO')

    // service.stop()
    // service.start('default')

    // const { test } = useXState()

    // const bla = blupp(123)
    // console.log(bla)

    // return {
    //   test,
    // }
  },

  data() {
    return {
      xstate: undefined,
    }
  },

  methods: {
    // onClick() {
    //   this.test.name = 'Lusca'
    //   console.log(this.test.name)
    // },
  },

  // watch: {
  //   state() {
  //     this.xstate.restartWith(this.state)
  //   },
  // },

  // async created() {
  //   this.xstate = useXState(UseXStatePureState, this, {
  //     initialState: this.state,
  //   })
  // },
})
</script>

<style lang="scss">
.UseXStatePure {
  $block: &;
}
</style>
