<template>
  <body>
    <div class="card">
      <div class="card-header">
        <h1>Register</h1>
      </div>
      <div class="card-body">
        <input
          type="text"
          v-model="username"
          name="username"
          placeholder="Username"
        />
        <input
          type="password"
          v-model="password"
          name="password"
          placeholder="Password"
        />
        <button @click="register">Register</button>
        <button @click="login">Login</button>
      </div>
    </div>
  </body>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
// import LoginService from "@/services/LoginService";
// import { defineComponent } from "@vue/composition-api";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password,
      });
      console.log(response.data.message);
      if (!response.data.user) {
        console.log("Wrong Password");
        alert("Wrong Password");
      } else {
        this.$router.push("/");
      }
    },
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

<style scoped>
body {
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.card {
  margin: 0 auto;
  /* margin-top: ; */
  width: 40%;
  /* height: 100%; */

  /* padding-bottom: 10px;   */
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: lightgray;
}
.card-body {
  display: inline;
}
</style>
