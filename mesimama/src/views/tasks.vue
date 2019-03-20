<template>
  <section class="task-list-page">
    <el-tooltip :content="value5" placement="top">
      <el-switch
        v-model="value5"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="My Tasks"
        inactive-value="Open Tasks"
       
      ></el-switch>
    </el-tooltip>
    <button @click="toggleTasks">show my tasks</button>
    <task-list-cmp :tasks="tasksToShow" @task-owned="ownTask($event)"></task-list-cmp>
  </section>
</template>


<script>
import taskListCmp from "../components/task-list-cmp.vue";
import {Button} from 'element-ui'
export default {
  name: "tasksPage",
  components: {
    taskListCmp
  },
  data() {
    return {
      value5: '100',
      showMyTasks: false,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadUnownedTasks" })

  },
  computed: {
    tasksToShow() {
          return (!this.showMyTasks)? 
          this.$store.getters.filteredTasks.filter(task => task.ownerId === null) 
          :  this.$store.getters.filteredTasks.filter(task => task.ownerId !== null) 
    }
  },
  methods: {
    ownTask(taskId) {
      console.log("taskS PAGE: task is owened", taskId);
      this.$store.dispatch("setTaskOwner", taskId);
      // TO DO : update the store about task status and move it to the user's tasks
    },
    toggleTasks(){
      console.log('switch')
      this.showMyTasks = !this.showMyTasks
    }
  }
};
</script>

<style scoped lang="scss">
</style>