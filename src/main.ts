import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import './style.css'

const app = createApp(App);

app.use(autoAnimatePlugin)
   .use(VueCookies, { expires: '7d'})
   .mount('#app')


