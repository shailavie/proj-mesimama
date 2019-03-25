<template >
  <div class="wrapper" v-if="currUser">
    <div class="header-container">
      <div class="container">
        <div class="header-logo">Mesimama</div>
      </div>
      <div class="main-nav">
        <el-button class="add-new-task" @click.native="addTask">+ New Task</el-button>
        <nav>
          <span class="nav-item">
            <router-link to="/app/chat">
              <img src="@/assets/icons/chat.svg" class="nav-item-icon">
              <span class="nav-item-text-link">Chat</span>
            </router-link>
          </span>
          <span class="nav-item item-tasks">
            <router-link to="/app/tasks">
              <img src="@/assets/icons/tasks.svg" class="nav-item-icon">
              <span class="nav-item-text-link">Tasks</span>
            </router-link>
          </span>
          <span class="nav-item">
            <router-link to="/app/rewards">
              <img src="@/assets/icons/trophy.svg" class="nav-item-icon">
              <span class="nav-item-text-link">Rewards</span>

              <span class="notifications-badge">{{score}}</span>
            </router-link>
          </span>
          <span class="nav-item">
            <router-link to="/app/notifications">
              <img src="@/assets/icons/notifications.svg" class="nav-item-icon">
              <span class="nav-item-text-link">News</span>
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
  methods: {
    addTask() {
      this.$router.push("/app/edit");
    }
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
    },
    score() {
      return this.$store.getters.currUser.score;
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
.add-new-task {
  margin-right: 1.6em;
  color: #666;
}
.container {
  display: flex;
}

.nav-item {
  margin-right: 1.6em;
}

.nav-item-text-link {
  color: #666;
  font-size: 0.8em;
  margin-left: 0.3em;
}

@media (max-width: 768px) {
  .nav-item {
    margin-right: 0;
  }
  .nav-item-text-link {
    display: none;
  }
}
</style>

