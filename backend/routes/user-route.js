const userService = require('../services/user-service.js')

const API_URL = '/api/users'

function addUserRoutes(app) {

    app.get(`${API_URL}/current`, (req, res) => {
        userService.getById(req.session.userId)
            .then(user => {
                res.json(user)
            })
    })

    app.get(`${API_URL}/:userId`, (req, res) => {
        userService.getById(req.params.userId)
            .then(user => {
                res.json(user)
            })
    })

    app.post(`${API_URL}/setuser`, (req, res) => {
        // console.log('setting:', req.body.userId)
        req.session.userId = req.body.userId;
        console.log(req.session.userId)
        res.send(req.session.userId)
    })
}

module.exports = addUserRoutes;