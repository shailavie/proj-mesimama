
<template>
  <section>
    <div class="container">
      <div class="tasks-container style">
        <div class="img-container">
          <img src="../assets/icons/high-five.svg" alt srcset>
        </div>
        <div class="text-container">35 done tasks, great job!</div>
      </div>
      <div class="tasks-container style">
        <div class="img-container">
          <img src="../assets/icons/hourglass.svg" alt srcset>
        </div>
        <div
          class="text-container"
        >4 tasks are awaiting for a helper, maybe we should contact grandpa?</div>
      </div>
      <div class="tasks-container style">
        <div class="img-container">
          <img src="../assets/icons/team.svg" alt srcset>
        </div>
        <div class="text-container">6 tasks are in process, dont forget to thanks the helpers!</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
img {
  height: 60px;
  width: 60px;
}
.container {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0;
  text-align: center;
}
.tasks-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.style {
  margin: 0 auto;
  width: 200px;
  margin-top: 10px;
  display: flex;
  text-align: left;
  align-items: center;
}
.img-container {
  margin-right: 20px;
}
.text-container {
  font-size: 16px;
}
</style>
