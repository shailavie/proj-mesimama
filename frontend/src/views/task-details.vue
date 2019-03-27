<template>
  <section v-if="taskToDisplay && userToDisplay" class="task-details">
    <div class="task-details-container">
      <div class="task-details-center-box">
        <div class="task-details-content">
          <h1>{{task.title}}</h1>
          <!-- <div><small>Points: {{task.points}}</small></div> -->
          <div class="details-tag" :class="tagStatusClass">{{task.status}}</div>
          <div v-if="task.isUrgent" class="details-tag tag-urgent">Urgent</div>
          <div class="task-details-helper" v-if="helper">
            <div class="helper-details">
              <user-avatar class="user-avatar" :url="helper.avatarUrl"/>
              <div class="helper-name">
                <strong>{{helper.name}}</strong> is on it.
              </div>
            </div>
          </div>
          <p class="details-content-desc">{{task.desc}}</p>
        </div>
        <div class="text-details-comments">
          <task-comments
            :comments="taskToDisplay.comments"
            :newComment="newComment"
            :user="userToDisplay"
            @task-new-comment="addNewComment($event)"
          ></task-comments>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import taskService from "../services/task-service.js";
import utilService from "../services/util-service.js";
import taskComments from "../components/task-comments-cmp.vue";
import taskPreview from "../components/task-preview-cmp.vue";
import userService from "../services/user.service.js";
import userAvatar from "../components/user-avatar-cmp.vue";

export default {
  name: "taskDetails",
  components: {
    taskComments,
    taskPreview,
    userAvatar
  },
  data() {
    return {
      task: null,
      currUser: null,
      newComment: null,
      helper: null
    };
  },
  async created() {
    let taskId = this.$route.params.taskId;
    if (taskId) {
      this.task = await this.$store.dispatch({
        type: "loadTask",
        taskId
      });
    }
    this.newComment = taskService.getEmptyComment();
    if (this.task.helperId) {
      this.helper = await userService.getUserById(this.task.helperId);
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
    },
    addNewComment(comment) {
      let commentCopy = utilService.deepCopy(comment);
      commentCopy._id = utilService.makeId();
      commentCopy.userId = this.userToDisplay._id;
      this.task.comments.push(commentCopy); //OPTIMISTIC
      this.$store.dispatch("saveTask", this.task);
      this.newComment = taskService.getEmptyComment(this.userToDisplay._id);
    },
    removeTask(taskId) {
      this.$store.dispatch("removeTask", taskId).then(() => {
        this.$router.push("/app/tasks");
      });
    }
  },
  computed: {
    tagStatusClass() {
      let statusClass = "tag-" + this.task.status;
      return statusClass;
    },
    taskToDisplay() {
      return this.task;
    },
    userToDisplay() {
      return this.$store.getters.currUser;
    },
    taskHelper() {
      if (this.task.helperId) {
        return userService.getUserById(this.task.helperId);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .task-details-center-box {
    flex-direction: column;
  }
}

.task-details-content {
  padding-right: 40px;
  flex-basis: 50%;
}

.details-content-desc {
  text-transform: capitalize;
}

.details-tag {
  display: inline-block;
  padding: 4px 6px;
  color: #fff;
  border-radius: 3px;
  margin-right: 3px;
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 300;
}

.tag-urgent {
  background: red;
}

.tag-active {
  background: blue;
}

.tag-done {
  background: green;
}

.task-details-helper {
  margin: 10px 0;
}

.helper-details {
  display: flex;
  align-items: center;
}

.user-avatar {
  margin-right: 10px;
}
</style>