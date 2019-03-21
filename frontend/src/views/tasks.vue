<template>
  <section class="task-list-page">
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
      ></task-list-cmp>
      <task-list-cmp
        v-if="window.width>680"
        title="My Tasks"
        :tasks="tasksToShowDT"
        @task-owned="ownTask($event)"
        @task-passed="passTask($event)"
        @toggle-tasks="toggleTasks"
      ></task-list-cmp>
      <podium-board-cmp></podium-board-cmp>
      <dash-board></dash-board>
    </div>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import podiumBoardCmp from "../components/podium-board-cmp.vue";
import dashBoard from "../components/dashboard.vue";
import { Button } from "element-ui";
export default {
  name: "tasksPage",
  components: {
    taskListCmp,
    podiumBoardCmp,
    dashBoard
  },
  data() {
    return {
      value: false,
      showMyTasks: false,
      window: {
        width: 0
      },
      user: null
    };
  },
  created() {
    this.$store.dispatch({ type: "loadUnownedTasks" });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.user = this.$store.getters.currentUser;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
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
      return `All Tasks (${allTasksCount})`;
    },
    myTasksCount() {
      let allTasksCount = this.$store.getters.filteredTasks.filter(
        task => task.helperId !== null
      ).length;
      return `My Tasks (${allTasksCount})`;
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
    },
    handleResize() {
      this.window.width = window.innerWidth;
      // this.window.height = window.innerHeight;
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
</style>