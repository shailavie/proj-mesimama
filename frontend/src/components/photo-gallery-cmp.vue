<template>
<div v-if="canLoad">
  <section v-if="!user.isDirector" class="gallery">
    <h3>Hey {{user.name}}</h3>
    <h4>These are your rewards. wanna see more? click us!</h4>
    <masonry :cols="2" :gutter="5">
      <figure v-for="img in urls" :key="img._id" class="img-container">
        <img :src="img.url" class="gallery-item">
      </figure>
    </masonry>
    <h3>Look at all the cute pics!</h3>
    <h4 class="acomplish-gallary">Acomplish some more tasks and see them all!</h4>
    <masonry :cols="2" :gutter="5">
      <figure v-for="img in nextRewards" :key="img._id" class="img-container">
        <img :src="img.url" class="next-reward">
      </figure>
    </masonry>
  </section>
  <section v-else class="gallery">
    <h3>Hey {{user.name}}</h3>
    <h4>This is your reward gallery!</h4>
    <h5>Want to add some? click us!</h5>
    <masonry :cols="2" :gutter="5">
      <figure v-for="img in urlsForDirector" :key="img._id" class="img-container">
        <img :src="img.url" class="gallery-item">
      </figure>
    </masonry>
  </section>

</div>
</template>

<script>
export default {
  data(){
    return {
      canLoad:false
    }
  },
  async created(){
    await this.$store.dispatch("loadGroup");
    await this.$store.dispatch("loadCurrDirector");
    this.canLoad=true
  },
  methods: {
    imgSrc(i) {
      return require(`@/assets/img/baby${i}.jpg`);
    }
  },
  computed: {
    urls() {
      let urlObjArray = this.$store.getters.urls;
      let user = this.$store.getters.currUser;
      return urlObjArray.slice(0,this.user.score);
    },
    user() {
      return this.$store.getters.currUser;
    },
    nextRewards(){
            let urlObjArray = this.$store.getters.urls;
      let user = this.$store.getters.currUser;
      return urlObjArray.slice(this.user.score);
    },
    urlsForDirector(){
      return this.$store.getters.urls;
    }
  }
};
</script>

<style scoped lang="scss">
.gallery {
  background: #fff;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 20px;
  margin: 10px 0px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-weight: 100;
  font-size: 20px;
}

.img-container {
  width: 100%;
  margin: 20px 0;
  //   height: auto;
  cursor: pointer;
  overflow: hidden;
  &:hover .img-content-hover {
    // display: block;
  }
}
img {
  width: 100%;
  transform: scale(1);
  transition: all 0.3s;
  border-radius: 8px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid blue;
  }
}
.next-reward {
  opacity: 0.3;
  &:hover {
    transform: scale(1);
    cursor: not-allowed;
  }
}
.acomplish-gallary{
  margin-bottom: 20px;
}
</style>
