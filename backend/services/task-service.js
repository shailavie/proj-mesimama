const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function query(directorId) {
    return mongoService.connect()
        .then(db => db.collection('tasks').find({ directorId }).toArray())
}

module.exports = {
    query
}