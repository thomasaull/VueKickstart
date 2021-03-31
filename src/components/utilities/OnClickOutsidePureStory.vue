<template>
  <OnClickOutsidePure :do="() => $emit('clickOutside')" nodo="onDo">
    <button>Click outside of me</button>
  </OnClickOutsidePure>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import OnClickOutsidePure from '@/components/utilities/OnClickOutsidePure.vue'

export default defineComponent({
  name: 'OnClickOutsidePureStory',
  components: {
    OnClickOutsidePure,
  },

  emits: ['clickOutside'],

  methods: {
    onDo() {
      console.log('jojo')
    },
  },
})
</script>
