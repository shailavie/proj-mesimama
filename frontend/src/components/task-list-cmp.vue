<template>
  <section class="task-list-section">
  
    <!-- Tasks -->
    <div class="task-list-container">
      <ul v-if="tasks">
        <div class="user-tasks-container" v-for="userToRender in tasks" :key="userToRender._id">
          <!-- User Info -->
          <div class="user-info flex space-between" v-if="userToRender._id">
            <div class="flex center-ver">
              <user-avatar
                class="user-avatar-in-toggle"
                :url="userToRender.avatarUrl"
                :user="userToRender"
              />
              <h2>{{userToRender._id === thisUser._id? title :userToRender.name}}</h2>
              <h2>{{currTitle(userToRender)}}</h2>
              <h2 class="tasks-count">({{userToRender.tasks.length}})</h2>
            </div>
            <div class="toggle-tasks" @click="toggleTasks" :class="{tilt : !showTasks}"></div>
          </div>
          <div class="user-info flex space-between" v-else>
            <div class="flex center-ver">
              <img class="empty-task-avatar" src="@/assets/icons/babytasks.png" alt>
              <h2>{{title}}</h2>
              <h2 class="tasks-count">({{userToRender.tasks.length}})</h2>
            </div>
            <div class="toggle-tasks" @click="toggleTasks" :class="{tilt : !showTasks}"></div>
          </div>

          <!-- User's tasks -->
          <empty-tasks-state v-if="currUserSelf && activeTasksCount === 0"></empty-tasks-state>
          <ul class="users-tasks" :class="{fadeUp : !showTasks}">
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
    <div class="buffer"></div>
  </section>
</template>

<script>
import taskPreview from "./task-preview-cmp.vue";
import userService from "../services/user.service.js";
import userAvatar from "./user-avatar-cmp.vue";
import emptyTasksState from "../components/empty-tasks-state-cmp.vue";

export default {
  props: {
    tasks: {
      type: Array
    },
    title : {
      type: String
    }
  },
  components: {
    taskPreview,
    userAvatar,
    emptyTasksState
  },
  data() {
    return {
      usersGroup: null,
      showTasks: true
    };
  },
  async created() {
    await this.$store.dispatch("loadGroup");
    console.log("created at task-list");
    this.$store.dispatch({ type: "loadCurrDirector" });
  },
  methods: {
    ownTask(taskId) {
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
    currTitle(userToRender) {
      if (!userToRender._id) return "All Tasks";
      else userToRender._id === this.thisUser._id ? "You" : userToRender.name;
    },
    toggleTasks() {
      this.showTasks = !this.showTasks;
    },
   
  },
  computed: {
    thisUser() {
      let user = this.$store.getters.currUser;
      return user;
    },
    activeTasksCount(){
      return this.tasks[0].tasks.filter(task => task.status === 'active').length
    },
    currUserSelf(){
      return this.title === 'My tasks'
    }
  }
};
</script>

<style scoped lang="scss">
$chevron: "../assets/icons/arrow-down.svg";

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
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
  margin-top: 32px;
}
h4 {
  max-width: 300px;
  font-weight: 500;
  color: #999;
}
.task-list-container {
  margin-bottom: 20px;
}
.task-list-title {
  text-align: center;
}
h1 {
  display: flex;
  align-items: center;
  font-weight: 100;
  font-size: 30px;
  font-weight: bolder;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid rgb(233, 233, 233);
  margin: 1em 0;
  padding: 0;
}
.user-avatar-in-toggle {
  margin-right: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    font-size: 1.2rem;
  }
}

.tasks-count {
  margin-left: 5px;
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
.toggle-tasks {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  color: transparent;
  cursor: pointer;
  transition: 0.4s ease;
  background: no-repeat center/40% url($chevron);
  //  filter: brightness(0.5) sepia(1) hue-rotate(-70deg) saturate(5);
  // filter: brightness(0.2) sepia(1) hue-rotate(180deg) saturate(5);
  filter: invert(0.7);
}
.title {
  display: flex;
}
.tilt {
  transform: rotate(-90deg);
}
.users-tasks {
  transition: 0.5s ease;
}
.hide {
  opacity: 0;
  height: 0px;
}
.fadeUp {
  transform: translate3d(0, -10%, 0);
  visibility: hidden;
  opacity: 0;
  height: 0;
}
.empty-task-avatar {
  width: 48px;
  height: 48px;
  margin-right: 10px;
}

.buffer {
  height: 20px;
}
</style>
