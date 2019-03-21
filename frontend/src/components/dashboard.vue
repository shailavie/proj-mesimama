
<template>
  <section>
      <div class="container">
          <div class="done-tasks-container style">
              <div class="img-container"><img src="../assets/icons/done.svg" alt="" srcset=""></div>
              <div class="text-container">35 done tasks, great job!</div>
          </div>
          <div class="appending-tasks-container style">
              <div class="img-container"><img src="../assets/icons/clock.svg" alt="" srcset=""></div>
              <div class="text-container"> 4 tasks are awaiting for a helper, maybe we should contact grandpa?</div>
          </div>
          <div class="working-tasks-container style">
              <div class="img-container"><img src="../assets/icons/working.svg" alt="" srcset=""></div>
              <div class="text-container">6 tasks are in process, dont forget to thanks the helpers!</div>
          </div>
      </div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
img{
    height: 60px;
    width: 60px;
}
.container{
    text-align: center;

}
.style{
        margin: 0 auto;
        width: 200px;
        margin-top: 10px;
        display: flex;
    // height: 200px;
    text-align: left;
    align-items: center;
}

</style>
