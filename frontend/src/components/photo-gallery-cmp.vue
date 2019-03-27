<template>
  <section class="gallery">
    <masonry :cols="2" :gutter="5">
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
  transition: all 0.3s;
  border-radius: 8px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid blue;
  }
}
</style>
