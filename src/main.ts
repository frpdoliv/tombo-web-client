import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'spinkit/spinkit.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT

createApp(App).use(router).mount('#app')
