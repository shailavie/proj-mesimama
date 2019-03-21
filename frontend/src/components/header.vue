<template>
  <div class="wrapper">
    <div class="header-container">
      <div class="header-logo">Mesimama</div>
      <nav>
        <span class="nav-item notifications">
          <router-link to="/app/notifications">
            <img src="@/assets/icons/notifications.svg" class="nav-item-icon">
            <span class="notifications-badge" v-if="notificationsCount > 0">{{notificationsCount}}</span>
          </router-link>
        </span>
        <span class="nav-item tasks">
          <router-link to="/app/tasks">
            <img src="@/assets/icons/tasks.svg" class="nav-item-icon">
          </router-link>
        </span>
        <span class="nav-item chat">
          <router-link to="/app/chat">
            <img src="@/assets/icons/chat.svg" class="nav-item-icon">
          </router-link>
        </span>
      </nav>
      <div class="user-msg">
        <span>
         {{userMsg}}
        </span>
        <span class="nav-item user">
          <router-link to="/app/my-account">
            <img class="user-avatar" :src="avatarSrc">
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = this.$store.getters.currUser;
  },
  computed: {
    notificationsCount() {
      return this.$store.getters.notificationsCount;
    },
    avatarSrc() {
      return this.user.imgSrc;
    },
    userMsg() {
      return `Hello ${this.user.name}`;
    }
  }
};
</script>

<style scoped lang="scss">
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-left: 10px;
}
.user-msg {
  display: flex;
  align-items: center;
}
 
</style>

