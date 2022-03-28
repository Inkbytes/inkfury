import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { store, key } from './store'

const myApp = createApp(App)
myApp.use(store, key)
myApp.use(router).mount('#app')