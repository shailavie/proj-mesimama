<template>
  <section class="task-list-section">
    <!-- <h1 class="task-list-title">{{title}}</h1> -->

    <!-- Empty State -->
    <div class="empty-state-container" v-if="!tasks.length">
      <h2>No Tasks?</h2>
      <img class="emptyState" src="/img/icons/emptyState.png">
      <h4>Me and mom have a nickname for people with no tasks..</h4>
    </div>

    <!-- Tasks -->
    <div class="task-list-container">
      <!-- User avatar and name -->
      <ul v-if="tasks">
        <div class="user-tasks-container" v-for="userToRender in tasks" :key="userToRender._id">
          <div class="user-info" v-if="userToRender._id">
            <div class="user-avatar" :style="getAvatarUrlBg(userToRender.avatarUrl)"></div>
            <h2>{{userToRender._id === thisUser._id? 'You' :userToRender.name}}</h2>
            <h2>{{currTitle(userToRender)}}</h2>
            <h3>&nbsp;({{userToRender.tasks.length}})</h3>
          </div>
         <div class="user-info" v-else>
            <user-avatar :url="'https://cdn3.iconfinder.com/data/icons/people-emoji/50/Baby2-512.png'"/>
            <h2>Shit to do</h2>
            <h3>&nbsp;({{userToRender.tasks.length}})</h3>
          </div>
          <ul>
            <!-- User's tasks -->
            <li v-for="currTask in userToRender.tasks" :key="currTask._id">
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
      </ul>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview-cmp.vue";
import userService from "../services/user.service.js";
import userAvatar from './user-avatar-cmp.vue'

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
    getAvatarUrlBg(url) {
      return { backgroundImage: `url(${url})` };
    },
    currTitle(userToRender){
      if (!userToRender._id) return 'All Tasks'
      else (userToRender._id === this.thisUser._id)? 'You' :userToRender.name
    }
  },
  computed: {
    thisUser() {
      let user = this.$store.getters.currUser;
      return user
    },
  }
};
</script>

<style scoped lang="scss">
.task-list-section {
  margin-top: 20px;
}
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
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-position: center;
  background-size: cover;
  // background: url('https://cdn3.iconfinder.com/data/icons/people-emoji/50/Baby2-512.png');
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  h2 {
    margin-left: 10px;
  }
}

ul li {
  list-style-type: none;
  list-style: none;
}
ul {
  list-style: none;
}
.user-tasks-container {
  text-align: left;
}
</style>
