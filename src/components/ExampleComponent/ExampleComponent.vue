<template>
  <div class="ExampleComponent">
    {{ xstate.path.value }}, {{ myProp }}
    <br />
    message: {{ message }}
    <br />
    date: {{ date }}

    <br />
    <input :value="value" type="text" @input="emitInput" /> {{ value }}
    <br />
    <input
      :checked="checked"
      type="checkbox"
      @input="(event) => emit('update:checked', event?.target?.checked)"
    />
    <br />
    <button @click="emit('click')">Click me</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const COMPONENT_NAME = 'ExampleComponent'

export default defineComponent({
  name: COMPONENT_NAME,
})
</script>

<script setup lang="ts">
import { onMounted, toRef } from 'vue'

import { useXState } from '@/composables/useXState'

import {
  ExampleState,
  states,
  type State,
} from '@/components/ExampleComponent/ExampleState'

export interface Props {
  // myProp?: (typeof propTypes.myProp.allowed)[number]
  myProp?: 'example' | 'anotherExample'
  state?: State
  message?: string
  date?: Date
  test?: boolean
  value?: string
  /** Das ist ein union type bla bla */
  bla?: 'test' | 'holla' | 'jo mei' | 'blabla blupp die mamma pappa'
  intUnion?: 1 | 20 | 5
  checked?: boolean
}

export type Emit = {
  addPerson: { name: string; age: number }
}

const props = withDefaults(defineProps<Props>(), {
  myProp: undefined,
})

const emit = defineEmits<{
  (event: 'update:value', value: string): void
  (event: 'update:checked', value: boolean): void
  (event: 'click'): void
  (event: 'addPerson', payload: Emit['addPerson']): void
}>()

function emitInput(event: Event) {
  if (!(event.target instanceof HTMLInputElement)) {
    throw new Error('event.target is not HTMLInputEvent')
  }

  emit('update:value', event.target.value)
}

const xstate = useXState(ExampleState, {
  services: {
    fetchSome: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
  },

  actions: {
    testAction: () => {
      console.log('testAction')
    },
  },

  syncStateWith: toRef(props, 'state'),
})

onMounted(() => {
  console.log('onMounted')
})
</script>

<style lang="scss">
.ExampleComponent {
  $block: &;
}
</style>
