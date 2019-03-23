<template>
  <section v-if="taskToDisplay" class="task-details-page">
  <task-preview
            :task="taskToDisplay"
            @task-owned="ownTask($event)"
            @task-passed="passTask($event)"
            @task-edit="editTask($event)"
          ></task-preview>
    </div>
    <task-comments :comments="comments"></task-comments>
  </section>
</template>


<script>
import taskService from "../services/task-service.js";
import utilService from "../services/util-service.js";
import taskComments from "../components/task-comments-cmp.vue";
import taskPreview from "../components/task-preview-cmp.vue";

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
      comments: [
        {
          _id: "21312",
          userId: "4234gd",
          userImg:'https://pickaface.net/gallery/avatar/alyssa.luck.5653c47e3a515ee.png',
          userName : 'Yair',
          txt: "I'm on it!",
          createdAt: Date.now(),
          likes: 1
        },
        {
          _id: "21313",
          userId: "4234gd2",
          userImg: 'http://admissionsmom.college/wp-content/themes/admissionsmom/media/avatar_2x.png',
          userName: 'Sara',
          txt: "B A M A!",
          createdAt: Date.now(),
          likes: 0
        }
      ]
    };
  },
  async created() {
    let taskId = this.$route.params.taskId;
    if (taskId) {
      this.task = await this.$store.dispatch({
        type: "loadTask",
        taskId
      });
    } else {
      console.log("SOMETHING WENT WRONG - TASK WAS NOT FOUND");
    }

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
    }
  },
  computed: {
    urgentTaskBadge() {
      return this.taskToDisplay.isUrgent ? "Urgent task" : "";
    },
    taskToDisplay(){
      return this.task
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
  transform: rotate(-2deg)
}
h5 {
  font-size: 16px;
}

</style>