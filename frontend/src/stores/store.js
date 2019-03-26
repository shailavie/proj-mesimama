import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/user-store.js'
import taskService from '../services/task-service.js'
import userService from '../services/user.service.js'
import socketService from '../services/socket.service.js'

//Delete router, only for dev!
import Router from 'vue-router'
Vue.use(Router)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore
  },
  state: {
    taskItems: [],
    filterBy: {},
    currTask: null,
  },
  mutations: {
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
    setTaskItems(state, { activeTasks }) {
      state.taskItems = activeTasks
    },
    ownTask(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = userStore.state.currUser._id
    },
    passTask(state, { task }) {
      let taskIdx = state.taskItems.findIndex(t => t._id === task._id)
      state.taskItems[taskIdx].helperId = null
    },
  },
  actions: {
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
      await taskService.ownTask(taskId, userStore.state.currUser._id)
      context.commit({ type: 'ownTask', taskId, helperId: userStore.state.currUser._id })
      socketService.emit('owningTask', userStore.state.currUser)
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
      // context.dispatch({ type: 'setCurrUser' })
      // context.dispatch({ type: 'loadActiveTasks' })
      // context.dispatch({ type: 'loadGroup' })
      socketService.emit('finishedTask')
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
        socketService.emit('updateTask',task)
        if (task.isUrgent) socketService.emit('urgentTask', task)
      } else {
        let group = await context.getters.currGroup
        let newTask = await taskService.addTask(task)
        var notification = {
          name: `task title: ${task.title} was added, see if you can help!`,
          isRead: false,
          createdAt: newTask.createdAt
        }
        userService.updateGroupNotifications(group, notification)
        await context.dispatch({ type: 'loadGroup' })
        //adding new task to local array
        context.commit({ type: 'addTask', newTask })
        //sending to server the notification and new task for update and broadcast to all users
        socketService.emit("addedTask", newTask);
      }
    },
  },
  getters: {
    tasksWithNoHelpers(state) {
      return state.taskItems.filter(task => task.helperId === null)
    },
    allTasks(state) {
      return state.taskItems
    },
  }
})


export default store;
