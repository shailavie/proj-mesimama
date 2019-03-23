import util from './util-service.js'
import Axios from "axios";

var axios = Axios.create({
    withCredentials: true
});
export default {
    query,
    addTask,
    updateTask,
    ownTask,
    passTask,
    getEmptyTask,
    getTaskById,
    removeTask
}

// const taskDB = [{ _id: "lnCZV0rTlr", helperId: null, title: "DUMMY DATA", desc: "Pretty urgent, I got Materna only until evening time", type: "Over-night", createdAt: 1552823374720, dueAt: 1553255768929, status: "active", points: 4 }, { _id: "9EshTVz1J1", helperId: null, title: "Cleaning the house", desc: "Could use an extra hand, or babysitting", type: "Piece of cake", createdAt: 1552842231310, dueAt: 1553222682861, status: "active", points: 2 }, { _id: "oubKveMScs", helperId: null, title: "Babysitting", desc: "Shlomi is having a long day at the office", type: "Groceries", createdAt: 1552995424183, dueAt: 1553071520529, status: "pendingPass", points: 5 }, { _id: "JqIx0c6vNC", helperId: null, title: "Pilates", desc: "There's a class on Tuesday and I would really like to attend", type: "Over-night", createdAt: 1553066872237, dueAt: 1553328315229, status: "done", points: 1 }, { _id: "73wMKLgfwQ", helperId: null, title: "Bachelorette party", desc: "Sharon is getting married and ther's no way i'd miss her party.", type: "Time off", createdAt: 1552850321831, dueAt: 1553128479876, status: "active", points: 1 }, { _id: "27Hq7KUBZm", helperId: null, title: "Baby massage workshop", desc: "I signed up for that workshop and can use an extra hand", type: "Time off", createdAt: 1552992096547, dueAt: 1553253782470, status: "active", points: 0 }]
const BASE_URL = 'http://localhost:3003/api'

function query() {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/tasks`)
            .then(res => {
                let resDB = res.data
                resolve(resDB)
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

// /api/tasks/own/:taskId
// /api/tasks/pass/:taskId


function ownTask(taskId){
    console.log('OWNING IT!')
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/tasks/own/${taskId}`)
            .then((res) => {
                let ownedTask = res.data
                resolve(ownedTask)
            })
    })
}
function passTask(taskId){
    console.log('OWNING IT!')
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/tasks/pass/${taskId}`)
            .then((res) => {
                let ownedTask = res.data
                resolve(ownedTask)
            })
    })
}
 

function getEmptyTask(directorId) {
    let emptyTask = {
        createdAt: null,
        desc: '',
        dueAt: null,
        directorId: directorId,
        helperId: null,
        points: 1,
        status: 'active',
        title: '',
        isUrgent: false,
    }
    return emptyTask
}