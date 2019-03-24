<template>
  <section class="gallery">
    <masonry :cols="3" :gutter="5">
      <figure v-for="i in 9" :key="i" class="img-container">
            <img :src="imgSrc(i)" class="gallery-item">
      </figure>
    </masonry>
  </section>
</template>

<script>
export default {
  methods: {
    imgSrc(i) {
      return require(`@/assets/img/baby${i}.jpg`);
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">


.img-container {
  width: 100%;
  margin: 0;
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
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
