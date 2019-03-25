<template>
  <div id="home">
    <header class="wrapper">
      <header-cmp/>
    </header>
    <main>
      <div>
          <router-view/>
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