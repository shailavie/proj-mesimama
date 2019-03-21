<template>
  <section>
    <h1 class="task-list-title">{{title}}</h1>
    <div class="empty-state-container" v-if="!tasks.length">
      <h2>No Tasks?</h2>
      <img class="emptyState" src="/img/icons/emptyState.png">
      <h4>Me and mom have a nickname for people with no tasks..</h4>
      <el-button type="primary" @click="$emit('toggle-tasks')">Take Responsibility!</el-button>
    </div>
    <div class="task-list-container">
      <ul class="tasks-items">
        <li v-for="currTask in tasks" :key="currTask._id">
          <task-preview
            :task="currTask"
            @task-owned="ownTask($event)"
            @task-passed="passTask($event)"
            @task-edit="editTask($event)"
          ></task-preview>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview-cmp.vue";
// import dashBoard from "./dashboard.vue"

export default {
  props: ["tasks", "title"],
  components: {
    taskPreview
    // dashBoard
  },
  methods: {
    ownTask(taskId) {
      console.log("task list: task is owened", taskId);
      this.$emit("task-owned", taskId);
    },
    passTask(taskId) {
      console.log("task list: task is PASSED", taskId);
      this.$emit("task-passed", taskId);
    },
    editTask(taskId) {
      this.$emit("task-edit", taskId);
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
  width: 400px;
  margin: 0 auto;
  border: 1px solid rgb(192, 188, 188);
  padding: 20px;
  border-radius: 4px;
  margin-top: 32px;
}
h4 {
  width: 300px;
}
.task-list-container {
  margin-bottom: 100px;
}
.task-list-title {
  text-align: center;
}
</style>
