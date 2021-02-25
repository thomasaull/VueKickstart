<template>
  <div class="App">
    <component :is="normalizedLayout">
      <slot v-if="isStorybook" />
      <router-view v-if="!isStorybook" :key="$route.meta.id" />
      <router-view />
    </component>

    <div class="App-portals">
      <!-- <portal-target name="examplePortal" class="App-examplePortal" /> -->
    </div>
  </div>
</template>

<script>
import { LAYOUT } from '@/constants/layout'

import LayoutDefault from '@/layouts/LayoutDefault'
import LayoutNaked from '@/layouts/LayoutNaked'

export default {
  name: 'App',
  components: {
    LayoutDefault,
    LayoutNaked
  },

  props: {
    isStorybook: { type: Boolean, default: false }
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
  font-family: var(--fontStack-default);
  font-size: var(--fontSize-default);
  line-height: var(--lineHeight-default);
  color: color.$text-default;

  &-portals {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
