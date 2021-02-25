<template>
  <div class="Home">Home</div>
</template>

<script>
import { LAYOUT } from '@/constants/layout'
import useLayout from '@/mixins/useLayout'

export default {
  name: 'Home',
  components: {},
  mixins: [useLayout],

  data() {
    return {
      useLayout: LAYOUT.DEFAULT,
    }
  },
}
</script>
