// export default ({ app }) => {
export default () => {
  // get home image and defaults on client again, if there's change since last prerendering:
  if (process.client) {
    // app.store.dispatch('getDefaults')
  }

  // Every time the route changes (fired on initialization too)
  // app.router.beforeEach(async (to, from, next) => {
  //   if (app.store.state.initialized) {
  //     return next()
  //   }

  //   await app.store.dispatch('getDefaults')

  //   next({
  //     path: to.fullPath,
  //     replace: true
  //   })
  // })
}
