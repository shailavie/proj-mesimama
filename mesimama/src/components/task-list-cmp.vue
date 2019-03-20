<template>
  <section>
    <div class="toy-list-container">
      <ul class="toys-items">
        <li v-for="currTask in tasks" :key="currTask._id">
          <task-preview 
            :task="currTask"
            @task-owned="ownTask($event)"
            >
            </task-preview>
        </li>
      </ul>
    </div>
    <!-- {{tasks}} -->
  </section>
</template>

<script>
import taskPreview from './taskPreview.vue'

export default {
  props: ['tasks'],
  components: {
    taskPreview
  },
  methods: {
      ownThis(taskId){
      console.log('task list: task is owened',taskid)
      this.$emit('task-owned',taskId)
    }
  },
};
</script>

<style scoped lang="scss">
ul {
    list-style-type: none;
}
li {
    margin: 0;
}

</style>
