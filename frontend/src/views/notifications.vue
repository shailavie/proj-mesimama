



<template>
  <section v-if="user">
    <h1>Hello {{user.name}}!</h1>
    <br>
    <ul>
      <li
        v-for="(notification,idx) in user.notifications"
        :key="idx"
        :class="isRead(notification)"
      >
      <div class="notification-card" >
        {{notification.name}} <br>
        was  {{notification.status}}<br>
        ( {{notification.createdAt | moment("from", "now")}}    )
      <button @click="taskDetails(notification.taskId)" >See Task </button>   
        </div>  </li>
    </ul>
  </section>
</template>

<script>
import userService from "../services/user.service.js";
import utilService from "../services/util-service.js";

export default {
  data() {
    return {
      notifications: null
    };
  },
  created() {
  },
  methods: {
    taskDetails(taskId){
      console.log(taskId)
      this.$router.push(`/app/details/${taskId}`)
    },
    isRead(notification) {
      return notification.isRead ? "read" : "unRead";
    }
  },
  computed: {
    user() {
      return this.$store.getters.currUser;
    }
  },
  beforeDestroy() {
    this.$store.dispatch({ type: "updateUserNotifications" });
  }
};
</script>

<style scoped  >
.unRead {
  font-weight: bold;
}
li {
  list-style: none;
}
li:nth-child(even){
  background-color: #CCC;
}
li:nth-child(odd){
  background-color: #FFF;
}
.notification-card{
  font-size: 24px;
  padding: 15px;
}
button{
  cursor: pointer;
}
</style>




