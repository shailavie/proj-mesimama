
import ioClient from 'socket.io-client'
var socket = ioClient('http://localhost:3004');
// var socket = {}

// AFTER MERGE, IMPORT UTIL AND USER THE ID MAKER THERE!
// import utils from './util.service.js';
import storgeService from './storage.service.js';


const msgs = []

export default {
	// user, 
	msgs,
	send,
	on,
	emit,
	createEmptyMsg,
	getMsgs
}


function getMsgs(){
    return msgs
}

function createEmptyMsg(txt = '',nickName) {
    return { txt, processed: false, from: nickName };
}


connectSocket()

function connectSocket(){

	socket.on('userIsConnected', user => {
		console.log('user conncted :', user);
	})
	//NEW MSG RECIVED
	socket.on('msg-recived', msg => {
		console.log('Got new msg', msg);
		msgs.push(msg);
	})
	// TASK WAS OWNED
	socket.on('taskOwnedBy',data =>{
		console.log('the task was owned! task:  helper: ')
	})
	//NEW TASK ADDED
	socket.on('newTaskPublish',data=>{
		console.log('new task was published! ')
	})
	//TASK WAS ACOMPLISHED
	socket.on('taskAcomplished',data =>{
		console.log('task was acomplished!!!')
	})

}

function send(msg){
	socket.emit('post-msg', msg)
}
function emit(eventName, data){
	console.log('eventName: ',eventName, ' data: ', data)
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}




function _getUser() {
    var user = storgeService.load('user');
	if (!user) {
		user = {
			nickName: prompt('first time. what is your name?'),
			id: makeid(6)
		};
		storgeService.store('user', user);
	}
	return user;
}

//REMOVE AFTER MERGE
function makeid(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }