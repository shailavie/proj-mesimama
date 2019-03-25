<template>
  <!-- <div v-if="users">
    <h1>Our Daily Stars</h1>
    <div v-for="(user,idx) in users" :key="idx">{{user.name}} : {{user.score}}</div>
  </div>-->
  <section>
    Daily Stars
    <div class="podium-board-container">
      <div class="podium-container">
        <img :src="users[1].avatarUrl" class="user-avatar-test">
        <div class="podium place-2">
          <div class="user-score">{{users[1].score}}</div>
        </div>
      </div>
      <div class="podium-container">
        <img :src="users[2].avatarUrl" class="user-avatar-test">
        <div class="podium place-1">
          <img class="first-trophy" src="../assets/icons/gold.svg">
        </div>
      </div>
      <div class="podium-container">
        <img :src="users[0].avatarUrl" class="user-avatar-test">
        <div class="podium place-3">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userService from "../services/user.service.js";
import userAvatarCmp from "../components/user-avatar-cmp.vue";

export default {
  components: {
    userAvatarCmp
  },
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
      console.log("users podium:", users);
      return users;
    }
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 40px 0;
}
.podium-board-container {
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: center;
}
.podium-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.podium {
  width: 80px;
  border: 1px solid rgb(105, 105, 105);
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
  font-size: 0.6;
}

.podium img {
  filter: invert(1);
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
.podium-container .user-avatar-test {
  border-radius: 50%;
}
</style>
