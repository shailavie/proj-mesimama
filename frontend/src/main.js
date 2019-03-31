import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'
import Notifications from 'vue-notification'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './registerServiceWorker'
import '@/assets/style.scss';
import 'element-ui/lib/theme-chalk/index.css';
import VueMasonry from 'vue-masonry-css'



Vue.use(VueMasonry);
Vue.use(Notifications)
Vue.config.productionTip = false

Vue.use(Element, { locale })
Vue.use(require('vue-moment'));



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
