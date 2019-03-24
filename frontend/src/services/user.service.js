import Axios from "axios";

var axios = Axios.create({
  withCredentials: true
});

export default {
    getCurrUser,
    updateUser,
    getUserById
}


const BASE_URL ='http://localhost:3003/api'


function getCurrUser(){
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
        axios.put(`${BASE_URL}/users`,user)
            .then(res => {
                let updatedUser = res.data
                resolve(updatedUser)
            })
    })
}

function getUserById(userId){
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users/${userId}`)
            .then(res => {
                let user = res.data
                 resolve(user)
            })
    })
}

