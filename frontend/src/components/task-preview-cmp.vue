 
<template>
  <section class="task-card">
    <!-- Director actions Btn -->
    <div class="more-actions" v-if="user.isDirector" @click="toggleActions">
      <i class="fas fa-ellipsis-h"></i>
    </div>

    <!-- Floating info -->
    <div class="urgent-badge" v-if="task.isUrgent">Urgent</div>

    <!-- Card bg feel img -->
    <div class="feel-img" v-if="task.imgUrl" :style="getTaskImg(task)" alt></div>
    <div class="feel-img" v-else :style="getImgByKeyword(task)" alt></div>

    <!-- Task info -->
    <div class="task-main-content">
      <div class="task-info-container">
        <h3 class="title" @click="showTaskDetails(task._id)">{{task.title}}</h3>
        <p class="description truncate">{{task.desc}}</p>
        <div class="task-extra-info" @click="showTaskDetails(task._id)">
          <div class="task-extra-info-item">
            <img class="task-info-item" src="@/assets/icons/blogging.svg">
            <small>{{task.comments.length}}</small>&nbsp;&nbsp;
          </div>
          <div class="task-extra-info-item">
            <img class="task-info-item" src="@/assets/icons/hourglass.svg">
            <small>{{task.dueAt | moment("from", "now") }}</small>&nbsp;&nbsp;
          </div>
        </div>
      </div>

      <!-- Main actions -->
      <div
        class="main-actions-container"
        v-if="task.status !== 'done'"
        :class="{'make-transparent':!showMainActions}"
      >
        <div
          v-if="!task.helperId || task.helperId === user._id || user.isDirector"
          class="task-toggle-btn-container"
          @click.prevent="clickOnTask(task._id)"
        >
          <a class="task-action-btn-toggle">{{passOrOwnTask}}</a>
        </div>

        <div
          class="task-done-btn-container"
          v-if="task.helperId === user._id || user.isDirector && task.helperId"
          @click.prevent="markDone(task)"
        >
          <el-button title="Done!" icon="el-icon-check"></el-button>
        </div>
      </div>
    </div>

    <!-- Director actions -->
    <transition name="fade">
      <div class="director-actions" v-if="showTaskActions">
        <el-button
          title="Edit task"
          icon="el-icon-edit"
          @click.native="editTask(task._id)"
          plain
        >Edit</el-button>
        <el-button
          title="Show task"
          icon="el-icon-view"
          @click.native="showTaskDetails(task._id)"
          plain
        >Show</el-button>
        <el-button
          title="Delete task"
          icon="el-icon-delete"
          @click.native="removeTask(task._id)"
          plain
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
      user: null,
      showMainActions: true
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
      this.$router.push(`/app/details/${taskId}`);
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
      // let res2 = `https://loremflickr.com/g/320/240/${keywords}/all`;
      let bgClass = `background: url(${res1}) no-repeat 0 50%`;
      return bgClass;
    },
    getTaskImg(task) {
      let bgClass = `background: url(${
        task.imgUrl
      }) no-repeat 0 50%; background-size:cover`;
      return bgClass;
    },
    toggleActions() {
      this.showMainActions = !this.showMainActions;
      this.showTaskActions = !this.showTaskActions;
    }
  },
  computed: {
    passOrOwnTask() {
      return this.task.helperId ? "Pass" : "I'm on it!";
    },
    isShowMainActions() {
      return this.task.status !== "done" && this.showMainActions;
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

.checkmark {
  width: 12px;
  height: 12px;
  fill: white;
}

 
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
  cursor: pointer;
  filter: invert(0.4);
}

.task-extra-info:hover {
  display: flex;
  cursor: pointer;
  filter: unset;
}
.main-actions-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  flex-grow: 0.5;
  padding-right: 20px;
  transition: 0.4s;
}
.main-actions-container button {
  height: 40px;
}

@media (max-width: 420px) {
  .main-actions-container {
    justify-content: flex-end;
    padding: 25px 20px 25px 0;
  }
  a.task-action-btn-toggle {
    margin-bottom: 10px;
  }
  .task-toggle-btn-container {
    width: auto;
  }
}

.task-card {
  display: flex;
  position: relative;
  max-height: 160px;
  background-color: white;
  margin: 15px 0 15px 0;
  border-radius: 15px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  transition: 1s ease;

  .feel-img {
    flex-basis: 25%;
    flex-shrink: 0;
    object-fit: cover;
    opacity: 0.8;
    overflow: hidden;
    border-radius: 15px 0 0 15px;
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 420px) {
    .feel-img {
      background-position: center left;
    }
  }

  .task-info-container {
    padding: 15px;
    // text-transform: capitalize;
    display: flex;
    flex-grow: 1;
    flex-basis: 50%;
    flex-direction: column;
    justify-content: space-between;

    .task-info-item {
      width: 15px;
      height: 15px;
      margin: 0 5px;
    }
  }
  .more-actions {
    position: absolute;
    background-color: #fff;
    top: 10px;
    right: 15px;
    width: 15px;
    height: 15px;
    &:hover {
      color: rgba(106, 106, 231, 0.829);
    }
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
    right: -110px;
    width: 100px;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.2s ease;
    padding: 2px;

    .el-button {
      width: 100px;
      height: auto;
      align-self: right;
      margin: 0;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: left;
      &:hover {
        background-color: transparent;
        border: none;
        box-shadow: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .director-actions {
    right: 50px !important;
  }
}

.task-extra-info-item {
  display: flex;
  align-items: center;
}

.description {
  font-size: 14px;
}
.truncate {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
  text-transform: capitalize;
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
$border: #dcdfe6;
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
  height: 40px;
  z-index: 1;
  text-align: center;
}

.task-toggle-btn-container {
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
  cursor: pointer;
  overflow: hidden;
}

.task-action-btn-toggle {
  display: inline-block;
  padding: 9px;
  border: 1px solid $border;
  border-radius: 4px;
  transition: $hover;
  position: relative;
  margin-right: 5px;
  overflow: hidden;
  cursor: pointer;
  width: 85px;
  height: 40px;

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
.task-main-content {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 550px) {
  .task-main-content {
    flex-direction: column;
  }
  .main-actions-container {
    padding-bottom: 15px;
  }
  .task-card {
    max-height: none;
  }
}

.make-transparent {
  visibility: hidden;
}
</style>

 
 