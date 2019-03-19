import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import tasks from './views/tasks.vue'
import chat from './views/chat.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/tasks',
          name: 'tasks',
          component: tasks
        },
        {
          path: '/chat',
          name: 'chat',
          component: chat
        }
      ]
    }
  ]
})
