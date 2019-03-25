 
<template>
  <section v-if="userToDisplay">
    <div class="comment-container">
      <user-avater-cmp :url="user.avatarUrl" class="user-avatar-comments"/>
      <div class="comment-body">
        <div class="comment-user-name">
          <strong>{{user.name}}</strong>
        </div>
        <small style="margin:0; display:block;color:#333;">{{comment.txt}}</small>
        <small>{{comment.createdAt | moment("from","now")}}</small>
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
    // let user = await userService.getUserById(this.comment.userId);
    let user = await userService.getUserById(this.comment.userId);
    console.log("GOT USER FROM SERVICE:", user);
    this.user = user;
  },
  methods: {},
  computed: {
    userToDisplay() {
      return this.user;
    }
  }
};
</script>

<style scoped lang="scss">
.comment-container {
  height: auto;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
}
.user-avatar-comments {
  flex-basis: 48px;
}
.comment-body {
  flex-shrink: 10;
  margin-left: 10px;
}

h3,
h4,
h6 {
  margin: 4px 0;
}

.comment-user-name {
  text-transform: capitalize;
  margin-bottom: 0.2em;
}
small {
  color: #999;
}
</style>

 
 