


<template>
  <section class="login">
    <div class="container">
      <div class="login-dialog-container">
        <div class="input-container">
          <img src="@/assets/icons/bear_64.png">
          <h2>{{loginSignupCTA}}</h2>
          <h4>
            {{loginSignupMsg}}
            <a @click="isMember=!isMember">{{loginSignupSwitch}}</a>
          </h4>
          <button class="login-btn login-btn--facebook">{{loginSignupCTA}} with Facebook</button>
            <el-input
              placeholder="Enter your email address"
              type="email"
              autofocus
              prefix-icon="el-icon-message"
              v-model="input.email"
            ></el-input>
          <div class="password-input">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="Select a password"
              v-model="input.password"
              show-password
            ></el-input>
            <img class="lock-icon" src="@/assets/icons/password_16.png" alt>
          </div>
          <el-button type="primary">{{loginSignupCTA}}</el-button>
        </div>
      </div>
    </div>

    <div class="qa-box">
      <el-select v-model="role">
        <el-option value="5c93538ced3d88a4b25d83ad">Helper</el-option>
        <el-option value="5c93538ced3d88a4b25d83ac">Director</el-option>
      </el-select>
      <el-button @click="setRole">Set Role</el-button>
      <el-button @click="printSession">Print session</el-button>
    </div>
  </section>
</template>

<script>
import Axios from "axios";

var axios = Axios.create({
  withCredentials: true
});

export default {
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
      return this.isMember ? "Already a member?" : "New to Mesimama?";
    }
  },
  methods: {
    async setRole() {
      let test = await axios.post("http://localhost:3003/api/users/setuser", {
        userId: this.role
      });
    },
    async printSession() {
      let test = await axios.get("http://localhost:3003/api/users/current");
      console.log(test.data);
    }
  }
};
</script>


<style lang="scss" scoped>
.password-input {
  position: relative;
  // background-color: red;
  margin: 10px 0;
}
.lock-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translate(0, -50%);
  opacity: 0.5;
}
.login-dialog-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 420px;
  background-color: whitesmoke;
  border-radius: 4px;
  margin: 0 auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.container {
  margin: 10px auto;
  text-align: center;
}
.el-input {
  box-sizing: border-box;

  &:focus {
    border: 2px solid lightblue;
  }
}
.input-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

//fb button

.login-btn {
  box-sizing: border-box;
  position: relative;
  padding: 0 15px 0 46px;
  margin: 0 0 20px 10px;
  border: none;
  width: 232px;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
}
.login-btn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.login-btn:focus {
  outline: none;
}
.login-btn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Facebook */
.login-btn--facebook {
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  text-shadow: 0 -1px 0 #354c8c;
}
.login-btn--facebook:before {
  border-right: #364e92 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
    6px 6px no-repeat;
}
.login-btn--facebook:hover,
.login-btn--facebook:focus {
  background-color: #5b7bd5;
  background-image: linear-gradient(#5b7bd5, #4864b1);
}
.qa-box {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
}
h2 {
  font-weight: 100;
  font-size: 28px;
}
h4 {
  font-size: 16px;
  font-weight: 300;
}
a {
  color: blue;
}
</style>
