<template>
  <div
    @click="linkToProfile"
    class="user-avatar"
    :class="{'large': profileImg}"
    :style="avatarBackgroundImgStyle"
    :title="nameToTitle"
  ></div>
</template>

<script>
export default {
  props: ["url", "user", "profileImg", "clickable"],
  methods: {
    linkToProfile() {
      if (this.clickable === false) return;
      this.$router.push("/app/user-profile/" + this.user._id);
    }
  },
  computed: {
    avatarBackgroundImgStyle() {
      return {
        backgroundImage: `url(${this.url})`
      };
    },
    nameToTitle() {
      return `${this.user.name}'s profile`;
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
  border: 1px solid #ececec;
}
.large {
  width: 168px;
  height: 168px;
  border: 3px solid white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>