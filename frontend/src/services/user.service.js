import Axios from "axios";

var axios = Axios.create({
    withCredentials: true
});

export default {
    getCurrUser,
    updateUser,
    setUserSession,
    getUserById,
    getUsers,
    updateGroupNotifications,
    getIntroUsers,
    checkCred,
    addHelper
}

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api' : 'http://localhost:3003/api';

function addHelper(newHelper) {
    console.log('got new helper', newHelper)
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/users/add/helper`, newHelper)
            .then(res => {
                let user = res.data
                console.log('Got helper from database:', user)
                resolve(user)
            })
            .catch(err => console.log('got issues adding new helper:',err))
    })
}

function checkCred(userCred) {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/users/checkCred/${userCred.email}`, userCred)
            .then(res => {
                let user = res.data
                console.log('Got user from database:', user)
                resolve(user)
            })
    })
}

function getCurrUser() {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users/current`)
            .then(res => {
                let user = res.data
                resolve(user)
            })
    })
}


//Update user
function updateUser(user) {
    return new Promise((resolve, reject) => {
        console.log('got to update user')
        axios.put(`${BASE_URL}/users`, user)
            .then(res => {
                let updatedUser = res.data
                resolve(updatedUser)
            })
    })
}

function getUserById(userId) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users/${userId}`)
            .then(res => {
                let user = res.data
                resolve(user)
            })
    })
}

// Set user session programatically
function setUserSession(userId) {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/users/setuser`, {
            userId
        }).then(res => resolve(res.data))
    })
}

//Get all the group users for the podium

function getUsers() {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users`)
            .then(res => {
                let users = res.data
                resolve(users)
            })
    })
}
function getIntroUsers(directorId) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users/loadIntroGroup/${directorId}`)
            .then(res => {
                let users = res.data
                resolve(users)
            })
    })
}


//update user notifications 
function updateGroupNotifications(group, notification) {
    var promises = []
    group.forEach((user) => {
        if (!user.isDirector) {
            let notifs = user.notifications
            if (user.name === 'Yonatan') console.log(user.notifications)
            if (notifs.length > 9) {
                notifs.pop()
                notifs.unshift(notification)
            } else notifs.unshift(notification)
            user.notifications = notifs
            promises.push(
                updateUser(user)
                    .then((res) => {
                    })
            )
        }
    })
    return Promise.all(promises)
        .then((res) => {
            return
        })
}

