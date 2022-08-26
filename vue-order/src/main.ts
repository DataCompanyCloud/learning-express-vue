import './scss/styles.scss'
import '~bootstrap/dist/js/bootstrap.bundle.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from './fontawesome'

const app = createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')

