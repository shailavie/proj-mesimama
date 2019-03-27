
<template>
  <section class="dashboard">
    <div class="reward-container">
      <div class="reward-icon-container" :class="{'won':isWon}">
        <span class="score-count">{{currUserScore}}</span>
      </div>
      <div class="reward-counter">
        Points
        <br>
        <small>Good job!</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isWon: false
    };
  },
  methods: {},
  computed: {
    currUserScore() {
      if (!this.$store.getters.currUser.score) return 0;
      return this.$store.getters.currUser.score;
    }
  },
  watch: {
    currUserScore() {
      this.isWon = true;
      setTimeout(() => {
        this.isWon = false;
      }, 600);
    }
  }
};
</script>

<style scoped lang="scss">
.dashboard {
  background: #fff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  // border-left: 2px solid darkorange;
  padding: 20px;
  display: flex;
  margin: 5px 0px;
  flex-direction: column;
  justify-content: center;
  // border:1px solid #DCDFE6;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}
.reward-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reward-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-image: url("../assets/icons/reward-box.png");
  background-size: cover;
  transition: 0.6s;
}

.won {
  transform: scale(1.2);
  font-size: 120%;
}

.score-count {
  color: orange;
  font-size: 150%;
  font-weight: bolder;
  transform: translateY(-10px);
}
.reward-icon-img {
  max-width: 60px;
  transition: 0.6s;
  transition-timing-function: ease-in-out;
  filter: invert(0.8);
}

h2 {
  color: #999;
  font-weight: 300;
  margin-bottom: 0;
}

small {
  color: #999;
}
</style>
