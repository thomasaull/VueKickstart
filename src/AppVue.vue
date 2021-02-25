<template>
  <div class="App">
    My App
    <component :is="normalizedLayout">
      <router-view :key="$route.meta.id" />
    </component>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault'
import LayoutNaked from '@/layouts/LayoutNaked'

import { LAYOUT } from '@/constants/layout'

export default {
  name: 'App',
  components: {
    LayoutDefault,
    LayoutNaked
  },

  data() {
    return {
      layout: undefined
    }
  },

  computed: {
    normalizedLayout() {
      if (this.layout) {
        return this.layout
      }

      return LAYOUT.NAKED
    }
  },

  created() {
    this.$eventHub.$on('Layout:Update', this.updateLayout)
  },

  methods: {
    updateLayout(layout) {
      this.layout = layout
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
@import './assets/scss/default.scss';

.App {
  color: red;
}
</style>
