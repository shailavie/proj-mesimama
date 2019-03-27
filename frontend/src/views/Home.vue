<template>
  <div id="home">
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

export default {
  components: {
    headerCmp
  }
};
</script>

<style scoped>
</style>