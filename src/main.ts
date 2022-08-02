import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { attachStuffToAppInstance } from '@/sharedMain'

const app = createApp(App)

attachStuffToAppInstance(app)
app.use(router)

app.mount('#app')
