var express = require('express');
var app = express();
var server = require('http').Server(app)


var io = require('socket.io')(server);
server.listen(port)

app.use(express.static('front'));

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


