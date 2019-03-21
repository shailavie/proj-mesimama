const taskService = require('../services/task-service.js')
const userService = require('../services/user-service.js')

const API_URL = '/api/tasks'

function addTaskRoutes(app) {
  app.get(`${API_URL}`, (req, res) => {
    const userId = req.session.userId;
    console.log(userId)
    // var directorId = null;
    // userService.getById(userId).then(user => {
    //   directorId = (user.directorId) ? user.directorId : null;
    // })

    //   .then(() => {
    //     taskService.query((directorId) ? directorId : userId)
    //       .then(tasks => {
    //         if (!tasks || tasks.length === 0) {
    //           res.send('Nothing found!')
    //         }
    //         else {
    //           res.json(tasks)
    //         }
    //       })
    //   })
    res.send(userId)
  })
}

module.exports = addTaskRoutes;