<template>
  <section class="user-profile" v-if="user">
    <div class="flex center-ver mb30 user-info-container">
      <user-avatar class="profile-img" :url="user.avatarUrl" :user="user" :profileImg="true"/>
      <label class="upload-file flex column center-all">
        <h2>+</h2>
        <h5>Change picture</h5>
        <input
          type="file"
          class="form-control"
          v-on:change="uploadTaskImg($event.target.files)"
          accept="image/*"
        >
      </label>
      <h1 class="ml30">{{user.name}}</h1>
    </div>
    <h2 class="mbt30">My group</h2>
    <ul class="flex">
      <!-- User's group -->
      <li v-for="currUser in myGroupToShow" :key="currUser._id" class="flex column user-in-group">
        <user-avatar
          :user="currUser"
          :url="currUser.avatarUrl"
        >
        </user-avatar>
        {{currUser.name}}
      </li>
    </ul>
    <div v-if="user.isDirector">
      <h2 class="mbt30">Invite Family and Friends</h2>
      <add-users/>
    </div>
    <dash-board/>
    <h2 class="mbt30">{{user.name}}'s Tasks</h2>
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
import dashBoard from "../components/dashboard.vue";
import imgService from "../services/img-service.js";
import addUsers from "./add-users.vue";

export default {
  name: "myAccount",
  components: {
    userAvatar,
    taskPreview,
    dashBoard,
    addUsers
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
    this.$store.dispatch({ type: "loadGroup" });
    
  },
  methods: {
    async uploadTaskImg(file) {
      let url = await imgService.uploadImg(file);
      this.user.avatarUrl = url;
      await this.$store.dispatch({ type: "updateUser", user: this.user });
    },
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
      return myTasks
        .filter(task => task.helperId === this.user._id)
        .sort((a, b) => {
          return a.status > b.status ? 1 : -1;
        });
    },
    myGroupToShow(){
      let group = this.$store.getters.currGroup
      return group
    }
  }
};
</script>

<style scoped lang="scss">
@media (max-width: 590px) {
  .user-info-container {
    flex-direction: column;
  }
  .profile-img {
  margin-bottom: 20px;
}
}
.profile-img {
  width: 168px;
  height: 168px;
}
.user-in-group {
  font-size: 14px;
  text-align: center;
  margin-left: 10px;
}
.user-profile {
  padding: 30px;
}
h4 {
  text-transform: capitalize;
  margin-bottom: 20px;
}
.upload-file {
  position: absolute;
  z-index: 3;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: transparent;
  border: transparent;
  transition: 0.3s ease;
  &:hover {
    color: white;
    border: 2px dashed lightblue;
  }
}
.form-control {
  position: absolute;
  opacity: 0;
}
</style>

