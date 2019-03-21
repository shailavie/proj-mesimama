const taskService = require('../services/task-service.js')

const API_URL = '/api/tasks'

function addTaskRoutes(app) {

  app.get(`${API_URL}`, (req, res) => {
    taskService.query('mom1')
      .then(tasks => {
        if (!tasks || tasks.length === 0) {
          res.send('Nothing found!')
        }
        else {
          res.json(tasks)
        }
      })
  })

}

module.exports = addTaskRoutes;