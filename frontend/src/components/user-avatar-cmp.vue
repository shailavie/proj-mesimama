<template>
  <span class="user-avatar" :style="avatarBackgroundImgStyle"></span>
</template>

<script>
export default {
  props: ["url"],
  computed: {
    avatarBackgroundImgStyle() {
      return {
        backgroundImage: `url(${this.url})`
      };
    }
  }
};
</script>

<style scoped>
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background-size: cover;
  background-position: center;
}
</style>