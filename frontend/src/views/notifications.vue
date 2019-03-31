



<template>
  <section v-if="user">
    <h1>News</h1>
    <!-- <pre>{{notifications}}</pre> -->
    <ul>
      <li v-for="(notification,idx) in user.notifications" :key="idx" :class="isRead(notification)">
        <div class="notification-card flex">
          <div class="task-status-icon-container flex center-all" style="width:100px">
            <img class="icon" :src="iconUrlToShow(notification)" alt="icon">
          </div>
          <div class="flex column grow">
            <h4>{{notification.name}}</h4>
            <h5>was {{notification.status}}</h5>
            <small>{{notification.createdAt | moment("from", "now")}}</small>
          </div>
          <div class="actions-container flex" v-if="taskIsOwned(notification.taskId)">
            <el-button @click.native="taskDetails(notification.taskId)">See Task</el-button>
            <el-button type="primary" @click.native="ownTask(notification.taskId)">I'm on it</el-button>
          </div>
          <div class="actions-container flex" v-else>
            <el-button @click.native="taskDetails(notification.taskId)">See Task</el-button>
            <el-button type="primary" @click.native="ownTask(notification.taskId)">I'm on it</el-button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import userService from "../services/user.service.js";
import utilService from "../services/util-service.js";

export default {
  data() {
    return {
      notifications: null
    };
  },
  created() {},
  methods: {
    taskDetails(taskId) {
      console.log(taskId);
      this.$router.push(`/app/details/${taskId}`);
    },
    isRead(notification) {
      return notification.isRead ? "read" : "unRead";
    },
    ownTask(taskId) {
      this.$store.dispatch("ownTask", taskId);
      setTimeout(() => {
        this.$router.push("/app/tasks");
      }, 1000);
    },
    iconUrlToShow(notification) {
      let status = notification.status;
      let iconUrl;
      switch (status) {
        case "added":
          return require("@/assets/icons/newTaskColor.svg");
          break;
        case "passed":
          return require("@/assets/icons/passedTaskColor.svg");
          break;
      }
    },
    taskIsOwned(taskId) {
      let tasks = this.$store.getters.allTasks;
      let currTask = tasks.filter(task => task._id === taskId);
      return !currTask.helperId;
    }
  },
  computed: {
    user() {
      return this.$store.getters.currUser;
    }
  },
  beforeDestroy() {
    this.$store.dispatch({ type: "updateUserNotifications" });
  }
};
</script>

<style scoped  lang="scss">
.icon {
  width: 50px;
  height: 50px;
}
.task-status-icon-container {
  width: 80px;
}
.actions-container {
  width: 250px;
  justify-content: flex-end;
  align-items: center;
}
.el-button {
  height: 50px;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
h4 {
  font-size: 16px;
}
h5 {
  font-size: 13px;
  margin: 5px 0;
}
.unRead {
  font-weight: bold;
}
li {
  list-style: none;
}
li:nth-child(even) {
  background-color: rgb(245, 245, 245);
}
li:nth-child(odd) {
  background-color: #fff;
}
.notification-card {
  font-size: 24px;
  padding: 10px;
}
button {
  cursor: pointer;
}
small {
  color: #999;
  font-size: 13px;
  font-weight: 400;
}
</style>




