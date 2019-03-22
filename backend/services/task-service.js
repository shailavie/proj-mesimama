const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function query(directorId) {
    let _id = new ObjectId(directorId)
    return mongoService.connect()
        .then(db => db.collection('tasks').find({ directorId }).toArray())
}

function getById(taskId) {
    let _id = new ObjectId(taskId)
    return mongoService.connect()
        .then(db => db.collection('tasks').findOne({ _id }))
}

function add(task) {
    return mongoService.connect()
        .then(db => db.collection('tasks').insertOne(task))
        .then(res => {
            return getById(res.insertedId)
        })
}

function remove(taskId) {
    let _id = new ObjectId(taskId)
    return mongoService.connect()
        .then(db => db.collection('tasks').remove({ _id }))
}

function update(task) {
    let _id = new ObjectId(task._id)
    if (task['_id']) delete task['_id'];
    console.log(task)
    return mongoService.connect()
        .then(db => db.collection('tasks').replaceOne({ _id }, task))
}

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}