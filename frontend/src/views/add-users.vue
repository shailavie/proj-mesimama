<template>
  <section class="task-edit-page flex column">
    <!-- <h1 class="mb30">Invite family and friends</h1> -->
    <div class="add-new-user-container flex">
      <add-new-user @new-user="saveNewHelper($event)"/>
      <div class="flex center-ver">
        <div title="Copy link to clipboard" class="copy-link flex center-all" v-if="isNewUserReady">
          <img
            class="new-user-link"
            src="@/assets/icons/share_white.png"
            alt="share"
            v-clipboard="shareLink(newHelper._id)"
          >
        </div>
        <h5 v-if="isNewUserReady">
          Send this link to your friend:
          <span v-clipboard="shareLink(newHelper._id)">{{shareLink(newHelper._id)}}</span>
        </h5>
      </div>
    </div>
  </section>
</template>


<script>
import utilService from "../services/util-service.js";
import addNewUser from "../components/user-add-new.vue";

export default {
  name: "addUsers",
  components: {
    addNewUser
  },
  data() {
    return {
      isNewUserReady: false,
      newHelper: null
    };
  },
  async created() {},
  methods: {
    async saveNewHelper(helperToAdd) {
      console.log("got new user to save", helperToAdd);
      this.newHelper = await this.$store.dispatch({
        type: "addHelper",
        helperToAdd
      });
      console.log("huston do we have a user?", this.newHelper);
      this.isNewUserReady = true;
    },
    shareLink(helperId) {
      let newUserId = helperId ? helperId : "";
      let value = `http://www.mesimama.com/signup/${newUserId}`;
      return value;
    }
  }
};
</script>

<style scoped lang="scss">
h5 {
  margin: 40px 0 0 20px;
  color: rgb(78, 72, 72);
}
span {
  color: blue;
  cursor: pointer;
}
.add-new-user-container {
  width: 100%;
  flex-direction: column;
  flex-grow: 1;
}
@media (min-width: 850px) {
  .add-new-user-container {
    flex-direction: row;
  }
}
.new-user-link {
  height: 20px;
  width: 20px;
  // width: auto;
}
.copy-link {
  margin: 50px 0 0 10px;
  background-color: #67c23a;
  border-radius: 80%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #8aca6a;
  }
}
</style>