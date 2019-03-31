<template>
  <section v-if="taskToEdit" class="task-edit-page flex">
    <div class="task-edit-container flex column center-hor">
        <!-- Task Edit/Add form -->
        <div class="task-title-container">
          <h1>Add Task</h1>
        </div>
        <!-- {{windowWidth}} -->
        <el-form
          @submit.native.prevent="saveTask"
          :model="taskToEdit"
          label-width="120px"
          label-position="top"
          class="edit-task-form"
        >
          <!-- Title -->
          <el-form-item label="Title">
            <div class="flex form-input">
              <el-input
                type="text"
                :maxlength="25"
                v-model="taskToEdit.title"
                placeholder="Enter task title.."
                clearable
              ></el-input>
              <speech-to-text
                class="speech-to-text-btn"
                :text.sync="taskToEdit.title"
                @speechend="speechEnd"
              ></speech-to-text>
            </div>
          </el-form-item>

          <!-- Desription -->
          <el-form-item label="Description">
            <div class="flex form-input">
              <el-input
                type="textarea"
                rows="3"
                class="form-input"
                v-model="taskToEdit.desc"
                placeholder="Enter some more info.."
              ></el-input>
              <div>
                <speech-to-text
                  class="speech-to-text-btn"
                  :text.sync="taskToEdit.desc"
                  @speechend="speechEnd"
                ></speech-to-text>
              </div>
            </div>
          </el-form-item>
          <!-- Points -->
          <el-form-item label="Task Points">
            <el-slider class="form-input" v-model="taskToEdit.points" :min="1" :max="3" show-stops></el-slider>
          </el-form-item>
          <!-- Urgency -->
          <el-form-item label="Urgent">
            <el-switch type="checkbox" active-color="#f45642" v-model="taskToEdit.isUrgent"></el-switch>
          </el-form-item>
          <!-- Due date -->
          <el-form-item label="Due to">
            <el-date-picker
              v-model="taskToEdit.dueAt"
              type="datetime"
              placeholder="Select date and time"
              :picker-options="pickerOptions"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>

          <label class="upload-file flex column center-all">
            <h2>+</h2>
            <h5>Choose an image</h5>
            <input
              type="file"
              class="form-control"
              v-on:change="uploadTaskImg($event.target.files)"
              accept="image/*"
            >
          </label>

          <div v-if="taskToEdit.imgUrl">
            <img class="uploaded-task-img" :src="taskToEdit.imgUrl" alt>
          </div>

          <!-- Assign to -->
          <el-form-item label="Assign task to">
            <el-select v-model="taskToEdit.helperId" placeholder="Optional">
              <el-option label="None" :value="null"></el-option>
              <el-option label="Me" :value="directorId"></el-option>
              <el-option v-for="user in group" :key="user._id" :label="user.name" :value="user._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- Main CTA -->

          <el-form-item>
            <el-button
              v-if="taskToEdit._id"
              class="remove-btn"
              type="danger"
              @click.native.prevent="removeTask"
              circle
              icon="el-icon-delete"
            ></el-button>
            <el-button
              class="save-task-btn"
              type="success"
              @click.native.prevent="saveTask"
            >Save Task</el-button>
          </el-form-item>
        </el-form>
      </div>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import taskService from "../services/task-service.js";
import utilService from "../services/util-service.js";
import imgService from "../services/img-service.js";
import speechToText from "../components/speech-to-text-cmp.vue";
import shakeService from "../services/shake-service.js";

export default {
  name: "taskEdit",
  components: {
    speechToText
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      text: "",
      text2: "",
      sentences: null,
      sentences2: null,
      group: [],
      taskToEdit: null,
      directorId: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  async created() {
    let taskId = this.$route.params.taskId;
    if (taskId) {
      let taskToEdit = await this.$store.dispatch({
        type: "loadTask",
        taskId
      });
      this.taskToEdit = utilService.deepCopy(taskToEdit);
    } else {
      this.taskToEdit = taskService.getEmptyTask();
      this.taskToEdit.dueAt = this.sameHourTommorrow();
    }

    // Generating an "Assign to" list and removing the director
    this.group = utilService.deepCopy(this.$store.getters.currGroup);
    this.directorId = this.$store.getters.currDirectorId;
    let directorIdx = this.group.findIndex(
      user => user._id === this.directorId
    );
    this.group.splice(directorIdx, 1);

    var shakeEvent = new Shake({ threshold: 15 });
    shakeEvent.start();
    window.addEventListener("shake", this.handleShake, false);

    //stop listening
    function stopShake() {
      shakeEvent.stop();
    }

    //check if shake is supported or not.
    if (!("ondevicemotion" in window)) {
      alert("Not Supported");
    }
  },
  destyroyed() {
    window.removeEventListener("shake", this.handleShake, true);
  },
  methods: {
    async uploadTaskImg(file) {
      let url = await imgService.uploadImg(file);
      this.taskToEdit.imgUrl = url;
    },
    handleShake() {
      this.taskToEdit.title = "";
      this.taskToEdit.desc = "";
    },
    speechEnd({ sentences, text }) {
      this.sentences = sentences;
    },
    saveTask() {
      if (!this.taskToEdit._id) this.taskToEdit.createdAt = Date.now();
      this.taskToEdit.directorId = this.directorId;
      this.taskToEdit.points = Number(this.taskToEdit.points);
      this.$store.dispatch("saveTask", this.taskToEdit).then(savedTask => {
        this.$store.dispatch({ type: "loadUsersWithTasks" }).then(() => {
          this.$router.push("/app/tasks");
        });
      });
    },
    removeTask() {
      this.$store.dispatch("removeTask", this.taskToEdit._id).then(() => {
        this.$router.push("/app/tasks");
      });
    },
    sameHourTommorrow() {
      return Date.now() + 1000 * 60 * 60 * 24;
    }
  }
};
</script>

<style scoped lang="scss">
.task-edit-container {
  background-color: #fff;
  width: 100vw;
  margin: 0;
}
.form-control {
  position: absolute;
  opacity: 0;
}
.upload-file {
  width: 220px;
  height: 220px;
  border: 2px dashed lightblue;
  font-size: 20px;
  color: lightblue;
  cursor: pointer;
}
@media (max-width: 500px) {
  .remove-btn {
    margin: 0 auto;
    margin-bottom: 120px;
  }
  .save-task-btn {
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: 0;
    left: 0;
    font-size: 20px;
  }
}
.el-form-item {
  font-weight: bolder;
}
.uploaded-task-img {
  width: 300px;
  // height: auto;
}
@media (max-width: 768px) {
  .task-edit-page {
    margin-top: -40px;
    background-color: white;
  }
  .form-input {
    width: 200px;
    margin-right: 10px;
  }
}

.task-details {
  max-width: 400px;
}
.task-edit-container {
  flex-grow: 1;
  margin: 20px;
  max-width: 500px;
}
.form-input {
  width: 300px;
  margin-right: 10px;
}
.speech-to-text-btn {
  display: inline-block;
  margin-left: 10px;
}
.edit-task-form {
  padding: 40px;
  background-color: #fff;
}

.task-title-container {
  padding: 40px 0 0 40px;
  background: #fff;
  color: #333;
  font-size: 50%;
}

.task-edit-center-box {
  padding: 0;
  flex-direction: column;
}

.upload-file {
  margin: 20px 0;
}

@media (max-width: 450px) {
  .el-form--label-top .el-form-item__label {
    display: none;
  }
}
</style>