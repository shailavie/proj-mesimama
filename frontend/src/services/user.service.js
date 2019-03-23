import Axios from "axios";

var axios = Axios.create({
  withCredentials: true
});

export default {
    getCurrUser,
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
function getUserById(userId){
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users/${userId}`)
            .then(res => {
                let user = res.data
                 resolve(user)
            })
    })
}
