 
<template>
  <section class="task-card">
    <!-- Floating drawer -->
    <el-button v-if="user.isDirector" @hover="showActions" class="more-actions" icon="el-icon-more"></el-button>
    <!-- floating info -->
    <div class="task-points-container">
      <h4 class="task-points">{{task.points}}</h4>
      <img class="task-points-coin" src="@/assets/icons/coin.svg">
    </div>
    <div class="due-container">
      <img class="star" src="/img/icons/taskTime30.png">
      <h5>For {{task.dueAt | moment("calendar")}}</h5>
    </div>
    <!-- Card bg img -->
    <img class="feel-img" :src="getImgByKeyword(task)" alt>

    <!-- <img class="user-avatar" :src="userProfilePicSrc" alt> -->
    <div class="container">
      <div class="info">
        <h2 class="title">{{task.title}}</h2>
        <h3>{{task.desc}}</h3>

        <div class="status-containter">
          <div class="status" :style="statusClass"></div>
          <h5>{{task.status}}</h5>
        </div>
      </div>
      <div class="task-actions">
        <el-button v-if="task.helperId" type="primary" @click.native="markDone(task)">Done!</el-button>
        <el-button :type="buttonClass" @click.native="clickOnTask(task._id)">{{buttonText}}</el-button>
        <el-button
          title="Edit task"
          type="primary"
          icon="el-icon-edit"
          circle
          @click.native="editTask(task._id)"
        ></el-button>
        <el-button
          title="Delete task"
          type="danger"
          icon="el-icon-delete"
          circle
          @click.native="removeTask(task._id)"
        ></el-button>
        <el-button
          title="Delete task"
          type="warning"
          icon="el-icon-view"
          circle
          @click.native="detailsTask(task._id)"
        ></el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      showActions: false,
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
      this.$emit('task-done',task)
    },
    removeTask(taskId) {
      this.$emit("task-remove", taskId);
    },
    getImgByKeyword(task) {
      let keywords = task.title.split(" ").join(",");
      let res1 = `https://source.unsplash.com/160x90/?${keywords}`;
      let res2 = `https://loremflickr.com/g/320/240/${keywords}/all`;
      return res1;
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
  display: flex;
  position: relative;
  width: 460px;
  height: 170px;
  background-color: white;
  margin: 15px;
  font-size: 30px;
  flex-grow: 1;
  margin: 10px;
  border-radius: 15px;

  .feel-img {
    max-width: 200px;
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

  .task-actions {
    display: flex;
    justify-content: space-around;
  }

  .task-points-container {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    left: 10px;
    opacity: 1;
    z-index: 2;
  }
  .task-points {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 11px;
    font-weight: bolder;
  }
  .task-points-coin {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 5px;
    color: white;
    fill: white;
  }
  .more-actions {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    border: none;
    transform: rotate(90deg);
    text-align: center;
    background-color: transparent;
  }
  .due-container {
    position: absolute;
    bottom: 10px;
    left: 10px;
    opacity: 1;
    z-index: 2;
  }
  // box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
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
  right: 10px;
  border-radius: 40px;
}
</style>

 
 