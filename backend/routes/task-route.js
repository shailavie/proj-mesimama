const taskService = require('../services/task-service.js')
const userService = require('../services/user-service.js')

const API_URL = '/api/tasks'

function addTaskRoutes(app) {
  app.get(`${API_URL}`, (req, res) => {
    const userId = req.session.userId;
    userService.getById(userId).then(user => {
      return user
    })
      .then((user) => {
        taskService.query((user.isDirector) ? userId : user.directorId)
          .then(tasks => {
            if (!tasks || tasks.length === 0) {
              res.send('Nothing found!')
            }
            else {
              res.json(tasks)
            }
          })
      })
  })
}

module.exports = addTaskRoutes;