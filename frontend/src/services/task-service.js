import utilService from './util-service.js'
import Axios from "axios";

var axios = Axios.create({
    withCredentials: true
});
export default {
    query,
    addTask,
    updateTask,
    removeTask,
    ownTask,
    passTask,
    getEmptyTask,
    getTaskById,
    getEmptyComment,
    markDone
}

const BASE_URL = 'http://localhost:3003/api'

function query() {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/tasks`)
            .then(res => {
                let taskItems = res.data
                resolve(taskItems)
            })
    })
}
function addTask(task) {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/tasks`, task)
            .then(res => {
                let addedTask = res.data
                resolve(addedTask)
            })
    })
}
function updateTask(task) {
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/tasks`, task)
            .then(res => {
                let addedTask = res.data
                resolve(addedTask)
            })
    })
}
function markDone(task){
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/tasks/${task._id}/done`)
            .then(res => {
                let updatedTask = res.data
                resolve(updatedTask)
            })
    })
}
function removeTask(taskId) {
    return new Promise((resolve, reject) => {
        axios.delete(`${BASE_URL}/tasks/${taskId}`)
            .then(() => {
                console.log('task deleted from DB')
                resolve()
            })
    })
}
function getTaskById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/tasks/${id}`)
            .then(res => {
                let task = res.data
                resolve(task)
            })
    })
}
function ownTask(taskId) {
    console.log('OWNING IT!')
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/tasks/${taskId}/own`)
            .then((res) => {
                let ownedTask = res.data
                resolve(ownedTask)
            })
    })
}
function passTask(taskId) {
    console.log('PASSING IT!')
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/tasks/${taskId}/pass`)
            .then((res) => {
                let ownedTask = res.data
                resolve(ownedTask)
            })
    })
}
function getEmptyTask() {
    let emptyTask = {
        createdAt: null,
        desc: '',
        dueAt: null,
        directorId: null,
        helperId: null,
        points: 1,
        status: 'active',
        title: '',
        isUrgent: false,
        comments: [],
    }
    return emptyTask
}
function getEmptyComment(userId) {
    let emptyComment = {
        _id: null,
        userId: userId,
        txt: '',
        createdAt: null,
    }
    return emptyComment
}