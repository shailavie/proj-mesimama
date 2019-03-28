<template>
  <section v-if="taskToEdit" class="task-edit-page">
    <div class="task-details-container">
      <div class="task-details-center-box">
        <!-- Task Edit/Add form -->
        <div class="task-title-container">
          <h1>Add Task</h1>
        </div>
        <el-form
          @submit.native.prevent="saveTask"
          :model="taskToEdit"
          label-width="120px"
          label-position="left"
          class="edit-task-form"
        >
          <!-- Title -->
          <el-form-item label="Title">
            <el-input
              type="text"
              class="form-input"
              :maxlength="25"
              v-model="taskToEdit.title"
              clearable
            ></el-input>
            <speech-to-text
              class="speech-to-text-btn"
              :text.sync="taskToEdit.title"
              @speechend="speechEnd"
            ></speech-to-text>
          </el-form-item>
          <!-- Desription -->
          <el-form-item label="Description">
            <el-input type="textarea" rows="3" class="form-input" v-model="taskToEdit.desc"></el-input>
            <speech-to-text
              class="speech-to-text-btn"
              :text.sync="taskToEdit.desc"
              @speechend="speechEnd"
            ></speech-to-text>
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

          <div class="row">
            <div class="col-md-12">
              <input
                type="file"
                class="form-control"
                v-on:change="uploadTaskImg($event.target.files)"
                accept="image/*"
              >
            </div>
          </div>
          <div v-if="taskToEdit.imgUrl">
            <img :src="taskToEdit.imgUrl" alt>
          </div>

          <!-- Assign to -->
          <el-form-item label="Assign task to">
            <el-select v-model="taskToEdit.helperId" placeholder="Optional">
              <el-option label="Everyone" :value="null"></el-option>
              <el-option label="Me" :value="directorId"></el-option>
              <el-option v-for="user in group" :key="user._id" :label="user.name" :value="user._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- Main CTA -->

          <el-form-item>
            <el-button type="success" @click.native.prevent="saveTask">Save Task</el-button>
            <el-button
              v-if="taskToEdit._id"
              class="remove-btn"
              type="secondary"
              @click.native.prevent="removeTask"
            >Delete Task</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <textarea v-model="text" label="The text" cols="30" rows="10"></textarea>
    <speech-to-text :text.sync="text" @speechend="speechEnd"></speech-to-text>-->
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
      text: "",
      text2: "",
      sentences: null,
      sentences2: null,
      group: [],
      selectedHelperId: null,
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
    this.group = utilService.deepCopy(this.$store.getters.currGroup);
    this.directorId = this.$store.getters.currDirectorId;
    let directorIdx = this.group.findIndex(
      user => user._id === this.directorId
    );
    this.group.splice(directorIdx, 1); // removing the director

    var shakeEvent = new Shake({ threshold: 15 });
    shakeEvent.start();
    window.addEventListener("shake", handleShake, false);

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
      // this.$store.dispatch({type:'uploadTaskImg',file})
      let url = await imgService.uploadImg(file);
      this.taskToEdit.imgUrl = url;
    },
    handleShake() {
      console.log('shake shake shake')
      if (confirm("Start over?")) {
        this.taskToEdit.title = ''
        this.taskToEdit.desc = 'Shai you are genius'
      }
    },
    speechEnd({ sentences, text }) {
      console.log("text", text);
      console.log("sentences", sentences);
      this.sentences = sentences;
    },
    speechEnd2({ sentences, text }) {
      console.log("text", text);
      console.log("sentences", sentences);
      this.sentences2 = sentences;
    },
    saveTask() {
      if (!this.taskToEdit._id) this.taskToEdit.createdAt = Date.now();
      this.taskToEdit.directorId = this.directorId;
      this.taskToEdit.helperId - this.selectedHelperId;
      console.log("TASK TO SAVE:", this.taskToEdit);
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
  },
  computed: {}
};
</script>

<style scoped lang="scss">
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
}
.edit-task-form {
  width: 600px;
  padding: 40px;
}

.task-title-container {
  padding: 40px 0 0 40px;
  background: #fff;
  color: #333;
  font-size: 50%;
}

.task-details-center-box {
  padding: 0;
  flex-direction: column;
}
</style>