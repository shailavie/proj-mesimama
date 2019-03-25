<template>
  <section v-if="user" class="section">
    <h1>Hey {{user.name}}, here are your rewards: </h1>
    <masonry :cols="3" :gutter="5">
      <figure v-for="(url,idx) in pics" :key="idx" class="img-container">
            <img :src="url" class="gallery-item">
      </figure>
    </masonry>
    <h2>{{user.name}}, you have {{user.score}} points, do some tasks and open more rewards!</h2>
        <masonry :cols="3" :gutter="5">
      <figure v-for="(url,idx) in nextRewards" :key="idx" class="img-container">
            <img :src="url" class="next-reward gallery-item">
      </figure>
    </masonry>
  </section>
</template>

<script>
export default {
  data() {
    return {
      urls: [
        "https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "https://images.pexels.com/photos/789786/pexels-photo-789786.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        'https://images.pexels.com/photos/265960/pexels-photo-265960.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/161709/newborn-baby-feet-basket-161709.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/266098/pexels-photo-266098.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/459957/pexels-photo-459957.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/1166473/pexels-photo-1166473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/826734/pexels-photo-826734.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/1296145/pexels-photo-1296145.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/356274/pexels-photo-356274.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/377058/pexels-photo-377058.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/266039/pexels-photo-266039.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/459953/pexels-photo-459953.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/713959/pexels-photo-713959.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/266004/pexels-photo-266004.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/590471/pexels-photo-590471.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      ]
    };
  },
  computed:{
      user(){
          return this.$store.getters.currUser
      },
      pics(){
         return this.urls.slice(0,this.user.score)
      },
      nextRewards(){
          return this.urls.slice(this.user.score)
      }
  }
};
</script>

<style scoped lang="scss">
.section{
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
.next-reward{
    opacity: 0.3;
      &:hover {
    transform: scale(1);
    cursor: not-allowed;
  }
}
</style>