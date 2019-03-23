 
<template>
  <section v-if="user">
    <div class="comment-container">
      <user-avater-cmp :url="user.avatarUrl"/>
      <div class="comment-body">
        <h4>{{user.name}}</h4>
        <h3>{{comment.txt}}</h3>
        <h6>{{comment.createdAt | moment("from","now")}}</h6>
      </div> 
    </div>
  </section>
</template>

<script>
import userService from "../services/user.service.js";
import userAvaterCmp from "./user-avatar-cmp.vue";

export default {
  name: "commentPreview",
  props: ["comment"],
  components: {
    userAvaterCmp
  },
  data() {
    return {
      user: null
    };
  },
  async created() {
    let user = await userService.getUserById(this.comment.userId);
    this.user = user;
  },
  methods: {},
  computed: {}
};
</script>

<style scoped lang="scss">
.comment-container {
  width: 90%;
  height: auto;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
}
.user-avater {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid gray;
}
.comment-body {
  margin-left: 15px;
  // background-color: red;
}
h3,
h4,
h6 {
  margin: 4px 0;
}
</style>

 
 