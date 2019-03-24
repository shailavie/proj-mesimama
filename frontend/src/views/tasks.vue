<template>
  <section class="task-list-page">
    <router-link to="/app/edit">
    <button class="add-task-btn">+</button>
    </router-link>
    <div class="toggle-tasks-container">
      <el-switch
        v-if="window.width<680"
        class="toggleTasks"
        v-model="value"
        active-color="#434e60"
        inactive-color="#434e60"
        :active-text="myTasksCount"
        :inactive-text="allTasksCount"
        @change="toggleTasks"
      ></el-switch>
    </div>
    <div class="task-list-container">
      <task-list-cmp
        :title="taskListTitle"
        :tasks="tasksToShow"
        @task-owned="ownTask($event)"
        @task-passed="passTask($event)"
        @toggle-tasks="toggleTasks"
        @task-edit="editTask($event)"
        @task-remove="removeTask($event)"
      ></task-list-cmp>
      <task-list-cmp
        v-if="window.width>680"
        title="My Tasks"
        :tasks="tasksToShowDT"
        @task-owned="ownTask($event)"
        @task-passed="passTask($event)"
        @toggle-tasks="toggleTasks"
        @task-edit="editTask($event)"
        @task-remove="removeTask($event)"
      ></task-list-cmp>
      <div class="stats-panel">
        <podium-board-cmp></podium-board-cmp>
        <dash-board></dash-board>
      </div>
    </div>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import podiumBoardCmp from "../components/podium-board-cmp.vue";
import dashBoard from "../components/dashboard.vue";
export default {
  name: "tasksPage",
  components: {
    taskListCmp,
    podiumBoardCmp,
    dashBoard
  },
  data() {
    return {
      value: false, //TO DO - Check if we still need this value (used for toggle)
      showMyTasks: false,
      window: {
        width: 0
      },
      user: null
    };
  },
  created() {
    this.$store.dispatch({ type: "loadActiveTasks" });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.user = this.$store.getters.currentUser;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    tasksToShow() {
      return !this.showMyTaskss
        ? this.$store.getters.filteredTasks.filter(
            task => task.helperId === null
          )
        : this.$store.getters.filteredTasks.filter(
            task => task.helperId !== null
          );
    },
    tasksToShowDT() {
      return this.$store.getters.filteredTasks.filter(
        task => task.helperId !== null
      );
    },
    taskListTitle() {
      return this.showMyTasks ? this.myTasksCount : this.allTasksCount;
    },
    allTasksCount() {
      let allTasksCount = this.$store.getters.filteredTasks.filter(
        task => task.helperId === null
      ).length;
      return `All (${allTasksCount})`;
    },
    myTasksCount() {
      let allTasksCount = this.$store.getters.filteredTasks.filter(
        task => task.helperId !== null
      ).length;
      return `Mine (${allTasksCount})`;
    }
  },
  methods: {
    ownTask(taskId) {
      this.$store.dispatch("ownTask", taskId);
    },
    passTask(task) {
      this.$store.dispatch("passTask", task);
    },
    toggleTasks() {
      this.showMyTasks = !this.showMyTasks;
    },
    handleResize() {
      this.window.width = window.innerWidth;
    },
    editTask(taskId) {
      this.$router.push("edit/" + taskId);
    },
    removeTask(taskId) {
      this.$store.dispatch("removeTask", taskId).then(() => {
        this.$router.push("/app/tasks");
      });
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
.task-list-container {
  display: flex;
  flex-direction: column;
}
@media (min-width: 420px) {
  .task-list-container {
    flex-direction: row;
  }
}
.task-list-title {
  text-align: center;
}
.stats-panel {
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>