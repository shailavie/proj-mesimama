const mongoService = require('./mongo-service.js')
const ObjectId = require('mongodb').ObjectId;

const USERS_COLLECTION = 'users';

function query(directorId) {
    directorId = String(directorId);
    const directorId_ObjectId = new ObjectId(directorId)
    console.log('OKKKK', directorId)
    return mongoService.connect()
        .then(db => db.collection(USERS_COLLECTION).find({ $or: [{ _id: directorId_ObjectId }, { directorId: directorId }] }).toArray())
}

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

function reward(userId, points) {
    console.log('***', userId)
    return new Promise((resolve, reject) => {
        getById(userId).then(user => {
            console.log('***', user)
            user.score += points
            update(user).then(resolve(user))
        })
    })
}

module.exports = {
    query,
    getById,
    update,
    reward
}