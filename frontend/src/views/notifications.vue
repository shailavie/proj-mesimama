



<template>
  <section v-if="user">
    <h1>Hello {{user.name}}!</h1>
    <br>
    <ul>
      <li
        v-for="(notification,idx) in user.notifications"
        :key="idx"
        :class="isRead(notification)"
      >{{notification.name}} - {{notification.createdAt | moment("from", "now")}}</li>
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
  list-style: circle;
}
</style>




