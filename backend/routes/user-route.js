const taskService = require('../services/user-service.js')

const API_URL = '/api/users'

function addUserRoutes(app) {

    app.get(`${API_URL}/:userId`, (req, res) => {
        taskService.getById(req.params.userId)
            .then(user => {
                res.json(user)
            })
    })

    app.post(`${API_URL}/setuser`, (req, res) => {
        req.session.userId = req.body.userId;
        res.send(req.session.userId)
    })
}

module.exports = addUserRoutes;