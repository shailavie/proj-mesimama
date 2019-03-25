
<template>
  <section>
    <div class="container">
      <div class="tasks-container style">
        <div class="img-container">
          <img src="../assets/icons/high-five.svg" alt srcset>
        </div>
        <!-- <div class="text-container">
          <small>Done</small>
          <br>
          <small>35</small>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
img {
  height: 35px;
  width: 35px;
}
.container {
  text-align: center;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px auto;
  padding: 0px 20px;
  text-align: center;
}
.tasks-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  small:first-child {
    color: #666;
  }
}
.style {
}
.img-container {
  filter: invert(0.2);
  max-width: 48px;
}
.text-container {
  font-size: 16px;
  width: 48px;
}
</style>
