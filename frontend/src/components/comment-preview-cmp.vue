 
<template>
  <section>
    <div class="comment-container">
      <img class="user-avater" :src="comment.userImg" alt>
      <div class="comment-body">
        <h3>{{comment.txt}}</h3>
        <h6>
          {{comment.likes}}
          | {{comment.createdAt | moment("from","now")}}
          <span></span>
        </h6>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "commentPreview",
  props: ["comment"],
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
h3 ,h6{
  margin: 0;
}
</style>

 
 