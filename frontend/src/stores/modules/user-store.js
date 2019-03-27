import taskService from '../../services/task-service.js'
import userService from '../../services/user.service.js'
import socketService from '../../services/socket.service'
import utilService from '../../services/util-service.js';



const userStore = {
  state: {
    usersWithTasks: [],
    currUser: null,
    currGroup: [],
    currDirector: {}
  },
  mutations: {
    updateDirectorOnServer(state,{director}){
      state.currDirector=director
    },
     updateDirectoreUrls(state,{url}){
      state.currDirector.imgUrls.unshift(url)
    },
    loadCurrDirector(state, { directorIdx }) {
      state.currDirector = state.currGroup[directorIdx]
    },
    updateUserNotifications(state) {
      state.currUser.notifications.forEach((notif) => {
        return notif.isRead = true;
      })
    },
    setUsersWithTasks(state, { usersWithTasks }) {
      state.usersWithTasks = usersWithTasks
    },
    loadGroup(state, { users }) {
      users = users.sort(function (a, b) {
        return a.score > b.score ? 1 : -1;
      });
      state.currGroup = users
    },
    setCurrUser(state, { currUser }) {
      state.currUser = currUser
    },

  },
  actions: {
   async updateDirectorOnServer(context,{user}){
    let director= await  userService.updateUser(user)
    context.commit({type:'updateDirectorOnServer',director})
    },
    loadCurrDirector(context) {
      let directorIdx = context.state.currGroup.findIndex((user) => {
        return user.isDirector
      })
      context.commit({ type: 'loadCurrDirector', directorIdx })
    },
    async loadGroup(context) {
      let users = await userService.getUsers()
     await context.commit({ type: 'loadGroup', users })
    },
    async setCurrUser(context) {
      let currUser = await userService.getCurrUser()
      context.commit({ type: 'setCurrUser', currUser })
    },
    async updateUser(context, { user }) {
      let updatedUser = await userService.updateUser(user)
      context.state.currUser = updatedUser
    },
    updateUserNotifications(context) {
      context.commit('updateUserNotifications')
      userService.updateUser(context.currUser)
    },
    async loadUsersWithTasks(context) {
      let activeTasks = await taskService.query()
      let usersWithTasks = await userService.getUsers()
      usersWithTasks.map(user => user.tasks = [])
      usersWithTasks.map(user => {
        user.tasks = []
        activeTasks.forEach(task => {
          if (task.helperId === user._id)
            user.tasks.push(task)
        })
      })
      context.commit({ type: 'setUsersWithTasks', usersWithTasks })
    },
  },
  getters: {
    urls(state) {
      return state.currDirector.imgUrls
    },
    currGroup(state) {
      return state.currGroup
    },
    notifications(state) {
      return state.notifications
    },
    usersWithTasks(state) {
      return state.usersWithTasks
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
  },
}

export default userStore;
