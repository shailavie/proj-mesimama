<template>
  <section>
    <div class="toy-list-container">
      <ul class="toys-items">
        <li v-for="currTask in tasks" :key="currTask._id">
          <task-preview :task="currTask"></task-preview>
        </li>
      </ul>
    </div>
    <!-- {{tasks}} -->
  </section>
</template>

<script>
import taskPreview from "./taskPreview.vue";

export default {
  props: ["tasks"],
  components: {
    taskPreview
  }
};
</script>

<style scoped lang="scss">
ul {
  display: grid;
}
</style>
