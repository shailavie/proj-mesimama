<template>
  <section class="user-profile" v-if="user">
    <div class="flex center-ver mb30">
      <user-avatar :url="user.avatarUrl"/>
      <h2 class="ml10">{{user.name}}'s tasks</h2>
    </div>
    <ul>
      <!-- User's tasks -->
      <li v-for="currTask in myTasksToShow" :key="currTask._id">
        <h4>{{currTask.status}}</h4>
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
  </section>
</template>

<script>
import userService from "../services/user.service.js";
import userAvatar from "../components/user-avatar-cmp.vue";
import taskPreview from "../components/task-preview-cmp.vue";

export default {
  name: "myAccount",
  components: {
    userAvatar,
    taskPreview
  },
  data() {
    return {
      user: null
    };
  },
  async created() {
    let userId = this.$route.params.userId;
    console.log("HELLO", userId);
    this.user = await userService.getUserById(userId);
    console.log("my account got user!", this.user);
    this.$store.dispatch({ type: "loadActiveTasks" });
  },
  methods: {
    doneTask(task) {
      this.$store.dispatch("markDone", task);
    },
    passTask(task) {
      this.$store.dispatch("passTask", task);
    }
  },
  computed: {
    myTasksToShow() {
      let myTasks = this.$store.getters.allTasks;
      return myTasks.filter(task => task.helperId === this.user._id);
    }
  }
};
</script>

<style scoped lang="scss">
.user-profile {
  padding: 30px;
}
h4 {
  text-transform: capitalize;
  margin-bottom: 20px;
}
</style>

