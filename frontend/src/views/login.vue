<template>
  <section class="login">
    <h1>Welcome to the Family.</h1>
    <div class="choose-user">
      <div class="user-box">
        <span
          style="background-image:url('https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/40515553_10216085148102132_1645739650016346112_o.jpg?_nc_cat=105&_nc_ht=scontent.ftlv6-1.fna&oh=a03924aa5cf182d0ead07372a25e4ca6&oe=5D121E1B');"
          @click.prevent="setRole('5c98fa5eb687d600001a8d83')"
          class="login-avatar"
        ></span>
        <span>Tamar</span>
      </div>
      <div class="user-box">
        <span
          style="background-image:url('https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/14333644_10154601159832375_66942999029735933_n.jpg?_nc_cat=109&_nc_ht=scontent.ftlv6-1.fna&oh=6fd6dde4ef4b2b68c9a03bc16cc1df34&oe=5D16060D');"
          @click.prevent="setRole('5c98fb581c9d4400002a2a3d')"
          class="login-avatar"
        ></span>
        <span>Ruti</span>
      </div>
      <div class="user-box">
        <span
          style="background-image:url('https://scontent.ftlv6-1.fna.fbcdn.net/v/t31.0-8/16797654_10211254147530137_4861005975568511724_o.jpg?_nc_cat=106&_nc_ht=scontent.ftlv6-1.fna&oh=9411dd7bd166dfa7a244f436c785983d&oe=5D127B09');"
          @click.prevent="setRole('5c98fad51c9d4400002a2a3c')"
          class="login-avatar"
        ></span>
        <span>Yonatan</span>
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
      // console.log('Session is set..')
      // await this.$store.dispatch({ type: "setCurrUser" });
      // console.log('Got user in store..')
      // setTimeout(() => {
      //   this.$router.push('/app/tasks')

      // }, 3000);
    }
  }
};
</script>


<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #296bbb 1%, #1e88e5 64%, #279ad4 97%);
  color: #fff;
  flex-direction: column;
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

.login-page-el-input .el-input__inner {
}

.choose-user {
  margin-top: 60px;
  display: flex;
  width: 500px;
  justify-content: space-between;
}

.login-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin-bottom: 10px;
}

.user-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

