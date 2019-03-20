
// export default {
//     getRandomIntInclusive,
//     getRandomId,
//     createDummyData,
//     getJsonData
// }

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
// }

// function getRandomId(len = 10) {
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     let id = ''
//     for (let i = 0; i < len; i++) {
//         let idx = getRandomIntInclusive(0, possible.length - 1)
//         id += possible[idx]
//     }
//     return id
// }


// function _createTasksJson(tasksContent) {
//     return tasksContent.map(task => {
//         return _createTask(task)
//     })
// }

// function _createTask(task) {
//     //Below function randomize between now and N days interval
//     let daysInt = 3;
//     let randomDate = getRandomIntInclusive(Date.now() - 1000 * 60 * 60 * 24 * daysInt, Date.now())
//     let randomDueDate = getRandomIntInclusive(Date.now(), Date.now() + 1000 * 60 * 60 * 24 * daysInt)
//     return {
//         "_id": getRandomId(),
//         "title": task.title,
//         "desc": task.desc,
//         "type": _getRandomType(),
//         "createdAt": randomDate,
//         "dueAt": randomDueDate,
//         "status": (Math.random() > 0.15) ? 'active' : 'done',
//         "points": getRandomIntInclusive(0, 5)
//     }
// }



// function _getRandomType() {
//     const types = ['Piece of cake', 'Over-night', 'Time off', 'Extra hand', 'Groceries']
//     var idx = getRandomIntInclusive(0, types.length - 1)
//     return types[idx]
// }


// // var tasks = _createTasksJson()



// function createDummyData() { 
//     var tasksContent = [
//         { "title": "Pharma shopping", "desc": "Pretty urgent, I got Materna only until evening time" },
//         { "title": "Cleaning the house", "desc": "Could use an extra hand, or babysitting" },
//         { "title": "Babysitting", "desc": "Shlomi is having a long day at the office" },
//         { "title": "Pilates", "desc": "There\'s a class on Tuesday and I would really like to attend" },
//         { "title": "Bachelorette party", "desc": "Sharon is getting married and ther's no way i\'d miss her party." },
//         { "title": "Baby massage workshop", "desc": "I signed up for that workshop and can use an extra hand" },
//     ]
//     var tasksJson = _createTasksJson(tasksContent);
//     return  tasksJson
// }

// function getJsonData(){
//     const jsonData = [{_id:"lnCZV0rTlr",title:"Pharma shopping",desc:"Pretty urgent, I got Materna only until evening time",type:"Over-night",createdAt:1552823374720,dueAt:1553255768929,status:"active",points:4},{_id:"9EshTVz1J1",title:"Cleaning the house",desc:"Could use an extra hand, or babysitting",type:"Piece of cake",createdAt:1552842231310,dueAt:1553222682861,status:"active",points:2},{_id:"oubKveMScs",title:"Babysitting",desc:"Shlomi is having a long day at the office",type:"Groceries",createdAt:1552995424183,dueAt:1553071520529,status:"active",points:5},{_id:"JqIx0c6vNC",title:"Pilates",desc:"There's a class on Tuesday and I would really like to attend",type:"Over-night",createdAt:1553066872237,dueAt:1553328315229,status:"active",points:1},{_id:"73wMKLgfwQ",title:"Bachelorette party",desc:"Sharon is getting married and ther's no way i'd miss her party.",type:"Time off",createdAt:1552850321831,dueAt:1553128479876,status:"active",points:1},{_id:"27Hq7KUBZm",title:"Baby massage workshop",desc:"I signed up for that workshop and can use an extra hand",type:"Time off",createdAt:1552992096547,dueAt:1553253782470,status:"active",points:0}]
//     return jsonData
// }