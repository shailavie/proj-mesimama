 
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
    </div>
  </section>
</template>

<script>
export default {
  props: ['task'], 
}
</script>

 