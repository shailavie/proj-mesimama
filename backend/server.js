var express = require('express');
var app = express();
var server = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3003;

const addTaskRoutes = require('./routes/task-route')
const addUserRoutes = require('./routes/user-route')
addTaskRoutes(app)
addUserRoutes(app)



app.use(express.static('front'));
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {
    res.send('hello world')
})

//TODO: as soon as user connects, send him into a room with his ID.
//  you always know the Admin id, so when you need, send him the msg.

io.on('connection', socket => {
    console.log('socket connected! ')

    //USER CONNECTING
    socket.on('userConnected', userId => {
        socket.join(userId)
        io.emit('userIsConnected', userId);

        console.log('new user connected. id: ', userId)
    })
    //TASK WAS OWNED
    socket.on('owningTask', data => {
        //TODO- SEND ONLY TO MOTHER. send new ownder and task detailes.
        // socket.to('mom').emit('taskOwnedBy',data)
        // console.log(socket)
    })
    //TASK WAS ADDED
    socket.on('addedTask', data => {
        socket.broadcast('newTaskPublish')
    })
    //TASK WAS ACOMPLISHED
    socket.on('finishedTask', data => {
        //TODO- SEND ONLY TO MOTHER. send prev owner and task details.
        console.log(socket.id, '    socket ID')
        // socket.to('mom').emit('taskAcomplished',data)
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


