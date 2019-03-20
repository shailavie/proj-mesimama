 
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
    ownTask(taskId){
      console.log('tasl is being taken',taskId)
      this.$emit('task-own',taskId)
    }
  },
}
</script>

 <style scoped lang="scss">
button {
  width: 100px;
  height: 40px;
  background-color: rebeccapurple;
  color: white;
  border-radius: 8px;
  transition: .3s ease;
}
button:hover {
  background-color: rgb(119, 82, 156);
}
 </style>