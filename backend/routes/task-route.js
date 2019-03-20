const taskService = require('../services/task-service.js')

const API_URL = '/api/tasks'

function addTaskRoutes(app, creatorId) {

  app.get(`${API_URL}`, (req, res) => {
    taskService.query(creatorId)
      .then(tasks => {
        res.json(tasks)
      })
  })
}

module.exports = addTaskRoutes;