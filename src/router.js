import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
// import forEach from 'lodash/forEach'
// import has from 'lodash/has'

Vue.use(Router)

import Home from '@/pages/Home.vue'

export async function createRouter() {
  const router = new Router({
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
        component: Home
      }
    ]
  })

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

  return router
}

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
