const userService = require('../services/user-service.js')
const BASE_URL = '/api/users'

function addUserRoutes(app) {

    // Check credentials for user name (signup/login)
    app.post(`${BASE_URL}/add/helper`, (req, res) => {
        let newHelper = req.body
        userService.addHelper(newHelper)
            .then(user => {
                if(user) res.json(user)
            })
    }) 

    // Check credentials for user name (signup/login)
    app.post(`${BASE_URL}/checkCred/:userName`, (req, res) => {
        let userCred = req.body
        userService.checkCred(userCred)
            .then(user => {
                if(user) res.json(user)
            })
    }) 


    // Get all team members
    app.get(`${BASE_URL}`, (req, res) => {
        if (!req.session.userId) {
            res.status(403)
            res.send('No user logged')
        } else {
            userService.getById(req.session.userId).then(user => {
                let directorId = (user.isDirector) ? user._id : user.directorId
                userService.query(directorId)
                    .then(users => {
                        res.json(users)
                    })
            })
        }
    })

    // Get all team members
    app.get(`${BASE_URL}/loadIntroGroup/:directorId`, (req, res) => {
        let directorId = req.params.directorId
        userService.query(directorId)
            .then(users => {
                res.json(users)
            })
    })

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

    //  // Set current session user
    //  app.post(`${BASE_URL}/signup`, (req, res) => {
    //     req.session.userId = req.body.userId;
    //     res.send(req.session.userId)
    // })

    // Set current session user
    app.post(`${BASE_URL}/setuser`, (req, res) => {
        req.session.userId = req.body.userId;
        res.send(req.session.userId)
    })

    // Update user
    app.put(`${BASE_URL}`, (req, res) => {
        const user = req.body
        userService.update(user)
            .then(() => res.json(user))
    })

}

module.exports = addUserRoutes;