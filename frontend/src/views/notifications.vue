



<template>
  <section v-if="user">
    <h1>This just in!</h1>
    <!-- <pre>{{notifications}}</pre> -->
    <ul>
      <li v-for="(notification,idx) in user.notifications" :key="idx" :class="isRead(notification)">
        <div class="notification-card flex">
          <!-- icon -->
          <div class="task-status-icon-container flex center-all">
            <img class="icon" :src="iconUrlToShow(notification)" alt="icon">
          </div>
          <div class="notification-content flex">
            <!-- title & desc -->
              <div class="flex column grow">
                <h4>{{notification.name}}</h4>
                <h5>was {{notification.status}}</h5>
                <small>{{notification.createdAt | moment("from", "now")}}</small>
              </div>

            <div class="actions-container flex">
              <el-button
                v-if="!isTaskOwned(notification.taskId)"
                type="success"
                @click.native="ownTask(notification.taskId)"
              >I'm on it</el-button>
              <el-button @click.native="taskDetails(notification.taskId)" icon="el-icon-info">See task</el-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import utilService from "../services/util-service.js";
import taskService from "../services/task-service.js";

export default {
  data() {
    return {
      notifications: null,
      tasks: []
    };
  },
  async created() {
    await this.$store.dispatch("loadActiveTasks");
    this.tasks = await this.$store.getters.allTasks;
  },
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
    isTaskOwned(taskId) {
      let currTask = this.tasks.find(task => task._id === taskId);
      if (currTask) return currTask.helperId;
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

.notification-text {
  flex-grow: 1;
  width: 100%;
}
.icon {
  width: 50px;
  height: 50px;
}
.task-status-icon-container {
  width: 100px;
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

@media (max-width: 420px) {
  .notification-card {
    flex-direction: column;
  }
}
button {
  cursor: pointer;
}
small {
  color: #999;
  font-size: 13px;
  font-weight: 400;
}

.notification-content {
  padding: 10px 0;
  flex-basis: 100px;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .notification-card {
    padding: 20px 20px;
  }
  .notification-content {
    padding: 10px;
    flex-direction: column;
  }

  .actions-container {
    justify-content: flex-start;
    margin-top: 20px;
  }
}
</style>




