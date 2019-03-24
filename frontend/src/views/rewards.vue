<template>
<section>
    <h1>rewards</h1>
    <ul>
       <li v-for="(url,idx) in urls" :key="idx"><img :src=url alt="" srcset=""></li> 
    </ul>
</section>
</template>

<script>
export default {
data(){
    return {
        urls:['https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500','https://images.pexels.com/photos/789786/pexels-photo-789786.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500']
    }
}
}
</script>

<style>

</style>
