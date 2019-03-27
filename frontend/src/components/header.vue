<template >
  <div class="wrapper" v-if="currUser">
    <div class="header-container">
      <div class="logo-container">
        <div class="header-logo">Mesimama</div>
      </div>
      <div class="main-nav">
        <!-- qa -->
        <div class="login">
          <el-select v-model="role" placeholder="Select role" class="login-page-el-input" @change="setRole">
            <el-option value="5c93538ced3d88a4b25d83ad">Helper</el-option>
            <el-option value="5c93538ced3d88a4b25d83ac">Director</el-option>
            <el-option value="5c98fa5eb687d600001a8d83">Tamar</el-option>
            <el-option value="5c98fb581c9d4400002a2a3d">Ruti</el-option>
            <el-option value="5c98fad51c9d4400002a2a3c">Yonatan</el-option>
          </el-select>
        </div>

        <el-button
          class="add-new-task"
          v-if="currUser.isDirector"
          @click.native="addTask"
        >+ New Task</el-button>

        <!-- Navbar -->
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
            <!-- <router-link to="/app/my-account"> -->
            <user-avatar :url="avatarUrl" :userId="currUser._id"/>
            <!-- </router-link> -->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from "@/components/user-avatar-cmp.vue";
import Axios from "axios";

var axios = Axios.create({
  withCredentials: true
});

export default {
  components: {
    userAvatar
  },
  data() {
    return {
      // user: null,
      role: ""
    };
  },
  created() {
    // this.user = this.$store.getters.currUser;
    // console.log('got here with user', this.user)
  },
  methods: {
    addTask() {
      this.$router.push("/app/edit");
    },
    async setRole() {
      let test = await axios.post("http://localhost:3003/api/users/setuser", {
        userId: this.role
      });
      this.$store.dispatch({ type: "setCurrUser" });
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
.login {
  margin: 0 20px;
}
.user-msg {
  display: flex;
  align-items: center;
  align-self: center;
  margin-right: 10px;
}
.add-new-task {
  margin-right: 2.2em;
  color: #666;
}
.logo-container {
  display: flex;
}

.main-nav {
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-item {
    margin-right: 1.6em;
  }

  span.nav-item.user {
    margin-right: 0;
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
}
</style>

