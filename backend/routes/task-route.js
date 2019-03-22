const taskService = require('../services/task-service.js')
const userService = require('../services/user-service.js')


const API_URL = '/api/tasks'

function addTaskRoutes(app) {

  // Get all tasks for the user
  app.get(`${API_URL}`, (req, res) => {
    const userId = req.session.userId
    userService.getById(userId).then(user => {
      return user
    })
      .then((user) => {
        // Is user director? if so, query all tasks referring to his ID
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

  // Get task by id
  app.get(`${API_URL}/:taskId`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    console.log(taskId)
    userService.getById(userId)
      .then(user => {
        return user;
      }).then((user) => {
        if (!user) {
          res.send('No user!')
          return
        }
        taskService.getById(taskId)
          .then(task => {
            if (task.directorId === user.directorId || task.directorId === user._id) {
              res.json(task)
            }
            else {
              res.send('Not allowed!')
            }
          })
      })
  })

  // Post new task
  app.post(`${API_URL}`, (req, res) => {
    const task = req.body
    console.log(task)
    taskService.add(task)
      .then(task => {
        //TODO- SOCKET :)
        res.json(task);
      })
  })

  // Delete task
  app.delete(`${API_URL}/:taskId`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    taskService.getById(taskId)
      .then(task => {
        if (task.directorId === userId) {
          taskService.remove(taskId)
            .then(() => {
              res.status(200);
              res.send('Deleted ' + taskId);
            })
        }
        else {
          res.status(400);
          res.send('Not allowed!')
        }
      })
  })

}

module.exports = addTaskRoutes