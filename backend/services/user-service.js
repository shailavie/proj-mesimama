const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

function getById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection('users').findOne({ _id }))
}

module.exports = {
    getById
}