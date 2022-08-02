// import { reactive } from 'vue'
// import { interpret } from 'xstate'
// import { StateMachine } from 'xstate'

export default function useXState(stateMachine: unknown): { test: string } {
  console.log(stateMachine)

  return {
    test: 'test',
  }

  // const test = reactive({
  //   name: 'Thomas',
  // })
  // return {
  //   test: test,
  // }
}
