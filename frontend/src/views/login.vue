<template>
  <section class="login">
    <div class="login-page-container">
      <div class="login-box-container">
        <div class="login-upper-box">
          <h1>
            Assist. Collaborate.
            <br>Get it done.
          </h1>
          <!-- <h2 class="cta">{{loginSignupCTA}}</h2> -->
          <span class="is-member-call">{{loginSignupMsg}}</span>
          <a @click="isMember=!isMember">{{loginSignupSwitch}}</a>
          <!-- <button class="login-btn login-btn--facebook">{{loginSignupCTA}} with Facebook</button> -->
          <div class="login-form">
            <el-input
              placeholder="Enter your email address"
              type="email"
              autofocus
              prefix-icon="el-icon-message"
              v-model="input.email"
              class="login-page-el-input"
            ></el-input>
            <el-button type="primary" class="sign-up-btn">{{loginSignupCTA}}</el-button>
          </div>
        </div>
        <div class="login-middle-box"></div>
        <div class="login-bottom-box">
          <div>
            <div class="qa-box">
              <div style="margin-bottom:5px">
                <div class="curr-user-info" v-if="currUser">
                  <user-avatar :url="currUser.avatarUrl"/>
                  <div style="margin-bottom: 10px">Logged as: {{currUser.name}}</div>
                </div>
              </div>
              <el-select v-model="role" placeholder="Select role" class="login-page-el-input">
                <el-option value="5c93538ced3d88a4b25d83ad">Helper</el-option>
                <el-option value="5c93538ced3d88a4b25d83ac">Director</el-option>
                <el-option value="5c98fa5eb687d600001a8d83">Tamar</el-option>
                <el-option value="5c98fb581c9d4400002a2a3d">Ruti</el-option>
                <el-option value="5c98fad51c9d4400002a2a3c">Yonatan</el-option>
              </el-select>
              <el-button @click="setRole" class="set-role-btn">Set Role</el-button>
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
      isMember: true,
      test: null
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
    },
    async getTeam() {
      let users = await axios.get("http://localhost:3003/api/users");
      this.test = users.data;
    }
  }
};
</script>


<style lang="scss" scoped>
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
  height: 100vh;
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

.is-member-call {
  color: #999;
}
.login-form {
  margin-top: 10px;
  max-width: 300px;
}

.sign-up-btn {
  margin-top: 10px;
  width: 100%;
}

.cta {
  font-weight: 500;
  opacity: 0.9;
}

.set-role-btn {
  margin-left: 5px;
  background: transparent;
  color: #fff;
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

