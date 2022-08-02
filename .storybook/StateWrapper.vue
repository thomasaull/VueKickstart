<template>
  <div class="StateWrapper">
    <div v-for="state in normalizedStates" :key="state.label || state.state" class="StateWrapper-state">
      <div class="StateWrapper-title">{{ state.label || state.state }}:</div>

      <div class="StateWrapper-container">
        <div class="StateWrapper-content" :class="state.documentState ? `is-${state.documentState}` : null"
          :data-whatinput="state.whatinput">
          <slot :state="state.state" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

interface State {
  state: string
  label?: string
  documentState?: string
  whatinput?: string
}

export default defineComponent({
  name: 'StateWrapper',

  props: {
    additionalStates: { type: Array as PropType<string[]>, default: () => [] },
  },

  setup(props) {
    const defaultStates: State[] = [
      { state: 'default' },
      { state: 'hover' },
      { state: 'focus' },
      {
        state: 'focus',
        label: 'focus on Keyboard Navigation',
        documentState: 'keyboardNavigation',
        whatinput: 'keyboard',
      },
      { state: 'active' },
    ]

    const normalizedStates = computed<State[]>(() => {
      const normalizedAdditionalStates: State[] = props.additionalStates.map(
        (state: string) => {
          return {
            state: state,
          }
        }
      )

      return [...defaultStates, ...normalizedAdditionalStates]
    })

    return {
      normalizedStates
    }
  },

})
</script>

<style lang="scss">
.StateWrapper {
  display: flex;
  flex-direction: column;

  &-state {
    padding: 8px;
  }

  &-title {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.05em;
    color: color.$gray-400;
    margin-bottom: 4px;

    .theme-dark & {
      color: color.$gray-300;
    }
  }

  &-container {
    padding: 10px;
    outline: 1px solid color.$gray-200;

    .theme-dark & {
      outline-color: color.$gray-600;
    }
  }

  &-content {
    position: relative;
  }
}
</style>
