<template>
  <router-link :to="'/app/my-account/'+userId">
    <div class="user-avatar" :style="avatarBackgroundImgStyle"></div>
  </router-link>
</template>

<script>
export default {
  props: ["url", "userId"],
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
  cursor: pointer;
}
</style>