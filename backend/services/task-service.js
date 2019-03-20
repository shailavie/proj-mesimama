const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function query(creatorId) {
    return mongoService.connect()
        .then(db => db.collection('tasks').find({ creatorId }).toArray())
}

module.exports = {
    query
}