<template>
  <section >
    <!-- {{users}} -->
    <h1 class="task-list-title">{{title}}</h1>

    <!-- Empty State -->
    <div class="empty-state-container" v-if="!tasks.length">
      <h2>No Tasks?</h2>
      <img class="emptyState" src="/img/icons/emptyState.png">
      <h4>Me and mom have a nickname for people with no tasks..</h4>
      <el-button type="primary" @click="$emit('toggle-tasks')">Take Responsibility!</el-button>
    </div>

    <!-- Tasks -->
    <div class="task-list-container">

      <!-- title and user avatar -->
      <!-- <ul v-if="usersToShow">
          <user-avatar v-for="user in usersToShow" :key="user._id" :url="user.avatarUrl"/>
      </ul> -->

      <!-- Task items -->
      <ul class="tasks-items">
        <li v-for="currTask in tasks" :key="currTask._id">
          <task-preview
            :task="currTask"
            @task-owned="ownTask($event)"
            @task-done="doneTask($event)"
            @task-passed="passTask($event)"
            @task-edit="editTask($event)"
            @task-remove="removeTask($event)"
          ></task-preview>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview-cmp.vue";
import userService from "../services/user.service.js";
import userAvatar from "@/components/user-avatar-cmp.vue";

export default {
  props: ["tasks", "title"],
  components: {
    taskPreview,
    userAvatar
  },
  data() {
    return {
      usersGroup: null
    };
  },
  async created() {
    this.$store.dispatch("loadGroup");
  },
  methods: {
    ownTask(taskId) {
      console.log("task list: task is owened", taskId);
      this.$emit("task-owned", taskId);
    },
    doneTask(task) {
      this.$emit("task-done", task);
    },
    passTask(task) {
      this.$emit("task-passed", task);
    },
    editTask(taskId) {
      this.$emit("task-edit", taskId);
    },
    removeTask(taskId) {
      this.$emit("task-remove", taskId);
    },
    getHelperAvatarUrl() {}
  },
  computed: {
    getUniqueUsers() {
      let helpers = [];
      this.tasks.forEach(task => {
        if (helpers.indexOf(task.helperId) === -1) {
          helpers.push(task.helperId);
        }
      });
      helpers.map(helper => {
        // console.log(helper)
        userService.getUserById(helper);
      });
      return helpers;
    },
    usersToShow(){
      let users = this.$store.getters.currGroup
      // console.log(users)
       return users
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  display: grid;
  grid-gap: 10px;
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
  padding: 20px;
  border-radius: 4px;
  margin-top: 32px;
}
h4 {
  width: 300px;
}
.task-list-container {
  margin-bottom: 20px;
}
.task-list-title {
  text-align: center;
}
h1 {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-weight: 100;
  font-size: 20px;
}
</style>
