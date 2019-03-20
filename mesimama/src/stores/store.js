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
    notificationsCount: 1
 
  },
  mutations: {
    setTaskItems(state, { tasks }) {
      console.log('mutating', tasks)
      state.taskItems = tasks
      console.log(state.taskItems)
    },
 
    setTaskOwner(state, { taskId }) {
      console.log('inside mutation', state.taskItems)
      console.log('got task id', taskId)
      let taskIdx = state.taskItems.findIndex(task => task._id === taskId)
      console.log('taskIdx', taskIdx)
      state.taskItems[taskIdx].ownerId = state.user._id
      console.log(state.user.name, ' took ownership over task ', taskId)
    }
  },
  actions: {
    loadUnownedTasks(context) {
 
  },
  actions: {
    loadTaskItems(context) {
      taskService.query()
        .then(tasks => {
          console.log('store got from util', tasks)
          context.commit({ type: 'setTaskItems', tasks })
        })
    },
 
    async setTaskOwner(context, taskId) {
      await taskService.ownTask(taskId, context.state.user._id)
      context.commit({ type: 'setTaskOwner', taskId })
      console.log('task is owned')
    }
 
  },
  getters: {
    filteredTasks(state) {
      return state.taskItems
    },
 
    currUserId(state) {
      return state.user._id
    },
    notificationsCount(state) {
      return state.notificationsCount
    }
  }
})
