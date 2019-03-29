<template>
  <!-- <div v-if="users.length >= 2"> -->
  <!-- <h1>Our Daily Stars</h1>
    <img :src="users[1].avatarUrl" class="user-avatar-test">
    <div v-for="(user,idx) in users" :key="idx">{{user.name}} : {{user.score}}</div>
  </div>-->
  <section v-if="users.length >= 2" class="podium-section">
    <div class="podium-board-container">
      <div class="podium-container">
        <user-avatar :url="users[1].avatarUrl" :user="users[1]" class="user-avatar-test"/>
        <h5>{{users[1].name}}</h5>
        <div class="podium place-2">
          <div class="user-score">{{users[1].score}}</div>
        </div>
      </div>
      <div class="podium-container">
        <user-avatar :url="users[2].avatarUrl" :user="users[2]" class="user-avatar-test"/>
        <h5>{{users[2].name}}</h5>
        <div class="podium place-1">
          <img class="first-trophy" src="../assets/icons/gold.svg">
          <div class="user-score">{{users[2].score}}</div>
        </div>
      </div>
      <div class="podium-container">
        <user-avatar :url="users[0].avatarUrl" :user="users[0]" class="user-avatar-test"/>
        <h5>{{users[0].name}}</h5>
        <div class="podium place-3">
          <div class="user-score">{{users[0].score}}</div>
        </div>
      </div>
    </div>
    <br>
    <div class="podium-title">Daily Stars</div>
  </section>
</template>
<script>
import userService from "../services/user.service.js";
import userAvatar from "../components/user-avatar-cmp.vue";
export default {
  components: {
    userAvatar
  },
  props: [],
  data() {
    return {};
  },

  computed: {
    users() {
      let group = this.$store.getters.currGroup;
      let users = group.slice(group.length - 3, group.length);
      return users;
    }
  }
};
</script>

<style scoped lang="scss">
.podium-section {
  background: #fff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 20px;
  margin: 10px 0px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}
.podium-board-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.podium-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.podium {
  width: 92px;
  border: 1px solid #999;
  background-color: transparent;
  margin-left: -1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 5px;
  border-radius: 5px 5px 0 0;
  opacity: 0.8;
}

.user-score {
  font-size: 20px;
  font-weight: bolder;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.podium img {
  filter: invert(0.2);
}
.place-1 {
  height: 180px;
}
.place-2 {
  height: 140px;
  margin-left: -1px;
}
.place-3 {
  height: 100px;
}
img {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.second-trophy {
  width: 35px;
  height: 35px;
}
.third-trophy {
  width: 25px;
  height: 25px;
}

h1 {
  margin-top: 20px;
}
h3 {
  font-weight: 500;
}
h4 {
  margin: 0;
  font-size: 20px;
  padding-bottom: 5px;
}
h5 {
  margin-bottom: 10px;
}
.podium-container .user-avatar-test {
  border-radius: 50%;
} 
.user-avatar-test {
  margin-bottom: 10px;
}
.podium-title {
  color: #999;
}
</style>
