<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import has from 'lodash/has'
import lazysizes from '@/mixins/lazysizes'

export default {
  name: 'default',
  mixins: [lazysizes],

  head() {
    return {
      title: this.$route.meta.title
    }
  },

  computed: {
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
