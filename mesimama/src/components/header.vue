<template>
  <div class="wrapper">
    <div class="header-container">
      <div class="header-logo">Mesimama</div>
      <span class="nav-item user">
        <router-link to="/app/my-account">
          <img src="@/assets/icons/user.svg" class="nav-item-icon">
        </router-link>
      </span>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    notificationsCount() {
      return this.$store.getters.notificationsCount;
    }
  }
};
</script>


