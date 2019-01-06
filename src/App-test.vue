 <template>
  <div class="App" id="app">This is my app</div>
</template>

<script>
// import FontFaceObserver from 'fontfaceobserver'
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
    // let font = new FontFaceObserver('Meta')
    // font.load().then(() => {
    //   document.querySelector('body').classList.add('-fontsLoaded')
    //   console.log('fonts loaded')
    //   this.setCookie('fontsLoaded', true, 30)
    // })
  },

  methods: {
    setCookie(name, value, days) {
      var d = new Date()
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
      document.cookie =
        name + '=' + value + ';path=/;expires=' + d.toGMTString()
    }
  }
}
</script>


<style lang="scss">
// @import '../node_modules/normalize.css/normalize.css';
// @import './assets/scss/modifyNormalize.scss';
@import './assets/scss/default.scss';
@import './assets/scss/defaultText.scss';
</style>
