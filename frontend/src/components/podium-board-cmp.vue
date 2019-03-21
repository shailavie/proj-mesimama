<template>
  <section>
    <h1>Wall of Fame</h1>
    <div class="podium-board-container">
      <div class="podium-container">
        <img :src="users.place2.imgSrc">
        <div class="podium place-2">
          <h3>{{users.place2.name}}</h3>
         <h4>{{users.place2.score}}</h4>
        </div>
      </div>
      <div class="podium-container">
        <img :src="users.place1.imgSrc">
        <div class="podium place-1">
          <h3>{{users.place1.name}}</h3>
         <h4>{{users.place1.score}}</h4>
        </div>
      </div>
      <div class="podium-container">
        <img :src="users.place3.imgSrc">
        <div class="podium place-3">
          <h3>{{users.place3.name}}</h3>
          <h4>{{users.place3.score}}</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview-cmp.vue";

export default {
  props: [],
  data() {
    return {
      users: {
        place1: {
          name: "Saba Zion",
          score: 138,
          imgSrc: "/img/users/grampa.jpeg"
        },
        place2: {
          name: "Savta Bracha",
          score: 102,
          imgSrc: "/img/users/grandma.jpg"
        },
        place3: {
          name: "Shlomi",
          score: 96,
          imgSrc: "/img/users/dad.jpg"
        }
      }
    };
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
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-bottom: 10px;
}
h4 {
    margin: 0;
    font-size: 20px;
    padding-bottom: 5px;
}
</style>
