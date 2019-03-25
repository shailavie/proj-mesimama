<template>
  <!-- <div v-if="users">
    <h1>Our Daily Stars</h1>
    <div v-for="(user,idx) in users" :key="idx">{{user.name}} : {{user.score}}</div>
  </div>-->
  <section>
    <h1>The Daily Stars!</h1>
    <div class="podium-board-container">
      <div class="podium-container">
        <img :src="users[1].avatarUrl">
        <div class="podium place-2">
          <h3>{{users[1].name}}</h3>
          <img class="second-trophy" src="../assets/icons/trophy.svg">
          <h4>{{users[1].score}}</h4>
        </div>
      </div>
      <div class="podium-container">
        <img :src="users[2].avatarUrl">
        <div class="podium place-1">
          <h3>{{users[2].name}}</h3>
          <img class="first-trophy" src="../assets/icons/gold.svg">
          <h4>{{users[2].score}}</h4>
        </div>
      </div>
      <div class="podium-container">
        <img :src="users[0].avatarUrl">
        <div class="podium place-3" >
          <h3>{{users[0].name}}</h3>
          <img class="third-trophy" src="../assets/icons/trophy.svg">
          <h4>{{users[0].score}}</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userService from "../services/user.service.js";
export default {
  props: [],
  data() {
    return {
      // users: {
      //   place1: {
      //     name: "Saba Zion",
      //     score: 138,
      //     imgSrc: "/img/users/grampa.jpeg"
      //   },
      //   place2: {
      //     name: "Savta Bracha",
      //     score: 102,
      //     imgSrc: "/img/users/grandma.jpg"
      //   },
      //   place3: {
      //     name: "Shlomi",
      //     score: 96,
      //     imgSrc: "/img/users/dad.jpg"
      //   }
      // }
    };
  },
  async created() {
    this.$store.dispatch("loadGroup");
  },

  computed: {
    users() {
      let group = this.$store.getters.currGroup;
      let users = group.slice(group.length - 3, group.length);
      console.log('users podium:',users);
      return users;
    }
  }
};
</script>

<style scoped lang="scss">
.podium-board-container {
  display: flex;
  flex-direction: row;
  margin: 20px;
}
.podium-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.podium {
  width: 100px;
  border: 1px solid rgb(105, 105, 105);
  background-color: #fdfbfb;
  margin-left: -1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 5px;
  border-radius: 8px 8px 0 0;
}
.place-1 {
  height: 180px;
}
.place-2 {
  height: 140px;
}
.place-3 {
  height: 100px;
}
img {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-bottom: 10px;
}
.second-trophy{
  width: 35px;
  height: 35px;
}
.third-trophy{
  width: 25px;
  height: 25px;
}
h4 {
  margin: 0;
  font-size: 20px;
  padding-bottom: 5px;
}
</style>
