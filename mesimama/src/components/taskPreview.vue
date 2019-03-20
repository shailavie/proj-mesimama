 
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
      <el-button :type="buttonClass" @click="ownTask(task._id)">{{buttonText}}</el-button>
    </div>
  </section>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    ownTask(taskId){
      console.log('task is owened',taskId)
      this.$emit('task-owned',taskId)
    }
  },
  computed: {
    buttonClass(){
      return (this.task.ownerId)? "secondary" : "primary"
    },
    buttonText(){
      return (this.task.ownerId)? "Pass Task" : "Own this Task"
    }
  }
}
</script>

 
 