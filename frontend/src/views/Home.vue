<template>
  <div id="home" v-show="canLoad">
    <header>
      <header-cmp/>
    </header>
    <main>
      <div>
        <div class="wrapper">
          <router-view/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import headerCmp from "@/components/header.vue";
import Axios from "axios";

var axios = Axios.create({
  withCredentials: true
});
export default {
  components: { 
    headerCmp
  },
  computed: {},
  data() {
    return {
      canLoad: false
    };
  },
  async created() {
    await this.$store.dispatch({ type: "setCurrUser" }).then(() => {
      console.log("app created");
      this.canLoad = true;
    });
  }
};
</script>

<style scoped>
</style>

