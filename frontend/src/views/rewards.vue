<template>
  <div v-if="canLoad">
    <section v-if="user && !user.isDirector" class="section">
      <h1>Hey {{user.name}}</h1>
      <br>
      Enjoy your rewards!
      <br>
      <br>
      <masonry :cols="3" :gutter="5">
        <figure v-for="(url,idx) in pics" :key="idx" class="img-container">
          <img :src="url" class="gallery-item">
        </figure>
      </masonry>
      <br>
      <br>
      <h2>{{user.name}}, you have {{user.score}} points, do some tasks and open more rewards!</h2>
      <br>
      <br>
      <masonry :cols="3" :gutter="5">
        <figure v-for="(url,idx) in nextRewards" :key="idx" class="img-container">
          <img :src="url" class="next-reward gallery-item">
        </figure>
      </masonry>
    </section>
    <section v-else class="section">
      <div class="row">
        <div class="col-md-12">
          <input
            type="file"
            class="form-control"
            v-on:change="upload($event.target.files)"
            accept="image/*"
          >
        </div>
      </div>

      <h1>Hey {{user.name}}</h1>
      <h2>Enjoy your rewards!</h2>
      <masonry :cols="3" :gutter="5">
        <figure v-for="(url,idx) in urls" :key="idx" class="img-container">
          <img :src="url" class="gallery-item">
        </figure>
      </masonry>
    </section>
  </div>
</template>

<script>
import imgService from '../services/img-service.js'
export default {
  data() {
    return {
      cloudinary: {
      },
      canLoad: false
    };
  },
  methods: {
     upload(file) {
        this.$store.dispatch({ type: "uploadImg", file });
    }
  },
  async created() {
    await this.$store.dispatch("loadGroup");
    await this.$store.dispatch("loadCurrDirector");
    this.canLoad = true;
  },
  computed: {
    urls() {
      let urls = this.$store.getters.urls;
      return urls;
    },
    user() {
      return this.$store.getters.currUser;
    },
    pics() {
      let urls = this.$store.getters.urls;
      return urls.slice(0, this.user.score);
    },
    nextRewards() {
      let urls = this.$store.getters.urls;
      return urls.slice(this.user.score);
    }
  }
};
</script>

<style scoped lang="scss">
.section {
  text-align: center;
}

.img-container {
  width: 100%;
  margin: 0;
  //   height: auto;
  cursor: pointer;
  overflow: hidden;
  //   &:hover .img-content-hover {
  //     // display: block;
  //   }
}
img {
  width: 100%;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}
.next-reward {
  opacity: 0.3;
  &:hover {
    transform: scale(1);
    cursor: not-allowed;
  }
}
</style>