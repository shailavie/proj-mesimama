 
<template>
  <section class="task-card">
    <div class="task-card-container">
    <img class="user-avatar" :src="userProfilePicSrc" alt="">
      <div class="task-card-info">
        <h2 class="task-card-title">{{task.title}}</h2>
        <h3>{{task.desc}}</h3>
          <img src="/img/icons/taskTime30.png"/>
        <h5>
          For {{task.dueAt | moment("calendar")}}
        </h5>
        <div class="task-status-containter">
          <div class="task-status" :style="statusClass"></div>
          <h4>{{task.status}}</h4>
        </div>
      </div>
      <el-button v-if="task.helperId" type="primary" @click="markDone(task._id)">Done!</el-button>
      <el-button :type="buttonClass" @click="clickOnTask(task._id)">{{buttonText}}</el-button>
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
        this.$emit("task-passed", taskId);
      }
    }
  },
  computed: {
    buttonClass() {
      return this.task.helperId ? "secondary" : "primary";
    },
    buttonText() {
      return this.task.helperId ? "Pass Task" : "Own this Task";
    },
    statusClass(){
      switch (this.task.status){
        case 'done' : 
          return {'backgroundColor': 'blue'}
          break;
        case 'pendingPass' : 
          return {'backgroundColor': 'yellow'}
          break;
        default:
        case 'active' : 
          return {'backgroundColor': 'green'}
          break;
      }
    },
    userProfilePicSrc(){
      let src = `https://api.adorable.io/avatars/50/${this.task.helperId}.png`
      console.log(src)
      return src
    }
  }
};
</script>

<style scoped lang="scss">
.task-card {
  position: relative;
}
.task-status-containter {
  margin: 10px 0;
}
.task-status {
  width: 10px;
  height: 10px;
  // background-color: red;
  border-radius: 100px;
  display: inline-block;
  margin-right: 5px;
}
h4 {
  display: inline;
  text-transform: capitalize;
}
h5 {
  display: inline;
}
h3 {
  font-size: 14px;
}
.task-card-title {
  font-weight: bolder;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
</style>

 
 