



<template>
  <section>
    <button @click="own">own task</button>
    <button @click="add">add task</button>
    <button @click="done">done with task</button>
  </section>
</template>

<script>
import socketService from "@/services/socket.service.js";
export default {
  data() {
    return {};
  },
  methods: {
    own() {
      console.log("got to own");
      socketService.emit('owningTask','this-task-ID')

    },
    add() {
      console.log("got to add");
      socketService.emit("addedTask", "new-task-ID");
    },
    done() {
      console.log("got to done");
      socketService.emit("finishedTask", "this-task-ID");
    }
  }
};
</script>

<style>
</style>
