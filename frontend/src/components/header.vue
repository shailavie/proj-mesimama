<template >
  <div class="wrapper" v-if="currUser">
    <div class="header-container">
      <div class="logo-container">
        <div class="header-logo">Mesimama</div>
      </div>
      <div class="main-nav">
        <!-- qa -->
        <div class="login">
          <el-select
            v-model="role"
            placeholder="Select role"
            class="login-page-el-input"
            @change="setRole"
          >
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
          <!-- <span class="nav-item">
            <router-link to="/app/chat">
              <img src="@/assets/icons/chat.svg" class="nav-item-icon">
              <span class="nav-item-text-link">Chat</span>
            </router-link>
          </span>-->
          <span class="nav-item item-tasks">
            <router-link to="/app/tasks">
              <img src="@/assets/icons/tasks.svg" class="nav-item-icon">
              <span class="nav-item-text-link">Tasks</span>
            </router-link>
          </span>
          <span class="nav-item item-rewards">
            <router-link to="/app/rewards">
              <img src="@/assets/icons/trophy.svg" class="nav-item-icon">
              <span class="nav-item-text-link">Rewards</span>
            </router-link>
          </span>
          <span class="nav-item">
            <router-link to="/app/notifications">
              <div style="position:relative;">
                <img src="@/assets/icons/notifications.svg" class="nav-item-icon">
                <span class="notifications-badge" v-if="counter>0">{{counter}}</span>
              </div>
              <span class="nav-item-text-link">News</span>
              <!-- <span class="notifications-badge" v-if="notificationsCount > 0">{{notificationsCount}}</span> -->
            </router-link>
          </span>
        </nav>
        <div class="current-user" v-if="currUser">
          <span class="nav-item user">
            <!-- <router-link to="/app/user-profile"> -->
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
import userService from "@/services/user.service.js";

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

    setRole() {
      userService
        .setUserSession(this.role)
        .then(res => {
          console.log("Session is ", res);
        })
        .then(() => {
          this.$store.dispatch({ type: "setCurrUser" }).then(() => {
            console.log("User switched! :)");
          });
        });
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
  position: fixed;
  right: 0;
  bottom: 0;
}

@media (max-width: 768px) {
  .login {
    display: none;
  }
}
.login-page-el-input {
  background: #fff;
  color: #333;
}

.login-page-el-input .el-input__inner {
  color: #333;
}
.user-msg {
  display: flex;
  align-items: center;
  align-self: center;
  margin-right: 10px;
}
.add-new-task {
  margin-right: 1em;
  color: #666;
}
.logo-container {
  display: flex;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-item {
    width: 100px;
    border-radius: 15px;
    transition: 0.3s;
  }
  @media (min-width: 768px) {
    .nav-item:hover {
      background: #f4f4f4;
    }
  }

  .nav-item.user {
    width: fit-content;
    margin-left: 1em;
  }

  @media (max-width: 768px) {
    .nav-item.user {
      margin: 0;
    }
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

    .item-rewards {
      order: -1;
    }
  }
}
</style>

