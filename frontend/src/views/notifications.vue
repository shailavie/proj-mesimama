



<template>
  <section v-if="user">
    <h1>Hello {{user.name}}, welcome to your notifications</h1>
    <ul>
    <li        v-for="(notification,idx) in user.notifications"
      :key="idx"
      :class="isRead(notification)">{{notification.name}} - {{notification.createdAt | moment("from", "now")}}</li>

    </ul>
  </section>
</template>

<script>
import userService from "../services/user.service.js";
import utilService from "../services/util-service.js";

export default {
  data() {
    return {
      notifications: null,
    };
  },
  created() {
    setTimeout(() => {
      this.user.notifications.forEach(notification => {
        notification.isRead = true;
      });
      let user = this.user;
      this.$store.dispatch({ type: "updateUser", user });
    }, 10000);
  },
  methods: {
    isRead(notification) {
      return notification.isRead ? "read" : "unRead";
    }
  },
  computed: {
      user(){
      return this.$store.getters.currUser;
      }

  },
  beforeDestroy:{}
};
</script>

<style scoped  >
.unRead {
  font-weight: bold;
}
li{
  list-style: circle
}
</style>




