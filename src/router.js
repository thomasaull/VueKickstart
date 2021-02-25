import Vue from 'vue'
import Router from 'vue-router'

// import store from '@/store'

Vue.use(Router)

import Home from '@/views/Home.vue'

export const router = new Router({
  mode: 'history',
  base: '/',

  scrollBehavior(route, from) {
    if (route.name === from.name) {
      return
    }

    return
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
})

// TODO: This should be done differently
// const { data: routesFromApi } = await axios.get('routes')
// const routes = walkRoutes(routesFromApi)

// router.addRoutes(routes)

// router.addRoutes([
//   // {
//   //   path: '*',
//   //   meta: { layout: 'Naked' },
//   //   component: Error404
//   // }
// ])

// function walkRoutes(routes) {
//   forEach(routes, route => {
//     if (route.template === 'projects') route.component = Projects
//     if (route.template === 'project') route.component = ProjectDetail
//     if (route.template === 'info') route.component = Info

//     route.path = route.url
//     route.meta = { id: route.id }
//     if (route.title) route.meta.title = route.title
//     route.props = { id: route.id }

//     if (route.root) route.meta.root = route.root

//     // route.pathToRegexpOptions = { strict: true }

//     if (route.children) {
//       if (route.template !== 'info') {
//         routes = [...routes, ...walkRoutes(route.children)]
//       }

//       if (route.template === 'info') {
//         route.meta.hashNavigation = {}

//         forEach(route.children, child => {
//           route.meta.hashNavigation[child.name] = child.id
//         })
//       }

//       delete route.children
//     }
//   })

//   return routes
// }

// Logic for redirect to request url from: https://stackoverflow.com/a/51034158/7236347
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth !== false && !store.getters['auth/isLoggedIn']) {
//     const loginpath = to.path || window.location.pathname
//     next({ path: '/login', query: { from: loginpath } })
//   }

//   next()
// })
