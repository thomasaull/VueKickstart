import type { App } from 'vue'
import { apolloClient } from '@/vue-apollo'
import { createPinia } from 'pinia'

import { DefaultApolloClient } from '@vue/apollo-composable'

export function attachStuffToAppInstance(app: App): void {
  app.use(createPinia())

  app.provide(DefaultApolloClient, apolloClient)
}
