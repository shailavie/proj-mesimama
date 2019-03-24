const mongoService = require('./mongo-service.js')
const ObjectId = require('mongodb').ObjectId;

const USERS_COLLECTION = 'users';

function getById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection(USERS_COLLECTION).findOne({ _id }))
}

function update(user) {
    let _id = new ObjectId(user._id)
    delete user['_id'];
    return mongoService.connect()
        .then(db => db.collection('users').replaceOne({ _id }, user))
}

module.exports = {
    getById,
    update
}