const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function query(directorId) {
    let _id = new ObjectId(directorId)
    return mongoService.connect()
        .then(db => db.collection('tasks').find({ directorId}).toArray())
}

module.exports = {
    query
}