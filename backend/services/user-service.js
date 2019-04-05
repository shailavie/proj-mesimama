const mongoService = require('./mongo-service.js')
const ObjectId = require('mongodb').ObjectId;

const USERS_COLLECTION = 'users';


module.exports = {
    query,
    getById,
    update,
    reward,
    checkCred
}

async function checkCred(userCred) {
    console.log('got credentials from route', userCred)
    let db = await mongoService.connect()
    let user = await db.collection(USERS_COLLECTION).findOne({ email: userCred.email })
    if (user && user.password === userCred.password) {
        console.log('@@@@ BINGO @@@@ - CREDENTIALS ARE RIGHT!', user)
        return user
    } else if (user) {
        console.log("Credentials wrong");
        res.json({ data: "Login invalid" });
    } else {
        console.log('no such user, lets sign UP!')
        let newUser = _getEmptyUser(userCred)
        console.log('adding a user with an active first task', newUser)
        let addedUser = await _add(newUser)
        console.log("new user id", addedUser._id)
        console.log('typeof', typeof (addedUser._id))
        // let userId = addedUser._id.split('"')[1]
        // let userId = addedUser._id.str

        // console.log('moment of TRUTH', userId)
        addedUser.directorId = addedUser.email // placing a unique identifier bc couldn't retreive the id from objectid
        let firstTask = _getFirstTask(addedUser.directorId)
        addedUser.activeTasks.push(firstTask)
        let newUserWithTask = await update(addedUser)
        // console.log('got result from mongo', newUserWithTask)
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

function _getEmptyUser({ email, password }) {
    let userName = email.split('@')[0] || 'Puki';
    let newUser = {
        name: userName,
        relation: 'Mother',
        activeTasks: [],
        doneTasks: [],
        score: 0,
        email: email,
        password: password,
        isDirector: true,
        directorId: email,
        avatarUrl: null,
        notification: [],
        imgUrls: [],
        password: null
    }
    return newUser
}

function _getFirstTask(directorId) {
    let firstTask = {
        createdAt: Date.now(),
        desc: 'Add a description, and an image',
        dueAt: Date.now(),
        directorId: directorId,
        helperId: null,
        points: 1,
        status: 'active',
        title: 'This is an example task',
        isUrgent: true,
        comments: [],
        imgUrl: null
    }
    return firstTask
}




 
