 
<template>
  <section class="task-card">
    <div class="task-card-container">
      <img class="user-avatar" :src="userProfilePicSrc" alt>
      <div class="task-card-info">
        <h2 class="task-card-title">{{task.title}}</h2>
        <h3>{{task.desc}}</h3>
        <img src="/img/icons/taskTime30.png">
        <h5>For {{task.dueAt | moment("calendar")}}</h5>
        <div class="task-status-containter">
          <div class="task-status" :style="statusClass"></div>
          <h5>{{task.status}}</h5>
          <div class="task-points-container">
            <h4 class="task-points">{{task.points}}</h4>
            <img class="task-points-star" src="/icons/star.svg" alt>
          </div>
        </div>
      </div>
      <el-button v-if="task.helperId" type="primary" @click.native="markDone(task._id)">Done!</el-button>
      <el-button :type="buttonClass" @click.native="clickOnTask(task._id)">{{buttonText}}</el-button>
      <el-button title="Edit task" type="primary" icon="el-icon-edit" circle @click.native="editTask(task._id)"></el-button>
      <el-button title="Delete task" type="danger" icon="el-icon-delete" circle @click.native="removeTask(task._id)"></el-button>
      <el-button title="Delete task" type="warning" icon="el-icon-view" circle @click.native="detailsTask(task._id)"></el-button>
    </div>
  </section>
</template>

<script>
export default {
  props: ["task"],
  methods: {
    clickOnTask(taskId) {
      if (!this.task.helperId) {
        console.log("task is OWNED", taskId);
        this.$emit("task-owned", taskId);
      } else {
        console.log("task is PASSED", taskId);
        this.$emit("task-passed", this.task);
      }
    },
    detailsTask(taskId){
      this.$router.push(`details/${taskId}`)
    },
    editTask(taskId){
      this.$emit("task-edit", taskId);
    },
    markDone(taskId){
      //TO DO - 
    },    
    removeTask(taskId){
      this.$emit('task-remove',taskId)
    }
  },
  computed: {
    buttonClass() {
      return this.task.helperId ? "secondary" : "primary";
    },
    buttonText() {
      return this.task.helperId ? "Pass" : "Own it";
    },
    statusClass() {
      switch (this.task.status) {
        case "done":
          return { backgroundColor: "blue" };
          break;
        case "pendingPass":
          return { backgroundColor: "yellow" };
          break;
        default:
        case "active":
          return { backgroundColor: "green" };
          break;
      }
    },
    userProfilePicSrc() {
      if (this.task.helperId) {
        let user = this.$store.getters.currUser;
        return user.imgSrc;
      } else return "";
    }
  }
};
</script>

<style scoped lang="scss">
.task-card {
  position: relative;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  font-size: 30px;
  flex-grow: 1;
  max-width: 500px;
  background-color: #fffdda;
  padding: 15px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}
.task-status-containter {
  margin: 10px 0;
}
.task-status {
  width: 10px;
  height: 10px;
  border-radius: 100px;
  display: inline-block;
  margin-right: 5px;
}
h4 {
  display: inline;
  text-transform: capitalize;
}
h2 {
  font-size: 20px;
}
h5 {
  display: inline;
  font-size: 14px;
}
h3 {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.task-card-title {
  font-weight: bolder;
  font-family: "Helvetica Neue", sans-serif;
}
img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 40px;
}
.task-points-container {
  position: absolute;
  top: 50px;
  right: 10px;
}
.task-points {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  font-size: 10px;
  font-weight: bolder;
}
.task-points-star {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 5px;
}
</style>

 
 