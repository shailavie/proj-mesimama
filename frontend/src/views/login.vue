


<template>
  <section class="login">
    <!-- <select v-model="role">
      <option value="5c93538ced3d88a4b25d83ad">Helper</option>
      <option value="5c93538ced3d88a4b25d83ac">Director</option>
    </select>-->
    <div class="container">
      <h1>Welcome Friends and Family!</h1>
      <h2>Thank god you came! we need at least 4-5 more hands on deck!</h2>

      <div class="content-container">
        <div class="img-container">
          <img src="../assets/icons/family.svg">
        </div>
        <div class="input-container">
          <button class="loginBtn loginBtn--facebook">{{msg}} with Facebook</button>
          <el-input
            placeholder="You'r@email.com"
            type="email"
            autofocus
            prefix-icon="el-icon-message"
            v-model="input.email"
          ></el-input>
          <el-input placeholder="Please input password" v-model="input.password" show-password></el-input>
          <el-button type="primary">{{msg}}</el-button>
          <h3 v-if="isMember">Got an acount?
            <button @click="isMember=!isMember">Login</button>
          </h3>
          <h3 v-else>New to 'APP NAME HERE'?
            <button @click="isMember=!isMember">Sign Up</button>
          </h3>
        </div>
      </div>
    </div>
    <!-- {{input.password}}----{{input.email}}
    <button @click="setRole">Set Role</button>
    <button @click="printSession">Print session</button>-->
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
    msg() {
      return !this.isMember ? "Login" : "Sign Up";
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
img {
  width: 190px;
}
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  margin: 30px auto;
  text-align: center;
  width: 400px;
}
.el-input {
  margin-bottom: 10px;
  margin-left: 10px;
  &:focus {
    border: 2px solid lightblue;
  }
}
.input-container {
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

//fb button

.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin-bottom: 10px;

  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Facebook */
.loginBtn--facebook {
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354c8c;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
    6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5b7bd5;
  background-image: linear-gradient(#5b7bd5, #4864b1);
}
</style>
