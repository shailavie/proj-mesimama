 
<template>
  <section class="task-card">
    <!-- Director actions Btn -->
    <el-button
      v-if="user.isDirector"
      @click.native="toggleActions"
      class="more-actions"
      icon="el-icon-more"
    ></el-button>

    <!-- Floating info -->
    <div class="urgent-badge" v-if="task.isUrgent">Urgent</div>

    <!-- Card bg feel img -->
    <div class="feel-img" v-if="task.imgUrl" :style="getTaskImg(task)" alt></div>
    <div class="feel-img" v-else :style="getImgByKeyword(task)" alt></div>

    <!-- Task info -->
    <div class="task-info-container">
      <h3 class="title" @click="showTaskDetails(task._id)">{{task.title}}</h3>
      <p class="description truncate">{{task.desc}}</p>
      <div class="task-extra-info" @click="showTaskDetails(task._id)">
        <img class="task-info-item" src="@/assets/icons/hourglass.svg">
        <small>{{task.dueAt | moment("from", "now") }}</small>&nbsp;&nbsp;
        <img class="task-info-item" src="@/assets/icons/blogging.svg">
        <small>{{task.comments.length}}</small>&nbsp;&nbsp;
        <img class="task-info-item" src="@/assets/icons/information.svg">
        <small>more info</small>&nbsp;
      </div>
    </div>

    <!-- Main actions -->
    <div class="main-actions-container" > 
      <!-- v-if="user.isDirector || user._id === task.helperId" -->
      <div
        v-if="!task.helperId || task.helperId === user._id || user.isDirector"
        class="task-toggle-btn-container"
        @click.prevent="clickOnTask(task._id)"
      >
        <a class="task-action-btn-toggle">
          {{passOrOwnTask}}
          <img v-if="task.helperId" class="checkmark" src="@/assets/icons/pass.svg">
        </a>
      </div>

      <div class="task-done-btn-container" v-if="task.helperId === user._id || user.isDirector && task.helperId" @click.prevent="markDone(task)">
        <a class="task-action-btn-done">
          Done
          <img class="checkmark" src="@/assets/icons/checked.svg">
        </a>
      </div>
    </div>

    <!-- Director actions -->
    <transition name="fade">
      <div class="director-actions" v-if="showTaskActions">
        <el-button title="Edit task" icon="el-icon-edit" @click.native="editTask(task._id)">Edit</el-button>
        <el-button
          title="Show task"
          icon="el-icon-view"
          @click.native="showTaskDetails(task._id)"
        >Show</el-button>
        <el-button
          title="Delete task"
          icon="el-icon-delete"
          @click.native="removeTask(task._id)"
        >Delete</el-button>
      </div>
    </transition>
  </section>
</template>

<script>

export default {
  props: ["task"],
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
    showTaskDetails(taskId) {
      this.$router.push(`details/${taskId}`);
    },
    editTask(taskId) {
      this.$emit("task-edit", taskId);
    },
    markDone(task) {
      console.log('at preview')
      this.$emit("task-done", task);
    },
    removeTask(taskId) {
      this.$emit("task-remove", taskId);
    },
    getImgByKeyword(task) {
      let keywords = task.title.split(" ").join(",");
      let res1 = `https://source.unsplash.com/320x240/?${keywords}`;
      // let res2 = `https://loremflickr.com/g/320/240/${keywords}/all`;
      let bgClass = `background: url(${res1}) no-repeat 0 50%`;
      return bgClass;
    },
    getTaskImg(task) {
      let bgClass = `background: url(${task.imgUrl}) no-repeat 0 50%`;
      return bgClass;
    },
    toggleActions() {
      this.showTaskActions = !this.showTaskActions;
    }
  },
  computed: {
    passOrOwnTask() {
      return this.task.helperId ? "Pass" : "I'm on it!";
    },
  }
};
</script>

<style scoped lang="scss">
.checkmark {
  width: 12px;
  height: 12px;
  fill: white;
}

// .urgent-badge {
//   position: absolute;
//   bottom: 0px;
//   left: 120px;
//   width: 420px;
//   height: 2px;
//   background-color: rgb(224, 83, 83);
// }

.urgent-badge {
  position: absolute;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  top: -15px;
  left: -10px;
  z-index: 2;
  background-color: red;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}
.task-extra-info {
  display: flex;
}
.main-actions-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  margin: 20px;
  width: 170px;
}
.task-card {
  display: flex;
  position: relative;
  width: 650px;
  height: 120px;
  background-color: white;
  margin: 15px 0 15px 0;
  border-radius: 15px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  transition: 1s ease;

  .feel-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    opacity: 0.8;
    overflow: hidden;
    border-radius: 15px 0 0 15px;
  }
  .task-info-container {
    padding: 15px;
    padding-left: 20px;
    // text-transform: capitalize;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .task-info-item {
      width: 15px;
      height: 15px;
      margin: 0 5px;
    }
  }
  .more-actions {
    position: absolute;
    top: 0px;
    right: 15px;
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
  .director-actions {
    position: absolute;
    top: 0;
    right: -100px;
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
  width: 220px;
  font-size: 14px;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h4 {
  display: inline;
  text-transform: capitalize;
}
h3 {
  font-size: 20px;
  margin: 0;
}
h5 {
  display: inline;
  font-size: 14px;
}

.title {
  cursor: pointer;
}

 

// Animations

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
  transform: translateX(0px);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-20px);
}

//FONT IMPORT

//HOVER TRANSITION
$hover: all 0.2s ease-in;
$slide: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);

//COLORS
$grey: #5f5f5f;
$border: #bdbdbd;
$white: #ffffff;
$green: #39bda7;
$red: #c76161;
$transparent: rgba(255, 255, 255, 0);
$black-05: rgba(0, 0, 0, 0.05);

a {
  text-decoration: none;
  color: $grey;
}

//CODEPEN BUTTON
.task-done-btn-container {
  width: 75px;
  height: 40px;
  z-index: 1;
  text-align: center;
  margin-left: 10px;
}

.task-toggle-btn-container {
  width: 75px;
  height: 40px;
  z-index: 1;
  text-align: center;
  // margin-left: 10px;
}

.task-action-btn-done {
  display: inline-block;
  padding: 9px;
  border: 1px solid $border;
  border-radius: 4px;
  transition: $hover;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: $black-05;
    border-radius: 50%;
    display: block;
    transition: $slide;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: $green;
    border-radius: 50%;
    display: block;
    transition: $slide;
    z-index: -1;
  }

  &:hover {
    color: $white;
    border: 1px solid $green;

    &:before {
      top: -35%;
      background-color: $green;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    &:after {
      top: -45%;
      background-color: $green;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
  }
}

.task-action-btn-toggle {
  display: inline-block;
  padding: 9px;
  border: 1px solid $border;
  border-radius: 4px;
  transition: $hover;
  position: relative;
  overflow: hidden;
  width: 85px;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: $black-05;
    border-radius: 50%;
    display: block;
    transition: $slide;
    z-index: -1;
  }

  &:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: $red;
    border-radius: 50%;
    display: block;
    transition: $slide;
    z-index: -1;
  }

  &:hover {
    color: $white;
    border: 1px solid $red;

    &:before {
      top: -35%;
      background-color: $red;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }

    &:after {
      top: -45%;
      background-color: $red;
      transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
  }
}
</style>

 
 