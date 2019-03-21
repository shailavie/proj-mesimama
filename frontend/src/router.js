import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
import tasks from './views/tasks.vue'
import chat from './views/chat.vue'
import notifications from './views/notifications.vue'
import myAccount from './views/my-account.vue'
import socketHouse from './components/socket-house.vue'
import dashboard from './components/dashboard.vue'

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
          name: 'chatRoom',
          component: chat
        },
        // {
        //   path: '/chat/:roomId',
        //   name: 'chatRoom',
        //   component: chat
        // },
        {
          path: 'notifications',
          name: 'notifications',
          component: notifications
        },
        {
          path: 'my-account',
          name: 'my-account',
          component: myAccount
        },
        {
          path: 'socketHouse',
          name: 'socketHouse',
          component: socketHouse
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: dashboard
        },

      ]
    }
  ]
})
