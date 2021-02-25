<template>
  <div class="UseXStatePure">xstate path: {{ xstate.path }}</div>
</template>

<script>
import { useXState, extractAllStates } from '@/utilities/xstate'
import propValidator from '@/utilities/propValidator'

import { UseXStatePureState } from '@/components/UseXState/UseXStatePureState'

export const propTypes = {
  state: {
    allowed: extractAllStates(UseXStatePureState),
  },
}

export default {
  name: 'UseXStatePure',
  components: {},

  props: {
    state: {
      type: String,
      default: undefined,
      validator: (value) => propValidator.oneOf(value, propTypes.state.allowed),
    },
  },

  data() {
    return {
      xstate: undefined,
    }
  },

  watch: {
    state() {
      this.xstate.restartWith(this.state)
    },
  },

  async created() {
    this.xstate = useXState(UseXStatePureState, this, {
      initialState: this.state,
    })
  },
}
</script>

<style lang="scss">
.UseXStatePure {
  $block: &;
}
</style>
