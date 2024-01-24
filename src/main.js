import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import store from './store/index.js'

const app = createApp(App)
store.actions.initialize()

app.use(router)

app.use(vue3GoogleLogin, {
    clientId: '1087408511037-94dlnouve6tn3fsh789tb04tv9rpnhn0.apps.googleusercontent.com'
})

app.mount('#app')