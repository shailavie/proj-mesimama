
<template>
  <transition name="fade">
    <section class="dashboard" :class="{'won-container':isWon}" v-if="currUserScore">
      <div class="reward-container">
        <div class="reward-icon-container" :class="{'won':isWon}">
          <span class="pulse" v-if="isWon"></span>
          <span class="score-count">{{currUserScore}}</span>
        </div>
        <div class="reward-counter">
          <div class="points-title">Rewards</div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isWon: false,
      isFirstCall: true
    };
  },
  methods: {},
  computed: {
    currUserScore() {
      if (this.$store.getters.currUser === null) return 0;
      return this.$store.getters.currUser.score;
    }
  },
  watch: {
    currUserScore() {
      if (!this.isFirstCall) {
        this.isWon = true;
        setTimeout(() => {
          this.isWon = false;
        }, 600);
      } else {
        this.isFirstCall = false;
      }
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
  margin: 10px 0px;
  flex-direction: column;
  justify-content: center;
  // border:1px solid #DCDFE6;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  transition: 0.6s;
  transition-timing-function: ease-in-out;
}

@media (max-width: 768px) {
  .dashboard {
    border-radius: 15px;
  }
}
.reward-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reward-icon-container {
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 100px;
  height: 100px;
  background-image: url("../assets/icons/reward-box.png");
  background-size: cover;
  transition: 0.6s;
}

.won {
  transform: scale(1.2);
  font-size: 140%;
  filter: saturate(3);
}

.won-container {
  transform: scale(1.1);
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

.points-title {
  margin-top: 10px;
  color: #999;
}
h2 {
  color: #999;
  font-weight: 300;
  margin-bottom: 0;
}

small {
  color: #999;
}

.pulse {
  position: absolute;
  width: 30px;
  // transform: translate((calc(50%-11px)), (-20px));
  height: 30px;
  transform: translateY(calc(50% - 24px));
  border-radius: 50%;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: pulse 2s infinite;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 40px rgba(204, 169, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
