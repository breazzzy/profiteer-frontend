<template>
  <div>
    <h1>Register</h1>
    <input
      type="text"
      v-model="username"
      name="username"
      placeholder="Username"
    />
    <input
      type="text"
      v-model="password"
      name="password"
      placeholder="Password"
    />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
// import { defineComponent } from "@vue/composition-api";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password,
      });
      console.log(response.data);
    },
  },
};
</script>

<style scoped></style>
