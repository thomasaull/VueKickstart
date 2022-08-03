import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

import URL from '@/constants/urls'

const httpLink = createHttpLink({
  uri: URL.GRAPHQL,
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
