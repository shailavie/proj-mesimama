const userService = require('../services/user-service.js')

const BASE_URL = '/api/users'

function addUserRoutes(app) {

    // Get current logged user
    app.get(`${BASE_URL}/current`, (req, res) => {
        userService.getById(req.session.userId)
            .then(user => {
                res.json(user)
            })
    })

    // Get user by ID
    app.get(`${BASE_URL}/:userId`, (req, res) => {
        userService.getById(req.params.userId)
            .then(user => {
                res.json(user)
            })
    })

    // Set current session user
    app.post(`${BASE_URL}/setuser`, (req, res) => {
        // console.log('setting:', req.body.userId)
        req.session.userId = req.body.userId;
        console.log(req.session.userId)
        res.send(req.session.userId)
    })
    
}

module.exports = addUserRoutes;