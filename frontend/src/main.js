import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'
import Element from 'element-ui'
import './registerServiceWorker'
import '@/assets/style.scss';
import 'element-ui/lib/theme-chalk/index.css';
import Notifications from 'vue-notification'


Vue.use(Notifications)
Vue.config.productionTip = false

Vue.use(Element)
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
