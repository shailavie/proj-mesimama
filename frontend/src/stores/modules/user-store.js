import taskService from '../../services/task-service.js'
import userService from '../../services/user.service.js'
import utilService from '../../services/util-service.js';
import imgService from '../../services/img-service.js';



const userStore = {
  state: {
    usersWithTasks: [],
    currUser: null,
    currGroup: [],
    currDirector: {},
    introGroup: []
  },
  mutations: {
    updateDirectorOnServer(state, { director }) {
      state.currDirector = director
    },
    updateDirectoreUrls(state, { urls }) {
      urls.forEach((url)=>{
        let imgObj = {
          url,
          _id: utilService.makeId()
        }
        state.currDirector.imgUrls.unshift(imgObj)
      })
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
    loadIntroGroup(state, { users }) {
      state.introGroup = users
    },
    setCurrUser(state, { currUser }) {
      state.currUser = currUser
    },

  },
  actions: {
    async addHelper(context, {helperToAdd}){
      console.log('newHelper to add:',helperToAdd)
      let newAddedHelper = await userService.addHelper(helperToAdd)
      console.log('newAddedHelper',newAddedHelper)
      return newAddedHelper
    },
    async signUp(context, {userCred}){
      console.log('userCred',userCred)
      let newAddedUser = await userService.checkCred(userCred)
      // console.log('store got result from the db - wow',newAddedUser)
      // console.log(newAddedUser._id)
      // console.log('In store, got director id:',newAddedUser.directorId)
      // console.log('returning to signup page with a user')
      return newAddedUser
    },
    async deleteImg(context, { url }) {
      let imgId = url._id
      let director = context.state.currDirector
      let urlIdx = director.imgUrls.findIndex(img => img._id === imgId)
      director.imgUrls.splice(urlIdx, 1)
      await userService.updateUser(director)
      context.dispatch('loadCurrDirector')
    },
    async updateDirectorOnServer(context, { user }) {
      let director = await userService.updateUser(user)
      context.commit({ type: 'updateDirectorOnServer', director })
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
    async loadIntroGroup(context, { directorId }) {
      let users = await userService.getIntroUsers(directorId)
      await context.commit({ type: 'loadIntroGroup', users })
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
      userService.updateUser(context.state.currUser)
    },
    async loadUsersWithTasks(context) {
      let activeTasks = await taskService.query()
      let usersWithTasks = await userService.getUsers()
      usersWithTasks.map(user => user.tasks = [])
      usersWithTasks.map(user => {
        user.tasks = []
        activeTasks.forEach(task => {
          if (task.helperId === user._id && task.status !== 'done')
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
    introGroup(state) {
      return state.introGroup
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
