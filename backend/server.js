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
    cookie: { secure: false }
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
    console.log('socket connected! ')

    //USER CONNECTING
    socket.on('userConnected', userId => {
        socket.join(userId)
        io.emit('userIsConnected', userId);
        console.log('new user connected. id: ', userId)
    })

    //TASK WAS OWNED
    socket.on('owningTask', (taskId,user) => {
        //TODO send new owner and task detailes.
        socket.broadcast.emit('taskOwnedBy',user)
        // console.log(socket)
    })

    //TASK WAS ADDED- send to everyone but mom
    socket.on('addedTask', task => {
        console.log('at server with task: ',task)
        socket.broadcast.emit('newTaskPublish',task)
    })

    //TASK WAS ACOMPLISHED
    socket.on('finishedTask', data => {
        //TODO- SEND TO EVERYONE- send user data and task
        console.log(socket.id, '    socket ID')
       io.emit('taskAcomplished',data)
    })

    socket.on('login', userId => {
        socket.userId = userId
    })

    socket.on('emitOnlyToMom', something => {
        var momId = something.momId
        var msgToMom = something.msgToMom

    })

    socket.on('post-msg', msg => {
        // console.log('POsting a message', msg, 'to:', socket.theTopic);
        console.log('POsting a message', msg);
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


