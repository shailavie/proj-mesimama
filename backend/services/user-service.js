const mongoService = require('./mongo-service.js')
const ObjectId = require('mongodb').ObjectId;
const USERS_COLLECTION = 'users';
const taskService = require( './task-service');


module.exports = {
    query,
    getById,
    update,
    reward,
    checkCred
}

async function checkCred(userCred) {
    let db = await mongoService.connect()
    let user = await db.collection(USERS_COLLECTION).findOne({ email: userCred.email })
    if (user && user.password === userCred.password) {
        return user
    } else if (user) {
        console.log("Credentials wrong");
        res.json({ data: "Login invalid" });
    } else {
        let newUser = _getEmptyUser(userCred)
        let addedUser = await _add(newUser)
        let userId = JSON.parse(JSON.stringify(addedUser._id))
        addedUser.directorId = userId  
        let firstTask = _getFirstTask(addedUser.directorId)
        let newUserWithTask = await _addFirstTask(addedUser, firstTask)
        return newUserWithTask
    }
}

function _add(user) {
    return mongoService.connect()
        .then(db => db.collection(USERS_COLLECTION).insertOne(user))
        .then(res => {
            return getById(res.insertedId)
        })
}

function query(directorId) {
    directorId = String(directorId);
    const directorId_ObjectId = new ObjectId(directorId)
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
    return new Promise((resolve, reject) => {
        getById(userId).then(user => {
            user.score += points
            update(user).then(resolve(user))
        })
    })
}

function _addFirstTask(user, task) {
    return new Promise((resolve, reject) => {
        getById(user._id).then(user => {
            user.activeTasks.push(task)
            user.directorId = JSON.parse(JSON.stringify(user._id ))
            taskService.add(task)
            update(user).then(resolve(user))
        })
    })
}

function _getEmptyUser({ email, password }) {
    let userName = email.split('@')[0] || 'Puki';
    let newUser = {
        name: userName,
        relation: 'Mother',
        activeTasks: [],
        doneTasks: [],
        score: 1,
        email: email,
        password: password,
        isDirector: true,
        directorId: null,
        avatarUrl: 'https://imageog.flaticon.com/icons/png/512/36/36481.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF',
        notification: [],
        imgUrls: [],
    }
    return newUser
}

function _getFirstTask(directorId) {
    let firstTask = {
        createdAt: Date.now(),
        desc: 'Add family and friends to your circle',
        dueAt: Date.now(),
        directorId: directorId,
        helperId: directorId,
        points: 1,
        status: 'active',
        title: 'Let\'s get things done!',
        isUrgent: false,
        comments: [],
        imgUrl: 'https://i.ytimg.com/vi/yd0cTU7rkI4/maxresdefault.jpg',
    }
    return firstTask
}





