<template>
  <section v-if="taskToDisplay" class="task-details-page">
    <task-preview
      :task="taskToDisplay"
      @task-owned="ownTask($event)"
      @task-passed="passTask($event)"
      @task-edit="editTask($event)"
    ></task-preview>
    <task-comments
      :comments="task.comments"
      :newComment="newComment"
      :user="currUser"
      @task-new-comment="addNewComment($event)"
    ></task-comments>
  </section>
</template>


<script>
import taskService from "../services/task-service.js";
import utilService from "../services/util-service.js";
import taskComments from "../components/task-comments-cmp.vue";
import taskPreview from "../components/task-preview-cmp.vue";
import userService from "../services/user.service.js";

export default {
  name: "taskDetails",
  components: {
    taskComments,
    taskPreview
  },
  data() {
    return {
      task: null,
      currUser: null,
      newComment: null
    };
  },
  async created() {
    let user = await userService.getCurrUser();
    let taskId = this.$route.params.taskId;
    if (taskId) {
      this.task = await this.$store.dispatch({
        type: "loadTask",
        taskId
      });
    }
    this.currUser = user;
    this.newComment = taskService.getEmptyComment(this.currUser._id);
    console.log("NEW COMMENT FROM SERVICE", this.newComment);
  },
  methods: {
    ownTask(taskId) {
      this.$store.dispatch("ownTask", taskId);
    },
    passTask(taskId) {
      this.$store.dispatch("passTask", taskId);
    },
    editTask(taskId) {
      this.$router.push("/app/edit/" + taskId);
    },
    addNewComment(comment) {
      let commentCopy = utilService.deepCopy(comment)
      commentCopy._id = utilService.makeId()
      this.task.comments.push(commentCopy); //OPTIMISTIC
      this.$store.dispatch("saveTask", this.task);
      this.newComment = taskService.getEmptyComment(this.currUser._id);
    }
  },
  computed: {
    urgentTaskBadge() {
      return this.taskToDisplay.isUrgent ? "Urgent task" : "";
    },
    taskToDisplay() {
      return this.task;
    }
  }
};
</script>

<style scoped lang="scss">
@import url("http://fonts.googleapis.com/css?family=Reenie+Beanie:regular");

.task-details-page {
  display: flex;
  justify-content: space-around;
}
.task-details {
  max-width: 400px;
}
.task-details-container {
  font-size: 30px;
  flex-grow: 1;
  margin: 20px;
  max-width: 400px;
  background-color: #fcf7b7;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transform: rotate(-2deg);
}
h5 {
  font-size: 16px;
}
</style>