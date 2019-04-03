<template>
  <section class="login-container">
    <div class="header-container">
      <div class="logo-container flex center-ver">
        <img class="logo" src="@/assets/icons/mesimama.png" alt>
        <div class="header-title">Mesimama</div>
      </div>
    </div>
    {{dynamicValidateForm}}
    <el-form
      style="width:500px; backgroundColor:white;"
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="120px"
      class="demo-dynamic"
      @submit.prevent="printCredentials()"
    >
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
      { required: true, message: 'Enter your email address', trigger: 'blur' },
      { type: 'email', message: 'Please enter a correct email address', trigger: ['blur'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="Password"
        :rules="[
      { required: true, message: 'Enter a password', trigger: 'blur' },
      { type: 'email', message: 'Please enter a password', trigger: ['blur'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.password" type="password"></el-input>
      </el-form-item>
      <button type="submit" @click.prevent="printCredentials">Sign-up</button>
    </el-form>
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
      dynamicValidateForm: {
        email: "",
        password: ""
      }
    };
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
      return this.$store.getters.introGroup;
    }
  },
  methods: {
    login(id) {
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
    async printCredentials(){
      console.log('in signup page',this.dynamicValidateForm)
      let userCred = this.dynamicValidateForm
      let user = await this.$store.dispatch({type: 'signUp', userCred})
      console.log('FULL CIRCLE', user)
      this.login(user._id)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    created() {
      this.$store.dispatch({
        type: "loadIntroGroup",
        directorId: "5c98fa5eb687d600001a8d83"
      });
      if ("Notification" in window && "serviceWorker" in navigator) {
        this.notificationsSupported = true;
      }
    },
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
.header-title {
  color: white;
}
.header-container {
  padding: 30px;
}
.logo-container {
  display: flex;
}
.logo {
  height: 50px;
  width: auto;
  margin-right: -15px;
  margin-left: -30px;
}
.intro-logo {
  height: 100px;
  margin-bottom: 20px;
}
.login-container {
  background: linear-gradient(45deg, #296bbb 1%, #1e88e5 64%, #279ad4 97%);
}
.login {
  display: flex;
  justify-content: space-between;
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
  font-size: 300%;
  font-weight: 500;
  margin-bottom: 80px;
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
  flex-wrap: wrap;
  width: 90%;
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

