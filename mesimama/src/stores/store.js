import Vue from 'vue'
import Vuex from 'vuex'
import storeTasks from './modules/store-tasks.js'
import taskService from '../services/task-service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    // storeTasks
  },
  state: {
    taskItems: [],
    filterBy: {},
    currTask: null,
  },
  mutations: {
    setTaskItems(state,  {tasks} ) {
      console.log('mutating', tasks)
      state.taskItems = tasks
      console.log(state.taskItems)
      },
  },
  actions: {
    loadTaskItems(context) {
         taskService.query()
         .then(tasks => {
           console.log('store got from util',tasks)
           context.commit({ type: 'setTaskItems', tasks })
         })
      },
  },
  getters: {
    filteredTasks(state){
        return state.taskItems
    }
  }
})
