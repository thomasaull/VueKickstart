import { createApp, h, provide } from "vue";
import App from "./App.vue";

// import { createProvider } from "./vue-apollo";
import router from "./router";
import store from "./store";

import { apolloClient } from "@/vue-apollo";
import {
  DefaultApolloClient,
  // ApolloClients,
  // provideApolloClient,
} from "@vue/apollo-composable";
// import VueApollo from "@vue/apollo-option";

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// });

const app = createApp({
  setup() {
    // const instance = getCurrentInstance();
    // provide(ApolloClients, {
    //   default: apolloClient,
    // });
    provide(DefaultApolloClient, apolloClient);
    // provideApolloClient(apolloClient);
    // provide(DefaultApolloClient, {
    //   default: apolloClient,
    // });
  },

  render() {
    return h(App);
  },
});

app.use(store);
app.use(router);
// eslint-disable-next-line
// app.use(VueApollo); // @ts-ignore
// app.use(apolloProvider);
app.mount("#app");

// eslint-disable-next-line
// @ts-ignore 
// new Vue({
//   apolloProvider: createProvider(),

//   // eslint-disable-next-line
//   render: (h: (arg0: Vue.DefineComponent<{}, {}, any, Vue.ComputedOptions, Vue.MethodOptions, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin, Record<string, any>, string, Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps, Readonly<{} & {}>, {}>) => any) => h(App)
// }).$mount("#app");
