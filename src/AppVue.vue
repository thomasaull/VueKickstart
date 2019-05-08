<template>
  <div class="App">
    <component :is="layout"> <router-view :key="$route.meta.id" /> </component>
  </div>
</template>

<script>
import FontFaceObserver from 'fontfaceobserver'
import DefaultLayout from '@/layouts/DefaultLayout'
import NakedLayout from '@/layouts/NakedLayout'

export default {
  name: 'App',
  components: { DefaultLayout, NakedLayout }, // eslint-disable-line

  computed: {
    layout() {
      if (this.$route.meta.layout) return `${this.$route.meta.layout}Layout`
      return 'DefaultLayout'
    }
  },

  created() {
    // observe loaded fonts
    let font = new FontFaceObserver('Fontname')

    font.load().then(() => {
      document.querySelector('body').classList.add('-fontsLoaded')
    })
  }
}
</script>

<style lang="scss">
@import '../node_modules/reset-css/reset.css';
@import './assets/scss/default.scss';
@import './assets/scss/reset.scss';
@import './assets/scss/defaultText.scss';

.App {
  color: red;
}
</style>
