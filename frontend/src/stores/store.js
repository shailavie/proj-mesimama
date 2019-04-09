import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/user-store.js'
import taskService from '../services/task-service.js'
import userService from '../services/user.service.js'
import socketService from '../services/socket.service.js'
import imgService from '../services/img-service.js'
//Delete router, only for dev!
import Router from 'vue-router'
Vue.use(Router)
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore
  },
  state: {
    activeTasks: [],
    filterBy: {},
    currTask: null,
  },
  mutations: {
    updateTask(state, { updatedTask }) {
      let taskIdx = state.activeTasks.findIndex(task => task._id === updatedTask._id)
      state.activeTasks.splice(taskIdx, 1, updatedTask)
    },
    removeTask(state, taskId) {
      let taskIdx = state.activeTasks.findIndex(task => task._id === taskId)
      state.activeTasks.splice(taskIdx, 1)
    },
    addTask(state, newTask) {
      state.activeTasks.unshift(newTask)
    },
    setActiveTasks(state, { activeTasks }) {
      state.activeTasks = activeTasks
    },
    ownTask(state, { taskId }) {
      let taskIdx = state.activeTasks.findIndex(task => task._id === taskId)
      state.activeTasks[taskIdx].helperId = userStore.state.currUser._id
    },
    passTask(state, { task }) {
      let taskIdx = state.activeTasks.findIndex(t => t._id === task._id)
      state.activeTasks[taskIdx].helperId = null
    },
  },
  actions: {
    async removeTask(context, taskId) {
      await taskService.removeTask(taskId)
      context.commit({ type: 'removeTask', taskId })
      context.dispatch({ type: 'loadActiveTasks' })
      // Reloading users with tasks 
      context.dispatch({ type: 'loadUsersWithTasks' })
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
      context.commit({ type: 'setActiveTasks', activeTasks })
    },
    async loadTask(context, { taskId }) {
      let taskIdx = context.state.activeTasks.findIndex(task => task._id === taskId)
      if (taskIdx !== -1) {
        var task = context.state.activeTasks[taskIdx]
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
        name: `${task.title}`,
        status: 'passed',
        isRead: false,
        createdAt: Date.now(),
        taskId: id
      }
      var obj = {
        task,
        notification
      }
      let group = context.getters.currGroup
      await userService.updateGroupNotifications(group, notification)
      socketService.emit('taskPassed', obj)
    },
    async markDone(context, task) {
      var updatedTask = await taskService.markDone(task)
      let user= userStore.state.currUser
      let obj= {
        task,
        user
      }
      socketService.emit('finishedTask',obj)
    },
    async addNewComment(context, task) {
      if (task._id) {
        let taskWithNewComment = await taskService.addCommentTo(task)
        context.commit({ type: 'updateTask', taskWithNewComment })
      }
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
        socketService.emit('updateTask', task)
        if (task.isUrgent) socketService.emit('urgentTask', task)
      } else {
        //get group
        let group = context.getters.currGroup
        //add task on database
        let newTask = await taskService.addTask(task)
        //make new 'news'
        var notification = {
          name: `${task.title} `,
          status: 'added',
          isRead: false,
          createdAt: newTask.createdAt,
          taskId: newTask._id
        }
        //update all group users with the new 'news'
        console.log(notification)
        await userService.updateGroupNotifications(group, notification)
        //refresh group at state after news update
        console.log('after updating the users, we are loading the group from the database')
        await context.dispatch({ type: 'loadGroup' })
        //adding new task to local array
        context.commit({ type: 'addTask', newTask })
        //sending to server the notification and new task for update and broadcast to all users
        socketService.emit("addedTask", newTask);
      }
    },
    // // FOR USER AVATAR UPLOAD
    // async uploadImg(context, { file }) {
    //   let url = await imgService.uploadImg(file)
    //   console.log(url)
    //   //UPDATE STATE DIRECTOR
    //   context.commit({ type: 'updateDirectoreUrls', url })
    //   //UPDATE DIRECTOR ON DATABASE SERVER
    //   await context.dispatch({ type: 'updateDirectorOnServer', user: userStore.state.currDirector })
    //   // context.dispatch({type:'updateCurrDirector'})
    // },
    // FOR MULTIPLE UPLOADS
    async uploadImgs(context, { files }) {
      let urls = await imgService.uploadPictures(files)
      console.log(urls)
      context.commit({ type: 'updateDirectoreUrls', urls })
      await context.dispatch({ type: 'updateDirectorOnServer', user: userStore.state.currDirector })
    },
  },
  getters: {
    tasksWithNoHelpers(state) {
      return state.activeTasks.filter(task => task.helperId === null)
    },
    allTasks(state) {
      return state.activeTasks
    },
  }
})


export default store;
