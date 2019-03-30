<template>
  <section class="login-container">
    <div class="wrapper">
      <div class="login">
        <h1>Welcome to the Family.</h1>
        <!-- <h5>v1</h5> -->
        <section class="users-container">
          <div v-for="user in demoUsers" :key="user._id" class="user-avatar-container">
            <div class @click.prevent="setRole(user._id)">
              <user-avatar
                :url="user.avatarUrl"
                :user="user"
                :profileImg="true"
                :clickable="false"
              />
              <h4 class="mbt30">{{user.name}}</h4>
            </div>
          </div>
        </section>

        <button class="demo-btn" @click="enterDemo">Enter Demo</button>
        <h4>Clicking "Enter Demo" will allow "Mesimama" to send you push notifications</h4>
      </div>
    </div>
  </section>
</template>

<script>
import userAvatar from "@/components/user-avatar-cmp.vue";
import userService from "../services/user.service.js";

export default {
  components: {
    userAvatar
  },
  data() {
    return {
      notificationsSupported: false,
      role: "",
      input: {
        password: "",
        email: ""
      },
      isMember: true,
      test: null
    };
  },
  created() {
    this.$store.dispatch("loadGroup");
    if ("Notification" in window && "serviceWorker" in navigator) {
      this.notificationsSupported = true;
    }
  },
  computed: {
    loginSignupCTA() {
      return !this.isMember ? "Log in" : "SIGN UP";
    },
    loginSignupSwitch() {
      return !this.isMember ? "Sign up" : "Log in";
    },
    loginSignupMsg() {
      return this.isMember ? "Already a member? " : "New to Mesimama? ";
    },
    demoUsers() {
      return this.$store.getters.currGroup.filter(
        user =>
          user.name === "Tamar" ||
          user.name === "Ruti" ||
          user.name === "Yonatan"
      );
    }
  },
  methods: {
    askPermission() {
      if (this.notificationsSupported) {
        Notification.requestPermission(result => {
          console.log("result from permission question", result);
          if (result !== "granted") {
            alert("You probably do not like notifications?!");
          } else {
            console.log(
              "A notification will be send from the service worker => This only works in production"
            );
            // this.showNotification();
          }
        });
      }
    },
    setRole(id) {
      userService
        .setUserSession(id)
        .then(res => {
          console.log("Session is ", res);
        })
        .then(() => {
          this.$store.dispatch({ type: "setCurrUser" }).then(() => {
            this.$router.push("/app/tasks");
          });
        });
    },
    async enterDemo() {
      await this.askPermission();
      this.setRole("5c98fa5eb687d600001a8d83");
    }
  }
};
</script>


<style lang="scss" scoped>
.login-container {
  background: linear-gradient(45deg, #296bbb 1%, #1e88e5 64%, #279ad4 97%);
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 0;
  text-align: center;
}
a {
  cursor: pointer;
}

h1 {
  font-size: 250%;
  font-weight: 500;
  margin-bottom: 40px;
}
.login-page-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
}
.login-banner-container {
  background-position: center center;
  background-image: url("../../public/img/login-banner.jpg");
  background-size: cover;
  flex-basis: 66%;
}
.login-box-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 30px 60px 5%;
  background: #1c1735;
  color: #fff;
  flex-grow: 1;
}

.demo-btn {
  width: 350px;
  height: 100px;
  border: 2px solid white;
  background-color: transparent;
  border-radius: 10px;
  font-size: 24px;
  color: white;
  margin: 40px;
  cursor: pointer;
  transition: 0.1s linear;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.choose-user {
  margin-top: 60px;
  display: flex;
  width: 500px;
  justify-content: space-between;
}
@media (max-width: 550px) {
  .choose-user {
    flex-direction: column;
  }
  .user-box {
    margin-bottom: 30px;
  }
  .demo-btn {
    width: auto;
    padding: 0 40px;
  }
  h1,
  h4 {
    text-align: center;
    margin: 20px auto;
  }
}

.login-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin-bottom: 10px;
}

.users-container {
  display: flex;
  width: 60%;
  justify-content: space-evenly;
}

@media (max-width: 700px) {
  .users-container {
    flex-direction: column;
    max-width: fit-content;
  }
}

.user-avatar-container {
  text-align: center;
}
</style>

