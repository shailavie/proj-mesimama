
import ioClient from 'socket.io-client'
import Vue from 'vue'
import store from '../stores/store.js'

var socket = ioClient('//localhost:3003');

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
		Vue.notify({
			group: 'foo',
			classes:'vue-notification',
			title: 'say hello',
			text: `new user connected: ${user}`
		})
	})
	//NEW MSG RECIVED
	socket.on('msg-recived', msg => {
		console.log('Got new msg', msg);
		msgs.push(msg);
	})
	// TASK WAS OWNED
	socket.on('taskOwnedBy', user => {
		Vue.notify({
			group: 'foo',
			title: `${user.name} took some responsibility `,
			// type: 'success',
			classes:'vue-notification',
			text: 'Woohoo! This is great! thank you so much!! ',
		})
		console.log('the task was owned! task:  helper: ')
	})
	//NEW TASK ADDED
	socket.on('newTaskPublish', data => {
		console.log('before notification at socket service ',data)
		console.log(store)
		store.dispatch({ type: "loadActiveTasks" }).then(()=>{console.log('FETCHING!!!')})
		Vue.notify({
			group: 'foo',
			title: 'A new task was added! ',
			// type: 'success',
			classes:'vue-notification',
			text: `Better go check it out! `
		})
	})
	//TASK WAS ACOMPLISHED
	socket.on('taskAcomplished', data => {
		console.log('task was acomplished!!!')
		Vue.notify({
			group: 'foo',
			title: 'Someone acomplished a task!',
			type: 'success',
			classes:'vue-notification',
			text: `Mom will be so happy! `
		})
	})

	socket.on('publishUrgent',task =>{
		Vue.notify({
			group: 'foo',
			title: 'Urgent task alert!',
			type: 'error',
			classes:'vue-notification',
			text: `See if you can help out `
		})
	})

}

function send(msg) {
	socket.emit('post-msg', msg)
}
function emit(eventName, data) {
	console.log('eventName: ', eventName, ' data: ', data)
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