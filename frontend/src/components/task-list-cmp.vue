<template>
  <section>
    <div class="empty-state-container" v-if="!tasks.length">
      <h2> No Tasks? </h2>
          <img class="emptyState" src="/img/icons/emptyState.png"/>
      <h4> Me and mom have a nickname for people with no tasks..</h4>
      <el-button type="primary" @click="$emit('toggle-tasks')">Take Responsibility!</el-button>
    </div>
    <div class="task-list-container">
      <ul class="tasks-items">
        <li v-for="currTask in tasks" :key="currTask._id">
          <task-preview
            :task="currTask"
            @task-owned="ownTask($event)"
            @task-passed="passTask($event)"
          ></task-preview>
        </li>
      </ul>
    </div>
<dash-board>
</dash-board>
  </section>
</template>

<script>
import taskPreview from "./taskPreview.vue";
import dashBoard from "./dashboard.vue"

export default {
  props: ["tasks"],
  components: {
    taskPreview,
    dashBoard
  },
  methods: {
    ownTask(taskId) {
      console.log("task list: task is owened", taskId);
      this.$emit("task-owned", taskId);
    },
    passTask(taskId) {
      console.log("task list: task is PASSED", taskId);
      this.$emit("task-passed", taskId);
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  display: grid;
}
.emptyState {
  width: 100px;
  height: auto;
}
.empty-state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 200px;
  margin: 0 auto;
}
.task-list-container {
  margin-bottom: 100px;
}
</style>
