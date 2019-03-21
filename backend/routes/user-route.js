const taskService = require('../services/user-service.js')

const API_URL = '/api/users'

function addUserRoutes(app) {

    app.get(`${API_URL}/:userId`, (req, res) => {
        taskService.getById(req.params.userId)
            .then(user => {
                res.json(user)
            })
    })
}

module.exports = addUserRoutes;