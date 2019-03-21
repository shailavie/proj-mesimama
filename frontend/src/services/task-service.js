import util from './util-service.js'

export default {
    query,
    setTaskHelper,
    clearTaskHelper
}

const taskDB = [{ _id: "lnCZV0rTlr", helperId: null, title: "Pharma shopping", desc: "Pretty urgent, I got Materna only until evening time", type: "Over-night", createdAt: 1552823374720, dueAt: 1553255768929, status: "active", points: 4 }, { _id: "9EshTVz1J1", helperId: null, title: "Cleaning the house", desc: "Could use an extra hand, or babysitting", type: "Piece of cake", createdAt: 1552842231310, dueAt: 1553222682861, status: "active", points: 2 }, { _id: "oubKveMScs", helperId: null, title: "Babysitting", desc: "Shlomi is having a long day at the office", type: "Groceries", createdAt: 1552995424183, dueAt: 1553071520529, status: "pendingPass", points: 5 }, { _id: "JqIx0c6vNC", helperId: null, title: "Pilates", desc: "There's a class on Tuesday and I would really like to attend", type: "Over-night", createdAt: 1553066872237, dueAt: 1553328315229, status: "done", points: 1 }, { _id: "73wMKLgfwQ", helperId: null, title: "Bachelorette party", desc: "Sharon is getting married and ther's no way i'd miss her party.", type: "Time off", createdAt: 1552850321831, dueAt: 1553128479876, status: "active", points: 1 }, { _id: "27Hq7KUBZm", helperId: null, title: "Baby massage workshop", desc: "I signed up for that workshop and can use an extra hand", type: "Time off", createdAt: 1552992096547, dueAt: 1553253782470, status: "active", points: 0 }]

function query() {
    return new Promise((resolve, reject) => {
        let dummyData = taskDB.filter(task => task.helperId === null) //TODO filter by creator ID
        resolve(dummyData)
    })
}

function setTaskHelper(taskId, userId) {
    console.log('insider service!')
    let idx = findIdxById(taskId)
    taskDB[idx].helperId = userId
    console.log(taskDB[idx], 'is changed')
    return Promise.resolve(taskDB)
}
function clearTaskHelper(taskId) {
    console.log('insider service!')
    let idx = findIdxById(taskId)
    taskDB[idx].helperId = null
    console.log(taskDB[idx], 'is cleared')
    return Promise.resolve(taskDB)
}

function findIdxById(id) {
    return taskDB.findIndex(task => task._id === id)
}