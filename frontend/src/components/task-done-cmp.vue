<template>
    <section class="task-done-container">
        <div class="task-done-inner-container flex column center-all space-between">
            <h1>TASK COMPLETED!</h1>
            <h2>There's plenty of time to rest</h2>
            <h2>In the grave!</h2>
            <img src="@/assets/img/task-done1.png" alt="">
            <el-button type="primary">Take more responsiblity</el-button>
        </div>
    </section>
</template>

<script>
export default {
    name: "taskDone",
    props: ["time"],
    created(){
        setTimeout(() => {
            this.$emit('close-task-done-msg')
        }, this.time);
    }
}
</script>

<style lang="scss" scoped>
.task-done-container {
    position: absolute;
    left: 50px;
    top: 70px;
    transform: translate(-50%, -50%);
    z-index: 5;
}
.task-done-inner-container {
    position: absolute;
    background-color: white;
    width: 50vw;
    // height: 50vh;
    top: 0;
    left: 0;
    z-index: 5;
    border-radius: 8px;
    background-color: whitesmoke;
}
img {
    height: 200px;
}
</style>
