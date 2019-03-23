 
<template>
  <section>
    <div class="task-comments-container">
      <ul class="tasks-comments">
        <li v-for="currComment in comments" :key="currComment._id">
          <comment-preview :comment="currComment"></comment-preview>
        </li>
      </ul>
      <div class="add-comment-container">
        <img class="user-avater" :src="comments[0].userImg" alt>
        <el-input placeholder="Enter comment"/>
      </div>
    </div>
  </section>
</template>

<script>
import commentPreview from "./comment-preview-cmp.vue";

export default {
  name: "taskComments",
  props: ["comments"],
  components: {
    commentPreview
  },
  created(){
      this.newComment = ''
  },
  data(){
      return {
          newComment : {
          _id: "21312",
          userId: "4234gd",
          userImg:'https://pickaface.net/gallery/avatar/alyssa.luck.5653c47e3a515ee.png',
          userName : 'Yair',
          txt: "I'm on it!",
          createdAt: Date.now(),
          likes: 1
        },
      }
  },
  methods: {},
  computed: {}
};
</script>

<style scoped lang="scss">
.task-comments-container {
  width: 300px;
  height: auto;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 8px;
  margin: 10px;
}
.user-avater {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid gray;
  margin-right: 15px;
}
.add-comment-container {
  padding: 10px;
  display: flex;
}
</style>

 
 