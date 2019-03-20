import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import tasks from './views/tasks.vue'
import chat from './views/chat.vue'
import notifications from './views/notifications.vue'
import myAccount from './views/my-account.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/app',
      name: 'home',
      component: home,
      children: [
        {
          path: 'tasks',
          name: 'tasks',
          component: tasks
        },
        {
          path: 'chat',
          name: 'chat',
          component: chat
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: notifications
        },
        {
          path: 'my-account',
          name: 'my-account',
          component: myAccount
        }
      ]
    }
  ]
})
