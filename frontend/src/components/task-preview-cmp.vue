 
<template>
  <section class="task-card">
    <!-- Floating drawer -->
    <el-button
      v-if="user.isDirector"
      @click.native="toggleActions"
      class="more-actions"
      icon="el-icon-more"
    ></el-button>

    <!-- floating info -->
    <user-avatar class="user-avatar" :url="userProfilePicSrc"/>
    <div class="due-container">
      <img class="star" src="/img/icons/taskTime30.png">
      <h5>For {{task.dueAt | moment("calendar")}}</h5>
    </div>

    <!-- Card bg img -->
    <!-- <img class="feel-img" :src="getImgByKeyword(task)" alt> -->
    <div class="feel-img" :class="{'blur' : showTaskActions}" :style="getImgByKeyword(task)" alt></div>

    <!-- Task info -->
    <div class="container">
      <div class="info">
        <h2 class="title">{{task.title}}</h2>
        <p class="description truncate">{{task.desc}}</p>
      </div>

      <div class="main-actions-container">
        <el-button v-if="task.helperId" type="primary" @click.native="markDone(task)">Done!</el-button>
        <el-button :type="buttonClass" @click.native="clickOnTask(task._id)">{{buttonText}}</el-button>
      </div>

      <!-- Task actions -->
      <div class="task-actions" v-show="showTaskActions" :class="{'blur' : !showTaskActions}">
        <el-button title="Edit task" icon="el-icon-edit" @click.native="editTask(task._id)">Edit</el-button>
        <el-button title="Show task" icon="el-icon-view" @click.native="detailsTask(task._id)">Show</el-button>
        <el-button
          title="Delete task"
          icon="el-icon-delete"
          @click.native="removeTask(task._id)"
        >Delete</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import userAvatar from "./user-avatar-cmp.vue";

export default {
  props: ["task"],
  components: {
    userAvatar
  },
  data() {
    return {
      showTaskActions: false,
      user: null
    };
  },
  created() {
    this.user = this.$store.getters.currUser;
  },
  methods: {
    clickOnTask(taskId) {
      if (!this.task.helperId) {
        this.$emit("task-owned", taskId);
      } else {
        this.$emit("task-passed", this.task);
      }
    },
    detailsTask(taskId) {
      this.$router.push(`details/${taskId}`);
    },
    editTask(taskId) {
      this.$emit("task-edit", taskId);
    },
    markDone(task) {
      this.$emit("task-done", task);
    },
    removeTask(taskId) {
      this.$emit("task-remove", taskId);
    },
    getImgByKeyword(task) {
      let keywords = task.title.split(" ").join(",");
      let res1 = `https://source.unsplash.com/320x240/?${keywords}`;
      let res2 = `https://loremflickr.com/g/320/240/${keywords}/all`;
      let bgClass = `background: url(${res1}) no-repeat 0 50%`;
      return bgClass;
    },
    toggleActions() {
      console.log("toggle!");
      this.showTaskActions = !this.showTaskActions;
    }
  },
  computed: {
    blur() {
      return "{filter: blur(4px)}";
    },
    buttonClass() {
      return this.task.helperId ? "secondary" : "secondary";
    },
    buttonText() {
      return this.task.helperId ? "Pass" : "Take it!";
    },
    userProfilePicSrc() {
      if (this.task.helperId) {
        let user = this.$store.getters.currUser;
        return user.avatarUrl;
      } else return "";
    }
  }
};
</script>

<style scoped lang="scss">
.main-actions-container {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  margin-top: 30px;
}
.task-card {
  display: flex;
  position: relative;
  width: 450px;
  height: 170px;
  background-color: white;
  margin: 15px;
  font-size: 30px;
  flex-grow: 1;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  transition: 1s ease;

  .feel-img {
    width: 200px;
    height: 170px;
    object-fit: cover;
    opacity: 0.7;
    overflow: hidden;
    border-radius: 15px 0 0 15px;
  }
  .container {
    padding: 15px;
    text-transform: capitalize;
  }

  .more-actions {
    position: absolute;
    top: 0px;
    right: 10px;
    width: 30px;
    height: 30px;
    border: none;
    // transform: rotate(90deg);
    text-align: center;
    background-color: transparent;
  }
  .due-container {
    position: absolute;
    bottom: 10px;
    left: 10px;
    opacity: 1;
  }
  .task-actions {
    position: absolute;
    top: 0;
    left: 5px;
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    transition: 1s ease;

    .el-button {
      width: 80px;
      align-self: right;
      margin: 0;
      background-color: transparent;
      mix-blend-mode: difference;
      border: none;
      // color: #fff;
      &:hover {
        color: rgb(100, 131, 218);
      }
    }
  }
}
.description {
  width: 200px;
  font-size: 14px;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blur {
  filter: blur(4px);
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
// h3 {
//   font-size: 14px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }
.task-card-title {
  font-weight: bolder;
  font-family: "Helvetica Neue", sans-serif;
}
.star {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 40px;
  z-index: 1;
}
</style>

 
 