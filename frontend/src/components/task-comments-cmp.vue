 
<template>
  <section>
    <div class="task-comments-container">
      <ul class="tasks-comments">
        <li v-for="currComment in comments" :key="currComment._id">
          <comment-preview :comment="currComment"></comment-preview>
        </li>
      </ul>
      <div v-show="newCommentToEdit" class="add-comment-container">
        <!-- <user-avater-cmp :url="user.avatarUrl" :userId="user._id"/> -->
        <el-input
          v-model="newCommentToEdit.txt"
          @keyup.native.enter="addNewComment"
          placeholder="Add a comment..."
        />
      </div>
    </div>
  </section>
</template>

<script>
import commentPreview from "./comment-preview-cmp.vue";
import userAvaterCmp from "./user-avatar-cmp.vue";
import utilService from "../services/util-service.js";

export default {
  name: "taskCommentsCmp",
  props: ["comments", "newComment", "user"],
  components: {
    commentPreview,
    userAvaterCmp
  },
  data() {
    return {
      newCommentToEdit: null
    };
  },
  created() {
    this.newCommentToEdit = utilService.deepCopy(this.newComment);
    // this.newCommentToEdit =  this.newComment
  },
  methods: {
    addNewComment() {
      this.newCommentToEdit.createdAt = Date.now();
      this.$emit("task-new-comment", this.newCommentToEdit);
      this.newCommentToEdit.txt = "";
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.task-comments-container {
  height: auto;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 8px;
}
.add-comment-container {
}
.user-avater-cmp {
  margin-right: 10px;
}
</style>

 
 