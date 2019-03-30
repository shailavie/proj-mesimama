<template>
  <section class="task-done-container">
    <div class="task-done-inner-container flex column center-all space-around">
      <h1>TASK COMPLETED!</h1>
      <h2>There's plenty of time to rest</h2>
      <img src="@/assets/img/task-done1.png" alt>
      <h2>In the grave!</h2>
      <el-button type="primary">Take more responsiblity</el-button>
      <button class="close-btn" @click="$emit('close-task-done-msg')">X</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "taskDone",
  props: {
    time: Number
  },
  created() {
    setTimeout(() => {
      this.$emit("close-task-done-msg");
    }, this.time);
  }
};
</script>

<style lang="scss" scoped>
.task-done-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: white;
}
.task-done-inner-container {
  position: relative;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70vh;
  padding: 30px;
  border-radius: 8px;
  transition: 0.3s ease;
}

@media (min-width: 500px) {
  .task-done-container {
    background-color: rgba(0, 0, 0, 0.753);
  }
  .task-done-inner-container {
    width: 50%;
  }
  h1 {
    font-size: 70px;
  }
  h2 {
    font-size: 36px;
  }
}
img {
  height: 200px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
  // z-index: 6;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
