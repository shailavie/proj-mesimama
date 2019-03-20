var express = require('express');
var app = express();
var server = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const addTaskRoutes = require('./routes/task-route')
addTaskRoutes(app)

const PORT = process.env.PORT || 3000;

var io = require('socket.io')(server);

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

io.on('connection', socket => {
    socket.on('userConnected', data => {
        io.emit('userIsConnected', data);
        console.log('data is:', data)
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

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))


