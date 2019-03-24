<template>
  <section v-if="taskToEdit" class="task-edit-page">
    <div class="task-edit-container">
      <!-- <div class="task-img-container">
        <img :src="user.imgSrc">
      </div>-->
      <div class="task-edit-form-container">
        <el-form @submit.native.prevent="saveTask" :model="taskToEdit" label-width="100px">
          <el-form-item label="Title">
            <el-input type="text" v-model="taskToEdit.title"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" v-model="taskToEdit.desc"></el-input>
          </el-form-item>
          <el-form-item label="Points">
            <el-input type="number" v-model="taskToEdit.points"></el-input>
          </el-form-item>
          <el-form-item label="Urgent task?">
            <el-switch type="checkbox" v-model="taskToEdit.isUrgent"></el-switch>
          </el-form-item>
          <el-form-item label="Due to">
            <el-date-picker
              v-model="taskToEdit.dueAt"
              type="datetime"
              placeholder="Select date and time"
              :picker-options="pickerOptions"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-button class="save-btn" type="primary" @click.native.prevent="saveTask">Save Task</el-button>
          <el-button
            v-if="taskToEdit._id"
            class="remove-btn"
            type="secondary"
            @click.native.prevent="removeTask"
          >Delete Task</el-button>
        </el-form>
      </div>
    </div>

    <div class="task-details">
      <h4>
        <span>Title:</span>
        {{taskToEdit.title}}
      </h4>
      <h4>
        <span>Description:</span>
        {{taskToEdit.desc}}
      </h4>
      <h4>
        <span>Points:</span>
        {{taskToEdit.points}}
      </h4>
      <h4>
        <span>Urgent Task:</span>
        {{taskToEdit.isUrgent}}
      </h4>
      <h4>
        <span>Due to :</span>
        {{taskToEdit.dueAt}}
      </h4>
    </div>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import taskService from "../services/task-service.js";
import utilService from "../services/util-service.js";

export default {
  name: "taskEdit",
  components: {},
  data() {
    return {
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
    console.log("taskId", taskId);
    if (taskId) {
      let taskToEdit = await this.$store.dispatch({
        type: "loadTask",
        taskId
      });
      this.taskToEdit = utilService.deepCopy(taskToEdit);
    } else {
      this.taskToEdit = taskService.getEmptyTask();
    }
  },
  methods: {
    saveTask() {
      if (!this.taskToEdit._id) this.taskToEdit.createdAt = Date.now();
      this.taskToEdit.directorId = this.$store.getters.currDirectorId;
      this.$store.dispatch("saveTask", this.taskToEdit).then(savedTask => {
        this.$store.dispatch({ type: "loadActiveTasks" }).then(() => {
          this.$router.push("/app/tasks");
        });
      });
    },
    removeTask() {
      console.log("DELETE!", this.taskToEdit._id);
      this.$store.dispatch("removeTask", this.taskToEdit._id).then(() => {
        this.$router.push("/app/tasks");
      });
    }
  }
};
</script>

<style scoped lang="scss">
.task-edit-page {
  display: flex;
}
.task-details {
  max-width: 400px;
}
.task-edit-container {
  flex-grow: 1;
  margin: 20px;
  max-width: 500px;
}
.saveBtn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>