<template>
  <section class="task-list-page">
    <div class="toggle-tasks-container">
        <el-switch
          class="toggleTasks"
          v-model="value"
          active-color="#434e60"
          inactive-color="#434e60"
          active-text="My Tasks"
          inactive-text="All Tasks"
          @change="toggleTasks"
        ></el-switch>
    </div>
    <task-list-cmp
      :tasks="tasksToShow"
      @task-owned="ownTask($event)"
      @task-passed="passTask($event)"
      @toggle-tasks="toggleTasks"
    ></task-list-cmp>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import { Button } from "element-ui";
export default {
  name: "tasksPage",
  components: {
    taskListCmp
  },
  data() {
    return {
      value: false,
      showMyTasks: false
    };
  },
  created() {
    this.$store.dispatch({ type: "loadUnownedTasks" });
  },
  computed: {
    tasksToShow() {
      return !this.showMyTasks
        ? this.$store.getters.filteredTasks.filter(
            task => task.helperId === null
          )
        : this.$store.getters.filteredTasks.filter(
            task => task.helperId !== null
          );
    }
  },
  methods: {
    ownTask(taskId) {
      console.log("tasks PAGE: task is OWNED", taskId);
      this.$store.dispatch("setTaskHelper", taskId);
    },
    passTask(taskId) {
      console.log("tasks PAGE: task is PASSED", taskId);
      this.$store.dispatch("clearTaskHelper", taskId);
    },
    toggleTasks() {
      console.log("switch");
      this.showMyTasks = !this.showMyTasks;
    }
  }
};
</script>

<style scoped lang="scss">
.toggleTasks {
  margin: 10px auto;
}
.toggle-tasks-container {
  display: flex;
  justify-content: center;
}
</style>