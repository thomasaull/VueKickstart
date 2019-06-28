import Vue from 'vue'
import VueApollo from 'vue-apollo'
import store from '@/store'
import forEach from 'lodash/forEach'
import has from 'lodash/has'
import {
  createApolloClient
  // restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'

import { ApolloLink /*Observable*/ } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { GRAPHQL_URL } from '@/../config/urls'
// import { onError } from 'apollo-link-error'
// import find from 'lodash/find'
// import eventHub from '@/eventHub'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
// const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = GRAPHQL_URL || 'http://localhost:4000/graphql'
// Files URL root
export const filesRoot =
  process.env.VUE_APP_FILES_ROOT ||
  httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

Vue.prototype.$filesRoot = filesRoot

// const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//   // For re-auth if logged out or similar
// })

const batchHttpLink = new BatchHttpLink({
  uri: GRAPHQL_URL
})

const link = ApolloLink.from([batchHttpLink])

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  link,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  // LocalStorage token
  // tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  cache: new InMemoryCache(),

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...
  getAuth: () => {
    return `Bearer ${store.state.auth.token}`
  }

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}

// Call this in the Vue app file
function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options
  })
  apolloClient.wsClient = wsClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      }
    },
    errorHandler(error) {
      forEach(error.graphQLErrors, error => {
        if (!has(error, 'extensions.key'))
          error.extensions = { ...error.extensions, key: 'query.error' }
      })

      store.dispatch('error/handle', { error })

      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    }
  })

  return apolloProvider
}

export const apolloProvider = createProvider()

// Manually call this when user log in
// export async function onLogin(
//   token,
//   apolloClient = apolloProvider.defaultClient
// ) {
//   if (typeof localStorage !== 'undefined' && token) {
//     localStorage.setItem(AUTH_TOKEN, token)
//   }
//   if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
//   try {
//     await apolloClient.resetStore()
//     console.log('store resetted')
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.log('%cError on cache reset (login)', 'color: orange;', e.message)
//   }
// }

// // Manually call this when user log out
// export async function onLogout(apolloClient = apolloProvider.defaultClient) {
//   if (typeof localStorage !== 'undefined') {
//     localStorage.removeItem(AUTH_TOKEN)
//   }
//   if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
//   try {
//     await apolloClient.resetStore()
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
//   }
// }
