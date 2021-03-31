<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'OnClickOutsidePure',

  props: {
    do: { type: Function, required: true },
  },

  mounted() {
    document.addEventListener('click', this.onDocumentClick)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
  },

  methods: {
    onDocumentClick(event: Event) {
      // Element is the slot element
      if (event.target === this.$el) return

      // Element is inside of slot element
      if (this.$el.contains(event.target)) return

      this.do()
    },
  },

  // render() {
  //   if (!this.$slots.default) return
  //   return this.$slots.default()
  // },
})
</script>
