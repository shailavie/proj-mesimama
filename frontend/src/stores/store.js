import Vue from 'vue'
import Vuex from 'vuex'
import storeTasks from './modules/store-tasks.js'
import taskService from '../services/task-service.js'
import userService from '../services/user.service.js'
import socketService from '../services/socket.service.js'

//Delete router, only for dev!
import Router from 'vue-router'
Vue.use(Router)

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // storeTasks 
  },
  state: {
    taskItems: [],
    filterBy: {},
    currTask: null,
    currUser: null,
    currGroup: []
  },
  mutations: {
    loadGroup(state, { users }) {
      users = users.sort(function (a, b) {
        return a.score > b.score ? 1 : -1;
      });
      state.currGroup = users
    },
    updateTask(state, { updatedTask }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === updatedTask._id)
      state.taskItems.splice(taskIdx, 1, updatedTask)
    },
    removeTask(state, taskId) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems.splice(taskIdx, 1)
    },
    addTask(state, newTask) {
      state.taskItems.unshift(newTask)
    },
    setCurrUser(state, { currUser }) {
      state.currUser = currUser
    },
    setTaskItems(state, { activeTasks }) {
      state.taskItems = activeTasks
    },
    ownTask(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = state.currUser._id
    },
    passTask(state, { task }) {
      let taskIdx = state.taskItems.findIndex(t => t._id === task._id)
      state.taskItems[taskIdx].helperId = null
    },
    updateNotifications(state, { notification }) {
      console.log('got to update')
      let notifs = state.currUser.notifications
      console.log(notifs)
      if (notifs.length > 10) {
        notifs.shift()
        notifs.unsift(notification)
      } else notifs.unshift(notification)
      console.log(notifs)
      state.currUser.notifications = notifs
    }
  },
  actions: {
    async loadGroup(context) {
      let users = await userService.getUsers()
      context.commit({ type: 'loadGroup', users })
    },
    async removeTask(context, taskId) {
      await taskService.removeTask(taskId)
      context.commit({ type: 'removeTask', taskId })
      context.dispatch({ type: 'loadActiveTasks' })
      socketService.emit('reloadTasks')
      Vue.notify({
        group: 'foo',
        title: 'Task was deleted! ',
        type: 'warn',
        classes: 'vue-notification',
        text: `Maybe think of a new one?  `
      })
    },
    async setCurrUser(context) {
      let currUser = await userService.getCurrUser()
      context.commit({ type: 'setCurrUser', currUser })
    },

    async updateUser(context, { user }) {
      console.log(user)
      let updatedUser = await userService.updateUser(user)
      context.state.currUser = updatedUser
    },

    async loadActiveTasks(context) {
      let activeTasks = await taskService.query()
      context.commit({ type: 'setTaskItems', activeTasks })

    },
    async loadTask(context, { taskId }) {
      let taskIdx = context.state.taskItems.findIndex(task => task._id === taskId)
      if (taskIdx !== -1) {
        var task = context.state.taskItems[taskIdx]
        return task
      } else {
        var task = await taskService.getTaskById(taskId)
        return task
      }
    },
    async ownTask(context, taskId) {
      await taskService.ownTask(taskId, context.state.currUser._id)
      context.commit({ type: 'ownTask', taskId, helperId: context.state.currUser._id })
      socketService.emit('owningTask', context.state.currUser)
      console.log('task is owned')
    },
    async passTask(context, task) {
      var id = task._id
      await taskService.passTask(id)
      context.commit({ type: 'passTask', task })
      var notification = {
        name: `${task.title} was passed, see if you can help out`,
        isRead: false,
        createdAt: task.createdAt
      }
      var obj = {
        task,
        notification
      }
      socketService.emit('taskPassed', obj)
    },
    async markDone(context, task) {
      var updatedTask = await taskService.markDone(task)
      console.log(updatedTask, ' after done')
      context.dispatch({ type: 'setCurrUser' })
      context.dispatch({ type: 'loadActiveTasks' })
      context.dispatch({ type: 'loadGroup' })
    },
    async saveTask(context, task) {
      if (task._id) {
        let updatedTask = await taskService.updateTask(task)
        context.commit({ type: 'updateTask', updatedTask })
        Vue.notify({
          group: 'foo',
          title: 'Task was updated! ',
          classes: 'vue-notification',
          text: `Good job, keep it up! `
        })
        if (task.isUrgent) socketService.emit('urgentTask', task)
      } else {
        let newTask = await taskService.addTask(task)
        //adding new task to local array
        context.commit({ type: 'addTask', newTask })

        //create notification
        var notification = {
          name: `task title: ${task.title} was added, see if you can help!`,
          isRead: false,
          createdAt: newTask.createdAt
        }
        var obj = {
          notification,
          newTask
        }
        //sending to server the notification and new task for update and broadcast to all users
        socketService.emit("addedTask", obj);
        console.log('STORE DONE ADDING NEW TASK')
      }
    },
  },
  getters: {
    currGroup(state) {
      return state.currGroup
    },
    notifications(state) {
      return state.notifications
    },
    filteredTasks(state) {
      return state.taskItems
    },
    currUserId(state) {
      return state.currUser._id
    },
    currUser(state) {
      return state.currUser
    },
    currDirectorId(state) {
      return (state.currUser.isDirector) ? state.currUser._id : state.currUser.directorId
    },
    notificationCounter(state) {
      var unReadNotifications = state.currUser.notifications.filter((notification) => {
        return !notification.isRead
      })
      return unReadNotifications.length
    }
  }
})
