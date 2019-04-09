const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;

const TASKS_COLLECTION = 'tasks';

function query(directorId) {
    return mongoService.connect()
        .then(db => db.collection(TASKS_COLLECTION).find({ directorId }).toArray())
}

function getById(taskId) {
    let _id = new ObjectId(taskId)
    return mongoService.connect()
        .then(db => db.collection(TASKS_COLLECTION).findOne({ _id }))
} 

function add(task) {
    return mongoService.connect()
        .then(db => db.collection(TASKS_COLLECTION).insertOne(task))
        .then(res => {
            return getById(res.insertedId)
        })
}

function remove(taskId) {
    let _id = new ObjectId(taskId)
    return mongoService.connect()
        .then(db => db.collection(TASKS_COLLECTION).remove({ _id }))
}

function update(task) {
    let _id = new ObjectId(task._id)
    delete task['_id'];
    return mongoService.connect()
        .then(db => db.collection(TASKS_COLLECTION).replaceOne({ _id }, task))
}

function addCommentTo(task) {
    let _id = new ObjectId(task._id)
    delete task['_id'];
    return mongoService.connect()
        .then(db => db.collection(TASKS_COLLECTION).replaceOne({ _id }, task))
}

module.exports = {
    query,
    getById,
    add,
    remove,
    update,
    addCommentTo
}