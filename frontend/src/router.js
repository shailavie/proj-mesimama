import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
import tasks from './views/tasks.vue'
import chat from './views/chat.vue'
import notifications from './views/notifications.vue'
import myAccount from './views/user-profile.vue'
import dashboard from './components/dashboard.vue'
import photoGallery from './components/photo-gallery-cmp.vue'
import login from './views/login.vue'
import taskEdit from './views/task-edit.vue'
import taskDetails from './views/task-details.vue'
import rewards from './views/rewards.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
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
          path: 'rewards',
          name: 'rewards',
          component: rewards
        },
        {
          path: 'user-profile/:userId',
          name: 'user-profile',
          component: myAccount
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: dashboard
        },
        {
          path: 'edit/:taskId?',
          name: 'edit',
          component: taskEdit
        },
        {
          path: 'details/:taskId',
          name: 'details',
          component: taskDetails
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: photoGallery
        }

      ]
    }
  ]
})
