import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://api.mokk.test/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: httpLink,
  cache,
})
