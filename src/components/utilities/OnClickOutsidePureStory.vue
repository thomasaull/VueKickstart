<template>
  <OnClickOutsidePure :do="() => $emit('clickOutside')">
    <button>Click outside of me</button>
  </OnClickOutsidePure>
</template>

<script>
import OnClickOutsidePure from '@/components/utilities/OnClickOutsidePure.vue'

export default {
  name: 'OnClickOutsidePureStory',
  components: {
    OnClickOutsidePure
  }
}
</script>
