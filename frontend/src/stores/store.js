import Vue from 'vue'
import Vuex from 'vuex'
import storeTasks from './modules/store-tasks.js'
import taskService from '../services/task-service.js'
import userService from '../services/user.service.js'
import socketService from '../services/socket.service.js'

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
    // directorId: 'mom1', //TO DO - GET ALL THIS FROM SESSION
    user: { //TO DO - GET ALL THIS FROM SESSION
      name: "Saba Zion",
      directorId: 'mom1',
      _id: 'j3F4fd',
      score: 138,
      imgSrc: "/img/users/grampa.jpeg"
    },
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
    setCurrUser(state, { currUser }) {
      state.currUser = currUser
    },
    setTaskItems(state, { tasks }) {
      state.taskItems = tasks
    },
    ownTask(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = state.user._id
    },
    passTask(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = null
    }
  },
  actions: {
    async removeTask(context, taskId) {
      await taskService.removeTask(taskId)
      context.commit({ type: 'c', taskId })
      Vue.notify({
        group: 'foo',
        title: 'Task was deleted! ',
        type: 'warn',
        classes:'vue-notification',
        text: `Maybe think of a new one?  `
      })
    },
    async setCurrUser(context) {
      let currUser = await userService.getCurrUser()
      context.commit({ type: 'setCurrUser', currUser })
    },
    loadActiveTasks(context) {
      taskService.query()
        .then(tasks => {
          context.commit({ type: 'setTaskItems', tasks })
        })
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
      await taskService.ownTask(taskId, context.state.user._id)
      context.commit({ type: 'ownTask', taskId, helperId: context.state.user._id })
      socketService.emit('owningTask', taskId, context.state.user)
      console.log('task is owned')
    },
    async passTask(context, taskId) {
      await taskService.passTask(taskId)
      context.commit({ type: 'passTask', taskId })
    },
    async saveTask(context, task) {
      if (task._id) {
        console.log('STORE GOT TASK:', task)
        let updatedTask = await taskService.updateTask(task)
        context.commit({ type: 'updateTask', updatedTask })
        Vue.notify({
          group: 'foo',
          title: 'Task was updated! ',
          // type: 'success',
          classes:'vue-notification',
          text: `Good job, keep it up! `
        })
        if (task.isUrgent) socketService.emit('urgentTask',task)
        console.log('STORE DONE UPDATING NEW TASK')
      } else {
        console.log('new task')
        let newTask = await taskService.addTask(task)
        socketService.emit("addedTask", newTask);
        context.commit({ type: 'addTask', newTask })
        console.log('STORE DONE ADDING NEW TASK')
      }
    }
  },
  getters: {
    filteredTasks(state) {
      return state.taskItems
    },
    currUserId(state) {
      return state.user._id
    },
    currUser(state) {
      return state.user
    },
    currDirectorId(state) {
      return (state.currUser.isDirector) ? state.currUser._id : state.currUser.directorId
    }
  }
})
