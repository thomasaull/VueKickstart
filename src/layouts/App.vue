<template>
  <div class="App">
    <component :is="layout"><nuxt /></component>

    <!-- <template #notifications>
      <Notifications />
    </template> -->

    <ErrorModal
      v-if="latestUnreadError"
      :error="latestUnreadError"
      @close="$store.commit('error/markAsRead', latestUnreadError.id)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import has from 'lodash/has'
import FontFaceObserver from 'fontfaceobserver'
import LayoutDefault from '@/layouts/LayoutDefault'
import LayoutNaked from '@/layouts/LayoutNaked'

export default {
  name: 'App',
  components: { LayoutDefault, LayoutNaked }, // eslint-disable-line

  computed: {
    ...mapGetters('error', { latestUnreadError: 'latestUnread' }),

    layout() {
      if (this.$route.meta.layout) return `${this.$route.meta.layout}Layout`
      return 'LayoutDefault'
    },

    routerKey() {
      if (has(this.$route, 'meta.root.id')) {
        if (this.$route.meta.root.template === 'info')
          return String(this.$route.meta.root.id)
      }

      return String(this.$route.meta.id)
    },
  },

  created() {
    if (!process.client) return

    // observe loaded fonts
    let font = new FontFaceObserver('Fontname')

    font.load().then(() => {
      document.querySelector('body').classList.add('-fontsLoaded')
    })

    window.addEventListener('touchstart', this.activateTouchInterface)
  },

  beforeDestroy() {
    window.removeEventListener('touchstart', this.activateTouchInterface)
  },

  methods: {
    activateTouchInterface() {
      this.$store.commit('set', { touchInterface: true })
    },
  },

  // head() {
  //   return {
  //     title: this.$route.meta.title
  //   }
  // }
}
</script>

<style lang="scss">
/* stylelint-disable */
@import '@/assets/scss/default.scss';
@import '@/assets/scss/reset.scss';

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
