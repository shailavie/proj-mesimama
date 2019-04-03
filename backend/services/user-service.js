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

async function checkCred(userCred){
    console.log('got credentials from route',userCred)
    let db = await mongoService.connect()
    let user = await db.collection(USERS_COLLECTION).findOne({email : userCred.email})
    if (user) {
        console.log('FOUND A USER WITH THE NAME', user)
        //TO DO - ADD Passwords for all relevant users and check password after finding the user
        return user
    } else {
        console.log('no such user, lets sign UP!')
        let newUser = _getEmptyUser(userName)
        let addedUser = await _add(newUser)
        addedUser.directorId = addedUser._id
        console.log('got result from mongo', addedUser)
        return addedUser
    }
}

// async function login(userName){
//     let db = await mongoService.connect()
//     let user = await db.collection('users').findOne({ username: req.body.username}, function(err, user) {
//         console.log('User found ');
//         // In case the user not found   
//         if(err) {
//           console.log('THIS IS ERROR RESPONSE')
//           res.json(err)
//         } 
//         if (user && user.password === req.body.password){
//           console.log('User and password is correct')
//           res.json(user);
//         } else {
//           console.log("Credentials wrong");
//           res.json({data: "Login invalid"});
//         }              
//     });
// }





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

function _getEmptyUser(userName){
    let newUser =  {
        name: userName,
        relation: 'Mother',
        activeTasks:[],
        doneTasks:[],
        score:0,
        email: userName,
        isDirector: true,
        directorId: null,
        avatarUrl: null,
        notification: [],
        imgUrls: [],
        password: null
    }
    return newUser
}