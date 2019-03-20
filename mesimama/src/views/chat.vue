<template>
  <section class="chat">
    <router-link :to="'chat/'+currUser.id">{{currUser.name}}</router-link>room:
    <form class="conversation-compose">
      <input
        v-model="newMsg.txt"
        class="input-msg"
        name="input"
        placeholder="Type a message"
        autocomplete="off"
        autofocus
      >
      {{newMsg}}
      <button @click.prevent="send" class="send">send</button>
    </form>

      <div v-for="(msg,idx) in msgs" :key="idx" :class="msgClass(msg)">{{msg.from}}: {{msg.txt}}</div>

  </section>
</template>


<script>
import socketService from "../services/socket.service.js";
import userService from "../services/user.service.js";
export default {
  data() {
    return {
      newUser: null,
      currUser: {
        id: "mom",
        name: "mom"
      },
      newMsg: null,
      msgs: null
    };
  },
  methods: {
    send() {
      socketService.send(this.newMsg);
      this.newMsg = socketService.createEmptyMsg("", this.newUser);
    },
    msgClass(msg) {
      return msg.from !== this.newUser ? "received" : "sent";
    }
  },
  computed: {},
  created() {
    //   socketService.emit('userConnected',this.newUser)//NEW USER WILL BE FROM THE STORE AS CURR USER
    socketService.init();
    this.newUser = userService.lorem();
    this.newMsg = socketService.createEmptyMsg("", this.newUser);
    this.msgs = socketService.getMsgs();
    socketService.emit("userConnected", this.newUser);
  }
};
</script>
<style scoped>
.received{
	background-color: lightblue;
	float: left;
	margin-bottom: 5px;
		display: flex;
	flex-direction: column;
}
.sent{
	background-color: lightcoral;
	float: right;
	margin-bottom: 5px;
	display: flex;
	flex-direction: column;

}
</style>