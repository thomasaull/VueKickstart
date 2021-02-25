import extend from '@/plugins/utliExtendVueApp'

export default async function ({ app }) {
  extend(app, {
    mounted() {
      console.log('Hooray, Nuxt.js app mounted.')
    },
  })
}
