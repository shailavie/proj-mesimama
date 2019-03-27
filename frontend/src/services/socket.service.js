
import ioClient from 'socket.io-client'
import Vue from 'vue'
import store from '../stores/store.js'
import userService from '../services/user.service.js'
import utilService from '../services/util-service.js'

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api' : 'http://localhost:3003/api';

var socket = (process.env.NODE_ENV !== 'development')? ioClient(BASE_URL) : ioClient('//localhost:3003'); //TO DO - WON'T WORK ON HEROKU
// var socket = ioClient('http://localhost:3003');
// var socket = io('http://localhost');

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
		refreshTasks()
		refreshUserTasks()
		_toasting(`${user.name} took some responsibility `, 'success', 'Woohoo! This is great! thank you so much!! ')
	})
	//TASK WAS PASSED
	socket.on('publishPassedTask', task => {
		refreshTasks()
		refreshUserTasks()
		_toasting(`'${task.title}' task was passed!`, 'warn', 'Maybe give a hand?')
	})
	//TASK WAS UPDATED
	socket.on('publishUpdatedTask',task=>{
		refreshTasks()
		refreshUserTasks()
	})

	// TASK WAS DELETED . 
	socket.on('loadTasks', deleteRefreshCallBack)

	async function deleteRefreshCallBack() {
		await refreshUserTasks()
		await refreshTasks()
	}

	//NEW TASK ADDED
	socket.on('newTaskPublish', refreshCallback)

	async function refreshCallback() {
		await refreshTasks()
		await refreshUser()
		_toasting('New task was added!', 'success', 'Better go check it out!')
	}

	//TASK WAS ACOMPLISHED
	socket.on('taskAcomplished', acomplishedCallBack)

	async function acomplishedCallBack() {
		await refreshTasks()
		await refreshUser()
		await refreshGroup()
		await refreshUserTasks()
		_toasting('Someone acomplished a task!', 'success', 'Mom will be so happy!')
	}

	socket.on('publishUrgent', task => {
		_toasting('Urgent task alert!', 'error', 'See if you can help out')
	})
}


function refreshTasks() {
	return store.dispatch({ type: "loadActiveTasks" })

}
function refreshUser() {
	return store.dispatch({ type: 'setCurrUser' })
}

function refreshGroup() {
	return store.dispatch({ type: 'loadGroup' })
}
function refreshUserTasks() {
	return store.dispatch({ type: "loadUsersWithTasks" });
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
