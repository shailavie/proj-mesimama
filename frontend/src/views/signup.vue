<template>
  <section class="login-container" v-if="canLoad">
    <div class="header-container wrapper">
      <div class="logo-container flex center-ver">
        <img class="logo" src="@/assets/icons/mesimama.png" alt>
        <div class="header-title">Mesimama</div>
      </div>
      <router-link to="/">
        <span>See Demo</span>
      </router-link>
    </div>
    <div class="flex column center-all mb30">
      <h1>{{userMsg}}</h1>
      <h4 v-if="helper">{{directorNameToShow}} has invited you to join Mesimama</h4>
      <h4 v-if="isSignUp">
        Have we met already?
        <span @click="isSignUp=false">Log in</span>
      </h4>
      <h4 v-else>
        New around here?
        <span @click="isSignUp=true">Sign up</span>
      </h4>
    </div>
    <div v-if="!inProcess" class="signup-form-container">
      <el-form
        class="signup-form"
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-position="top"
        label-width="120px"
        @submit.prevent="signUp()"
      >
        <el-form-item
          class="signup-form-item"
          prop="email"
          label="Email"
          :rules="[
      { required: true, message: 'Enter your email address', trigger: 'blur' },
      { type: 'email', message: 'Please enter a correct email address', trigger: ['blur'] }
    ]"
        >
          <el-input v-model="dynamicValidateForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item
         v-if="!helper"
          prop="password"
          label="Password"
          :rules="[
      { required: true, message: 'Enter a password', trigger: 'blur' },
      { type: 'email', message: 'Please enter a password', trigger: ['blur'] }
    ]"
        >
          <el-input v-model="dynamicValidateForm.password" type="password" clearable></el-input>
        </el-form-item>
        <button
          type="submit"
          class="signup-login-btn"
          @click.prevent="signUp"
        >{{isSignUp? 'Sign up' : 'Log in'}}</button>
      </el-form>
    </div>
    <div v-else class="loader">Loading...</div>
  </section>
</template>

<script>
import userService from "../services/user.service.js";

export default {
  data() {
    return {
      helper: null,
      director: null,
      canLoad: false,
      inProcess: false,
      isSignUp: true,
      dynamicValidateForm: {
        email: "",
        password: ""
      }
    };
  },
  async created() {
    let helperId = this.$route.params.helperId;
    console.log("signup got id from route", helperId);
    if (helperId) {
      this.helper = await userService.getUserById(helperId);
      this.director = await userService.getUserById(this.helper.directorId);
      console.log("got user from helper id:", this.helper);
      this.dynamicValidateForm.email = this.helper.email;
      this.dynamicValidateForm.password = "";
      this.isSignUp = false;
      this.canLoad = true;
    } else {
      this.canLoad = true;
    }
  },
  methods: {
    login(id) {
      console.log("SIGNUP GOT ID and setting session", id);
      userService
        .setUserSession(id)
        .then(res => {
          console.log("Session is ", res);
        })
        .then(() => {
          this.$store.dispatch({ type: "setCurrUser" }).then(() => {
            setTimeout(() => {
              this.$router.push("/app/tasks");
            }, 2000);
          });
        });
    },
    async signUp() {
      if (this.helper) {
        this.login(this.helper._id)
      } else {
        let userCred = this.dynamicValidateForm;
        let user = await this.$store.dispatch({ type: "signUp", userCred });
        console.log("huston do we have a user?", user);
        this.login(user._id);
      }
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
    }
  },
  computed: {
    userMsg() {
      return this.helper ? `Hey ${this.helper.name}!` : "Welcome to Mesimama!";
    },
    directorNameToShow(){
      return this.director.name.replace('.',' ')
    }
  }
};
</script>


<style lang="scss" scoped>
span {
  text-decoration: underline;
  color: white;
  cursor: pointer;
}
.signup-login-btn {
  width: 40%;
  height: 20%;
  background-color: #67c23a;
  border-radius: 8px;
  border: none;
  color: white;
  margin: 20px auto;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
}
.signup-form {
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.972);
  padding: 40px;
  border-radius: 16px;
  min-width: 400px;
  width: 30%;
}
.signup-form-container {
  height: 90vh;
  color: white;
  display: flex;
  flex-direction: column;
}
.header-title {
  color: white;
  user-select: none;
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

// .login {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   color: #fff;
//   flex-direction: column;
//   min-height: 100vh;
//   padding: 40px 0;
//   text-align: center;
// }
// a {
//   cursor: pointer;
// }

h1 {
  font-size: 250%;
  font-weight: 500;
  margin: 30px auto;
  color: white;
}
h4 {
  color: white;
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

