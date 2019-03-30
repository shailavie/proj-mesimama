<template>
  <div v-if="canLoad">
    <section v-if="user && !user.isDirector" class="section">
      <h1>Hey {{user.name}}</h1>
      <h2>Enjoy your rewards!</h2>
      <masonry :cols="3" :gutter="5">
        <figure v-for="(url,idx) in pics" :key="idx" class="img-container">
          <img :src="url.url" class="gallery-item">
        </figure>
      </masonry>
      <h2>{{user.name}}, you have {{user.score}} points, do some tasks and get more rewards!</h2>
      <masonry :cols="3" :gutter="5">
        <figure v-for="(url,idx) in nextRewards" :key="idx" class="img-container">
          <img :src="url" class="next-reward gallery-item">
        </figure>
      </masonry>
    </section>
    <section v-else class="section">
      <h1>Hey {{user.name}}</h1>
      <h2>Enjoy your rewards!</h2>

      <!-- Director's gallery -->
      <masonry :cols="3" :gutter="15">
        <!-- Upload a new image -->
        <label class="upload-file flex column center-all">
          <h2>+</h2>
          <h5>Choose an image</h5>
          <input
            type="file"
            class="form-control"
            v-on:change="upload($event.target.files)"
            accept="image/*"
          >
        </label>
        <figure v-for="(url,idx) in urls" :key="idx" class="img-container">
          <div class="gallery-item">
            <img :src="url.url">
            <button class="delete-img" @click="deleteImg(url)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </figure>
      </masonry>
    </section>
  </div>
</template>

<script>
import imgService from "../services/img-service.js";
export default {
  data() {
    return {
      cloudinary: {},
      canLoad: false
    };
  },
  methods: {
    upload(file) {
      this.$store.dispatch({ type: "uploadImg", file });
    },
    deleteImg(url) {
      console.log(url);
      this.$store.dispatch({ type: "deleteImg", url });
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
@import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

h2 {
  margin: 30px 0;
}
.gallery-item {
  position: relative;
}
.delete-img {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  background-color: transparent;
  border: none;
  transition: 0.4s ease;
  font-size: 20px;
  &:hover {
    color: rgb(56, 57, 126);
    transform: rotate(15deg);
  }
}

.upload-file {
  width: 100%;
  height: 220px;
  margin-bottom: 10px;
  border: 2px dashed lightblue;
  font-size: 20px;
  color: lightblue;
  cursor: pointer;
}
.form-control {
  position: absolute;
  opacity: 0;
}
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