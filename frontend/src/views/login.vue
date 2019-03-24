<template>
  <section class="login">
    <div class="login-page-container">
      <div class="login-box-container">
        <div class="login-upper-box">
          <h1>
            Assist. Collaborate.
            <br>Get it done.
          </h1>
          <span style="color:#999">
            Role play the Netanyahus.
            <br>Simulate the amazing relationship between Sara and Yair,
            <br>As they try to dodge their father's bullets.
            <br>Super fun guaranteed!
          </span>
        </div>
        <div class="login-middle-box"></div>
        <div class="login-bottom-box">
          <!-- <h2>{{loginSignupCTA}}</h2> -->
          <!-- <span class="is-member-call">{{loginSignupMsg}}</span>
          <a @click="isMember=!isMember">{{loginSignupSwitch}}</a> -->
          <!-- <button class="login-btn login-btn--facebook">{{loginSignupCTA}} with Facebook</button> -->
          <div class="login-form">
            <!-- <el-input
            placeholder="Enter your email address"
            type="email"
            autofocus
            prefix-icon="el-icon-message"
            v-model="input.email"
            class="input-email"
          ></el-input>
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="Select a password"
            v-model="input.password"
            show-password
          ></el-input>
            <el-button type="primary" class="sign-up-btn">{{loginSignupCTA}}</el-button>-->
            <div class="qa-box" v-if="currUser">
              <div style="margin-bottom:5px">
                <user-avatar  :url="currUser.avatarUrl"/>
                Logged as: {{currUser.name}}
              </div>
              <el-select v-model="role" placeholder="Select role">
                <el-option value="5c93538ced3d88a4b25d83ad">Helper</el-option>
                <el-option value="5c93538ced3d88a4b25d83ac">Director</el-option>
              </el-select>
              <el-button @click="setRole" style="margin-left:5px">Set Role</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="login-banner-container"></div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
import userAvatar from "@/components/user-avatar-cmp.vue";

var axios = Axios.create({
  withCredentials: true
});

export default {
  components: {
    userAvatar
  },
  data() {
    return {
      role: "",
      input: {
        password: "",
        email: ""
      },
      isMember: true
    };
  },
  computed: {
    loginSignupCTA() {
      return !this.isMember ? "Log in" : "Sign up";
    },
    loginSignupSwitch() {
      return !this.isMember ? "Sign up" : "Log in";
    },
    loginSignupMsg() {
      return this.isMember ? "Already a member? " : "New to Mesimama? ";
    },
    currUser() {
      return this.$store.getters.currUser;
    }
  },
  methods: {
    async setRole() {
      let test = await axios.post("http://localhost:3003/api/users/setuser", {
        userId: this.role
      });
      this.$store.dispatch({ type: "setCurrUser" });
    },
    async printSession() {
      let test = await axios.get("http://localhost:3003/api/users/current");
      console.log(test.data);
    }
  }
};
</script>


<style lang="scss" scoped>
a {
  cursor: pointer;
}
.el-input__inner {
  background-color: transparent !important;
}

h1 {
  font-size: 250%;
  font-weight: 500;
  margin-bottom: 40px;
}
.login-page-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
}
.login-banner-container {
  background-position: center center;
  background-image: url("../../public/img/login-banner.jpg");
  background-size: cover;
  flex-basis: 60%;
}
.login-box-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 30px;
  background: #1c1735;
  color: #fff;
  flex-grow: 1;
}

.is-member-call {
  color: #999;
}
.login-form {
  margin-top: 10px;
}

.input-email {
  margin-bottom: 5px;
}
.sign-up-btn {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .login-page-container {
    flex-direction: column;
  }
  .login-banner-container {
    order: -1;
    flex-basis: 200px;
  }
}
</style>

