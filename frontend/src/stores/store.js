import Vue from 'vue'
import Vuex from 'vuex'
import storeTasks from './modules/store-tasks.js'
import taskService from '../services/task-service.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // storeTasks 
  },
  state: {
    taskItems: [],
    filterBy: {},
    currTask: null,
    directorId: 'mom1', //TO DO - GET ALL THIS FROM SESSION
    user: { //TO DO - GET ALL THIS FROM SESSION
        name: "Saba Zion",
        directorId: 'mom1',
        _id: 'j3F4fd',
        score: 138,
        imgSrc: "/img/users/grampa.jpeg"
      },
  },
  mutations: {
    setTaskItems(state, { tasks }) {
      state.taskItems = tasks
    },
    setTaskHelper(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = state.user._id
      // console.log(state.user.name, ' took Helpership over task ', taskId)
    },
    clearTaskHelper(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = null
      console.log('TASK ABANDONED!')
    }
  },
  actions: {
    async loadTask(context, {taskId}){
      console.log('inside store',taskId)
      let taskIdx = context.state.taskItems.findIndex(task => task._id === taskId)
      if (taskIdx !== -1) {
        var task = context.state.taskItems[taskIdx]
        console.log('task was found', task)
        return task
      } else {
        console.log('couldnt find task in store (idx:,',taskIdx,') fetching from service')
        var task = await taskService.getTaskById(taskId)
        console.log('task was found', task)
        return task
      }
    },
    loadUnownedTasks(context) {
      taskService.query()
        .then(tasks => {
          console.log('store got from util', tasks)
          context.commit({ type: 'setTaskItems', tasks })
        })
    },
    async setTaskHelper(context, taskId) {
      await taskService.setTaskHelper(taskId, context.state.user._id)
      context.commit({ type: 'setTaskHelper', taskId, helperId: context.state.user._id })
      console.log('task is owned')
    },
    async clearTaskHelper(context, taskId) {
      await taskService.clearTaskHelper(taskId)
      context.commit({ type: 'clearTaskHelper', taskId })
      console.log('store action : task is passed')
    },
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
      return state.directorId
    }
  }
})
