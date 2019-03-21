<template>
  <section class="login">
    <select v-model="role">
      <option value="5c93538ced3d88a4b25d83ad">Helper</option>
      <option value="5c93538ced3d88a4b25d83ac">Director</option>
    </select>
    <button @click="setRole">Set Role</button>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      role: ""
    };
  },
  methods: {
    async setRole() {
        let test = await axios.post('http://localhost:3003/api/users/setuser',{userId:this.role})
    }
  }
};
</script>