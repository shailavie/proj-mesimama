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
var webPush = require('web-push');

var pushSubscription = {"endpoint":"https://android.googleapis.com/gcm/send/f1LsxkKphfQ:APA91bFUx7ja4BK4JVrNgVjpg1cs9lGSGI6IMNL4mQ3Xe6mDGxvt_C_gItKYJI9CAx5i_Ss6cmDxdWZoLyhS2RJhkcv7LeE6hkiOsK6oBzbyifvKCdUYU7ADIRBiYNxIVpLIYeZ8kq_A",
"keys":{"p256dh":"BLc4xRzKlKORKWlbdgFaBrrPK3ydWAHo4M0gs0i1oEKgPpWC5cW8OCzVrOQRv-1npXRWk8udnW3oYhIO4475rds=", "auth":"5I2Bu2oKdyy9CwL8QVF0NQ=="}};

var payload = 'Here is a payload!';

var options = {
  gcmAPIKey: 'AIzaSyD1JcZ8WM1vTtH6Y0tXq_Pnuw4jgj_92yg',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
