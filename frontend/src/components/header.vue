<template >
  <div class="wrapper" v-if="currUser">
    <div class="header-container">
      <div class="header-logo">Mesimama</div>
      <div class="main-nav">
        <nav>
          <span class="nav-item">
            <router-link to="/app/chat">
              <img src="@/assets/icons/chat.svg" class="nav-item-icon">
            </router-link>
          </span>
          <span class="nav-item item-tasks">
            <router-link to="/app/tasks">
              <img src="@/assets/icons/tasks.svg" class="nav-item-icon">
            </router-link>
          </span>
          <span class="nav-item">
            <router-link to="/app/notifications">
              <img src="@/assets/icons/notifications.svg" class="nav-item-icon">
              <span class="notifications-badge" v-if="counter>0">{{counter}}</span>
              <!-- <span class="notifications-badge" v-if="notificationsCount > 0">{{notificationsCount}}</span> -->
            </router-link>
          </span>
        </nav>
        <div class="current-user" v-if="currUser">
          <span class="nav-item user">
            <router-link to="/app/my-account">
              <user-avatar :url="avatarUrl"/>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from "@/components/user-avatar-cmp.vue";

export default {
  components: {
    userAvatar
  },
  data() {
    return {
      // user: null,
    };
  },
  created() {
    // this.user = this.$store.getters.currUser;
    // console.log('got here with user', this.user)
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    avatarUrl() {
      return this.currUser.avatarUrl;
    },
    counter() {
      return this.$store.getters.notificationCounter;
    }
  }
};
</script>

<style scoped lang="scss">
.user-msg {
  display: flex;
  align-items: center;
  align-self: center;
  margin-right: 10px;
}
</style>

