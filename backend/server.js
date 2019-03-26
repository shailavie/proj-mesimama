var express = require('express');
var app = express();
var server = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3003;

// Routes
const addTaskRoutes = require('./routes/task-route')
const addUserRoutes = require('./routes/user-route')

// Define static resources src
app.use(express.static('front'));
// CORS
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
// Parsers
app.use(bodyParser.json())
app.use(cookieParser());
// Sessions config
app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 604800000 }
}))

// Temp index route (will be serving the frontend)
app.get('/', (req, res) => {
    res.send('hello world')
})

addTaskRoutes(app)
addUserRoutes(app)


//TODO: as soon as user connects, send him into a room with his ID.
// you always know the Admin id, so when you need, send him the msg.
io.on('connection', socket => {
    console.log('socket connected! ', socket.id)
    //USER CONNECTING
    socket.on('userConnected', userId => {
        socket.join(userId)
        io.emit('userIsConnected', userId);
        console.log('new user connected. id: ', userId)
    })

    //TASK WAS OWNED
    socket.on('owningTask', user => {
        io.emit('taskOwnedBy', user)
    })
    //TASK WAS PASSED
    socket.on('taskPassed', obj => {
        let task = obj.task
        let notification = obj.notification
        io.emit('publishPassedTask', task)
        io.emit('updateUserNotifications', notification)
    })

    //TASK WAS ADDED- send to everyone but mom
    socket.on('addedTask', (newTask) => {
        //toast for users about new task
        socket.broadcast.emit('newTaskPublish',newTask)
    })

    //TASK WAS ACOMPLISHED
    socket.on('finishedTask', data => {
        //TODO- SEND TO EVERYONE- send user data and task
        io.emit('taskAcomplished', data)
    })
    socket.on('urgentTask', task => {
        socket.broadcast.emit('publishUrgent', task)
        let notification = {
            name: `${task.title} was made urgent, see if you can help!`,
            isRead: false,
            createdAt: Date.now()

        }
        socket.broadcast.emit('updateUserNotifications', notification)

    })
    socket.on('reloadTasks', data => {
        socket.broadcast.emit('loadTasks')
    })

    socket.on('login', userId => {
        socket.userId = userId
    })

    socket.on('emitOnlyToMom', something => {
        var momId = something.momId
        var msgToMom = something.msgToMom

    })

    socket.on('post-msg', msg => {
        // socket.to - send to everyone in the room except the sender
        io.emit('msg-recived', msg);
        // socket.to(socket.theTopic).emit('msg-recived', msg);

        //BOT OPTION
        // setInterval(()=>{
        // 	socket.emit('msg-recived', {txt: 'Ammmmm LOL'});
        // }, 1500)
    });
});

server.listen(PORT, () => console.log(`app listening on port ${PORT}`))


