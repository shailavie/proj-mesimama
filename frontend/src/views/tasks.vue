<template>
  <section class="task-list-page">
    <section class="all-tasks-panel">
      <div class="all-tasks-panel-inside">
        <!-- My Tasks -->

        <task-list-cmp
          v-if="userToShow"
          :tasks="myTasksToShow"
          title="My Tasks"
          @task-owned="ownTask($event)"
          @task-passed="passTask($event)"
          @task-done="doneTask($event)"
          @task-edit="editTask($event)"
          @task-remove="removeTask($event)"
        ></task-list-cmp>

        <task-list-cmp
          :tasks="unOwnedTasksToShow"
          title="Tasks to go"
          @task-owned="ownTask($event)"
          @task-passed="passTask($event)"
          @task-done="doneTask($event)"
          @task-edit="editTask($event)"
          @task-remove="removeTask($event)"
        ></task-list-cmp>

        <!-- Others Tasks -->
        <h2 class="others-tasks">
          <strong>Other's Tasks</strong>
        </h2>
        <task-list-cmp
          v-if="userToShow"
          :tasks="othersTasksToShow"
          title="Other's tasks"
          @task-owned="ownTask($event)"
          @task-passed="passTask($event)"
          @task-done="doneTask($event)"
          @task-edit="editTask($event)"
          @task-remove="removeTask($event)"
        ></task-list-cmp>

        <!-- Done Tasks -->
        <h1>Done Tasks</h1>

        <!-- Others Tasks -->
        <h2>
          <strong>Other's Tasks</strong>
        </h2>

        <task-list-cmp
          v-if="userToShow"
          :tasks="doneTasksToShow"
          title="Done tasks"
          @task-edit="editTask($event)"
          @task-remove="removeTask($event)"
        ></task-list-cmp>
      </div>
    </section>

    <section class="stats-panel">
      <dash-board></dash-board>
      <!-- <podium-board-cmp></podium-board-cmp> -->
      <photo-gallery class="photo-gallery"/>
    </section>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import podiumBoardCmp from "../components/podium-board-cmp.vue";
import dashBoard from "../components/dashboard.vue";
import photoGallery from "../components/photo-gallery-cmp.vue";
import socketService from "../services/socket.service.js";

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
      window: {
        width: 0
      },
      user: null,
      showMyTasks: true,
      showUnOwnedTasks: true
    };
  },
  created() {
    console.log("created at tasks page");
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
    doneTasksToShow() {
      let doneTasks = this.$store.getters.allTasks.filter(
        task => task.status === "done"
      );
      return [{ tasks: doneTasks }];
    },
    unOwnedTasksToShow() {
      let allUnOwnedTasks = this.$store.getters.allTasks.filter(
        task => task.helperId === null
      );
      return [{ tasks: allUnOwnedTasks }];
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
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  .task-list-page {
    flex-direction: column;
  }

  .photo-gallery {
    display: none;
  }
}

.all-tasks-panel {
  flex-grow: 1;
  padding-right: 40px;
}

.all-tasks-panel-inside {
  max-width: 800px;
}

@media (max-width: 768px) {
  .all-tasks-panel-inside {
    max-width: 100%;
  }
}

.others-tasks {
  margin-bottom: 10px;
}
.stats-panel {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #333;
  flex-basis: 25%;
}
@media (max-width: 768px) {
  .all-tasks-panel {
    flex-grow: 1;
    padding-right: 0;
  }

  .stats-panel {
    padding: 0px 60px 30px 60px;
    // order: -1;
  }
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
  max-width: 400px;
}
@media (min-width: 420px) {
  .task-list-container {
    flex-direction: row;
  }
}
.task-list-title {
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
        @change="toggleMyTasks"
      ></el-switch>
    </div>-->
