 
<template>
  <section v-if="newUserToAdd">
    <div class="flex">
      <el-form class="add-new-user flex space-between" label-position="top" label-width="120px">
        <!-- new user name -->
        <el-form-item label="Name">
          <el-input
            v-model="newUserToAdd.name"
            @keyup.native.enter="addNewComment"
            placeholder="Enter a friend / relative name"
          />
        </el-form-item>

        <!-- new user email -->
        <el-form-item
          prop="email"
          label="Email"
          :rules="[
            { required: true, 
            message: 'Enter your email address', 
            trigger: 'blur' },
            { type: 'email', 
            message: 'Please enter a correct email address', 
            trigger: ['blur'] }
            ]"
        >
          <el-input v-model="newUserToAdd.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="add-new-user-btn" @click="addNewUser" type="success">Get invite link</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import userAvaterCmp from "./user-avatar-cmp.vue";
import utilService from "../services/util-service.js";

export default {
  name: "addNewUser",
  components: {
    userAvaterCmp
  },
  data() {
    return {
      newUserToAdd: {
        isDirector: false,
        directorId: null,
        name: "",
        email: null,
        password: ""
      }
    };
  },
  async created() {
    this.newUserToAdd.directorId = await this.$store.getters.currUser._id;
    console.log("got user:", this.newUserToAdd);
  },
  methods: {
    async addNewUser() {
      await this.$emit("new-user", this.newUserToAdd);
      setTimeout(() => {
        this.newUserToAdd.name = "";
        this.newUserToAdd.email = "";
      }, 3000);
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.add-new-user {
  width: 650px;
  flex-direction: column;
}
@media (min-width: 850px) {
  .add-new-user {
    flex-direction: row;
  }
}
.el-input {
  width: 250px;
}
.add-new-user-btn {
  margin-top: 50px;
}
</style>

 
 