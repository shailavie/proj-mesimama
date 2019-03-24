<template>
  <div id="app">
    <router-view/>
    <notifications group="foo" />
<div class="test">
</div>
  </div>
</template>

<script>
export default {
  computed:{
  },
  created(){
    this.$store.dispatch({type: 'setCurrUser'})
    .then(()=>{
      // console.log('WE HAVE USER!')
    })
  }
}
</script>
<style lang="scss" scoped>

.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
 
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
 
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #68CD86;
    color: black;
    border-left-color: #42A85F;
  }
}
</style>
