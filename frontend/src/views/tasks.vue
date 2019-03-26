<template>
  <section class="task-list-page">
    <section class="all-tasks-panel">
      <!-- <pre>{{myTasksToShow}}</pre> -->
      <!-- <pre>{{othersTasksToShow}}</pre> -->
      <!-- {{userToShow}} -->

      <!-- My Tasks -->
      <task-list-cmp
        v-if="userToShow"
        :tasks="myTasksToShow"
        @task-owned="ownTask($event)"
        @task-passed="passTask($event)"
        @task-done="doneTask($event)"
        @toggle-tasks="toggleTasks"
        @task-edit="editTask($event)"
        @task-remove="removeTask($event)"
      ></task-list-cmp>

      <!-- Others Tasks -->
      <task-list-cmp
        v-if="userToShow"
        :tasks="othersTasksToShow"
        @task-owned="ownTask($event)"
        @task-passed="passTask($event)"
        @task-done="doneTask($event)"
        @toggle-tasks="toggleTasks"
        @task-edit="editTask($event)"
        @task-remove="removeTask($event)"
      ></task-list-cmp>

      <!-- Live Tasks -->
      <task-list-cmp
        :tasks="unOwnedTasksToShow"
        @task-owned="ownTask($event)"
        @task-passed="passTask($event)"
        @task-done="doneTask($event)"
        @toggle-tasks="toggleTasks"
        @task-edit="editTask($event)"
        @task-remove="removeTask($event)"
      ></task-list-cmp>
    </section>

    <section class="stats-panel">
      <div style="height:1px;background:rgba(255,255,255,0.1)"></div>

      <dash-board></dash-board>
      <div style="height:1px;background:rgba(255,255,255,0.1)"></div>
      <podium-board-cmp></podium-board-cmp>
      <photo-gallery/>
    </section>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import podiumBoardCmp from "../components/podium-board-cmp.vue";
import dashBoard from "../components/dashboard.vue";
import photoGallery from "../components/photo-gallery-cmp.vue";

export default {
  name: "tasksPage",
  components: {
    taskListCmp,
    podiumBoardCmp,
    dashBoard,
    photoGallery
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
    this.$store.dispatch({ type: "loadUsersWithTasks" });
    this.$store.dispatch({ type: "loadActiveTasks" });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    tasksWithNoHelpers() {
      return this.$store.getters.tasksWithNoHelpers;
    },
    usersWithTasks() {
      return this.$store.getters.usersWithTasks;
    },
    tasksToShow() {
      return !this.showMyTasks
        ? this.$store.getters.usersWithTasks.filter(
            task => task.helperId === null
          )
        : this.$store.getters.usersWithTasks.filter(
            task => task.helperId !== null
          );
    },

    myTasksToShow() {
      return this.$store.getters.usersWithTasks.filter(
        user => user._id === this.userToShow._id
      );
    },
    othersTasksToShow() {
      return this.$store.getters.usersWithTasks.filter(
        user => user._id !== this.userToShow._id
      );
    },
    unOwnedTasksToShow2() {
      return [
        {tasks: [this.$store.getters.tasksWithNoHelpers]},
        ];
    },
    unOwnedTasksToShow() {
      let allUnOwnedTasks = this.$store.getters.allTasks.filter(task => task.helperId === null)
      return [{tasks: allUnOwnedTasks}]
    },
    taskListTitle() {
      return this.showMyTasks ? this.myTasksCount : this.allTasksCount;
    },
    userToShow() {
      return this.$store.getters.currUser;
    }
  },
  methods: {
    ownTask(taskId) {
      this.$store.dispatch("ownTask", taskId);
    },
    doneTask(task) {
      this.$store.dispatch("markDone", task);
    },
    passTask(task) {
      this.$store.dispatch("passTask", task);
      console.log("lala", task);
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
.task-list-page {
  // width: 100%;
  display: grid;
  grid-template-areas: "tasks stats";
  grid-template-columns: 1fr 400px;
}
.all-tasks-panel {
  grid-area: tasks;
  padding-left: 40px;
}
.stats-panel {
  padding: 40px 60px 0px 60px;
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-area: stats;
  background-color: #1c1735;
  color: #fff;
}
.toggle-tasks {
  margin: 10px auto;
}
.toggle-tasks-container {
  display: flex;
  justify-content: center;
}
.task-list-container {
  display: flex;
  flex-direction: column;
  width: 400px;
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



    <!-- <div class="toggle-tasks-container" >
      <el-switch
        v-if="window.width<680"
        class="toggle-tasks"
        v-model="value"
        active-color="#434e60"
        inactive-color="#434e60"
        :active-text="myTasksCount"
        :inactive-text="allTasksCount"
        @change="toggleTasks"
      ></el-switch>
    </div>-->
