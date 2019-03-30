<template>
  <section class="flex column center-all">
    <div class="empty-state-inner-container">
      <h2>No Tasks?</h2>
      <img class="empty-state-img" src="/img/icons/emptyState.png">
      <h4>Me and mom have a nickname for people with no tasks..</h4>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.empty-state-container{
    min-width: 420px;
}
.empty-state-inner-container{}
.empty-state-img{
    width: 200px;
}
</style>
