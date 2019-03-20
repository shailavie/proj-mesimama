const taskService = require('../services/task-service.js')

const API_URL = '/api/tasks'

function addTaskRoutes(app) {

  app.get(`${API_URL}/creator/:creatorId`, (req, res) => {
    const creatorId = req.params.creatorId
    console.log(creatorId)
    taskService.queryByCreator(creatorId)
      .then(tasks => {
        res.json(tasks)
        // console.log(tasks)
      })
  })
}

module.exports = addTaskRoutes;