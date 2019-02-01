<template>
  <div class="App">
    <component :is="layout"><nuxt /></component>
  </div>
</template>

<script>
import has from 'lodash/has'
import DefaultLayout from '@/layouts/DefaultLayout'
import NakedLayout from '@/layouts/NakedLayout'

export default {
  name: 'App',
  components: { DefaultLayout, NakedLayout }, // eslint-disable-line

  head() {
    return {
      title: this.$route.meta.title
    }
  },

  computed: {
    layout() {
      if (this.$route.meta.layout) return `${this.$route.meta.layout}Layout`
      return 'DefaultLayout'
    },

    routerKey() {
      if (has(this.$route, 'meta.root.id')) {
        if (this.$route.meta.root.template === 'info')
          return String(this.$route.meta.root.id)
      }

      return String(this.$route.meta.id)
    }
  }
}
</script>

<style lang="scss">
/* stylelint-disable*/
@import '@/assets/scss/default.scss';
@import '@/assets/scss/defaultText.scss';

// @include font-face('PxGrotesk', '/fonts/PxGrotesk-Regular');

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
