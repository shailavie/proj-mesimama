const taskService = require('../services/task-service.js')
const userService = require('../services/user-service.js')

//IMG UPLOAD
// const cloudinary = require('cloudinary');
// cloudinary.config({ 
//   cloud_name: 'sample', 
//   api_key: '559498588269355', 
//   api_secret: 'qC9KnAVCWrIpNKFtR3w5QM43Gc8' 
// });
// const CLOUDINARY_URL="cloudinary://757281885482997:B2hh29N3yu87rNqW4ssH75mTxt8@dgvsdobz4"

const BASE_URL = '/api/tasks'

function addTaskRoutes(app) {



  // Get all tasks for the user
  app.get(`${BASE_URL}`, (req, res) => {
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
  app.get(`${BASE_URL}/:taskId`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    userService.getById(userId)
      .then(user => {
        return user;
      }).then((user) => {
        if (!user) {
          res.status(400)
          res.send('No user!')
          return
        }
        taskService.getById(taskId)
          .then(task => {
            if (task.directorId === user.directorId || task.directorId === user._id) {
              res.json(task)
            }
            else {
              res.status(403)
              res.send('Not allowed!')
            }
          })
      })
  })

  // Post new task
  app.post(`${BASE_URL}`, (req, res) => {
    const task = req.body
    taskService.add(task)
      .then(task => {
        res.json(task);
      })
  })

  // Delete task
  app.delete(`${BASE_URL}/:taskId`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    taskService.getById(taskId)
      .then(task => {
        if (task.directorId === userId) {
          taskService.remove(taskId)
            .then(() => {
              res.status(200);
              res.send('Deleted ' + taskId)
            })
        }
        else {
          res.status(403);
          res.send('Not allowed!')
        }
      })
  })

  // Update task
  app.put(`${BASE_URL}`, (req, res) => {
    const userId = req.session.userId
    const task = req.body
    if (userId === task.directorId) {
      taskService.update(task)
        .then(() => res.json(task))
    }
  })

  //Add a comment to Task (open to all registered users)
  app.put(`${BASE_URL}/:taskId/addComment`, (req, res) => {
    // const userId = req.session.userId
    const taskId = req.params.taskId
    const task = req.body
    console.log('GOT TO BACKEND! task id:', taskId, 'userID')
    console.log('GOT task with new comment:', task.comments)
    taskService.addCommentTo(task)
      .then(task => {
        res.json(task)
      })
  })

  //Own Task
  app.put(`${BASE_URL}/:taskId/own`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    taskService.getById(taskId)
      .then(task => {
        userService.getById(userId)
          .then(user => {
            if (task.directorId === user.directorId) {
              task.helperId = userId
              taskService.update(task).then(task => {
                res.json(task)
              })
            }
          })
      })
  })

  // Pass a task
  app.put(`${BASE_URL}/:taskId/pass`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    taskService.getById(taskId)
      .then(task => {
        userService.getById(userId)
          .then(user => {
            if (task.directorId === user.directorId && task.helperId === userId) {
              task.helperId = null
              taskService.update(task).then(task => {
                res.json(task)
              })
            }
          })
      })
  })

  // Mark task as done
  app.put(`${BASE_URL}/:taskId/done`, (req, res) => {
    const userId = req.session.userId
    const taskId = req.params.taskId
    taskService.getById(taskId)
      .then(task => {
        if (task.status === 'active' && task.helperId) {
          if (task.helperId === userId || task.directorId === userId) {
            task.status = 'done'
            taskService.update(task).then(() => {
              userService.reward(userId, task.points).then(() => {
                res.status(200)
                res.json(task)
              })
            })
          } else {
            res.status(403)
            res.send('Not allowed!')
          }
        } else {
          res.status(403)
          res.send('Not valid')
        }
      })
  })
}

module.exports = addTaskRoutes