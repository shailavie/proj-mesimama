import utilService from './util-service.js'
const CLOUDINARY_URL="cloudinary://757281885482997:B2hh29N3yu87rNqW4ssH75mTxt8@dgvsdobz4"

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
    markDone,
    addCommentTo
}

// const BASE_URL = 'http://localhost:3003/api'
const BASE_URL = (process.env.NODE_ENV !== 'development')? '/api' : 'http://localhost:3003/api';

function query() {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/tasks`)
            .then(res => {
                let activeTasks = res.data
                resolve(activeTasks)
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
function addCommentTo(task) {
    console.log('UPADTED TASK IS', task)
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/tasks/${task._id}/addComment`, task)
            .then(res => {
                let taskWithNewComment = res.data
                resolve(taskWithNewComment)
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
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_URL}/tasks/${taskId}/own`)
            .then((res) => {
                let ownedTask = res.data
                resolve(ownedTask)
            })
    })
}
function passTask(taskId) {
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
        imgUrl:null
    }
    return emptyTask
}
function getEmptyComment() {
    let emptyComment = {
        _id: null,
        userId: null,
        txt: '',
        createdAt: null,
    }
    return emptyComment
}


