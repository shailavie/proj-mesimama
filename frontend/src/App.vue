<template>
  <div id="app" >
    <router-view/>
    <notifications group="foo"/>
    <div class="test"></div>
  </div>
</template>

<script>
 
</script>
<style lang="scss" scoped>
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    color: black;
    border-left-color: #42a85f;
  }
}
</style>
