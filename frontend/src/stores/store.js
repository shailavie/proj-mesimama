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
    user: { name: 'puki', _id: 'j3F4fd' }, // TODO: Get the current user from session
  },
  mutations: {
    setTaskItems(state, { tasks }) {
      // console.log('mutating', tasks)
      state.taskItems = tasks
      console.log(state.taskItems)
    },
    setTaskHelper(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = state.user._id
      console.log(state.user.name, ' took Helpership over task ', taskId)
    },
    clearTaskHelper(state, { taskId }) {
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      state.taskItems[taskIdx].helperId = null
      console.log('TASK ABANDONED!')
    }
  },
  actions: {
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
    }
  }
})
