 
<template>
  <section class="task-card">
    <div class="task-card-container">
      <div class="task-card-info">
        <h2>{{task.title}}</h2>
        <h3>{{task.desc}}</h3>
        <h4>{{task.createdAt | moment("dddd, MMMM Do YYYY")}}</h4>
        <h4>{{task.dueAt | moment("dddd, MMMM Do YYYY")}}</h4>
        <h4>{{task.status}}</h4>
      </div>
      <button @click="ownTask(task._id)">Own this Task</button>
    </div>
  </section>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    ownThis(taskId){
      console.log('task is owened',taskid)
      this.$emit('task-owned',taskId)
    }
  },
}
</script>

<style scoped lang="scss">
  .task-card {
    margin: 0;
    width: 100%;
    height: 100px;
    background-color: lightgray;
    margin-bottom: 5px;
    padding: 5px;
  }
  h2 {
    font-size: 16px;
  }
  h3 {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

 