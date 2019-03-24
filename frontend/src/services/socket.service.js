
import ioClient from 'socket.io-client'
import Vue from 'vue'
import store from '../stores/store.js'
import userService from '../services/user.service.js'
import utilService from '../services/util-service.js'

var socket = ioClient('//localhost:3003');

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

function getMsgs() {
	return msgs
}

function createEmptyMsg(txt = '', nickName) {
	return { txt, processed: false, from: nickName };
}

connectSocket()

function connectSocket() {

	socket.on('userIsConnected', user => {
		console.log('user conncted :', user);
		_toasting(`${user.name} just connected!  `, 'success', 'Dont forget to say hello')
	})
	//NEW MSG RECIVED
	socket.on('msg-recived', msg => {
		msgs.push(msg);
	})
	// TASK WAS OWNED
	socket.on('taskOwnedBy', user => {
		refresh()
		_toasting(`${user.name} took some responsibility `, 'success', 'Woohoo! This is great! thank you so much!! ')
	})
	//TASK WAS PASSED
	socket.on('publishPassedTask', task => {
		refresh()
		_toasting(`'${task.title}' task was passed!`, 'warn', 'Maybe give a hand?')
		
	})

	// ON DELETE TASK. DONT SEND TOAST, JUST REFRESH THE DATA FOR USERS.
	socket.on('loadTasks', refresh)

	//NEW TASK ADDED
	socket.on('newTaskPublish', refreshCallback)

	async function refreshCallback() {
		await refresh()
		_toasting('New task was added!', 'success', 'Better go check it out!')
	}

	//TASK WAS ACOMPLISHED
	socket.on('taskAcomplished', data => {
		_toasting('Someone acomplished a task!', 'success', 'Mom will be so happy!')
	})

	socket.on('publishUrgent', task => {
		_toasting('Urgent task alert!', 'error', 'See if you can help out')
	})
	socket.on('updateUserNotifications',(notification) =>{
	let user =utilService.deepCopy(store.getters.currUser) 
	user.notifications.unshift(notification)
	console.log('user :', user.name)
	store.dispatch({type:'updateUser', user})
	})
}

function refresh() {
	return store.dispatch({ type: "loadActiveTasks" })
}

function send(msg) {
	socket.emit('post-msg', msg)
}
function emit(eventName, data) {
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}

function _toasting(title = 'default title', type = 'success', text = 'dafault text') {
	Vue.notify({
		group: 'foo',
		title: title,
		type: type,
		classes: 'vue-notification',
		text: text
	})
}
