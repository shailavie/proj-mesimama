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

module.exports = {
    query,
    getById,
    add
}