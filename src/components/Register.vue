<template>
  <body>
    <div class="card">
      <div class="card-header">
        <h1>Login/Register</h1>
      </div>
      <form>
        <div class="form-group">
          <label for="usernameinput">Username</label>
          <input
            type="username"
            class="form-control"
            v-model="username"
            id="usernameinput"
            placeholder="Username"
          />
        </div>
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="passwordInput"
            placeholder="Password"
          />
        </div>
      </form>

      <button class="btn btn-danger" @click="register">Register</button>
      <button class="btn btn-primary" @click="login">Login</button>
    </div>
  </body>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import { UserStore } from "@/stores/UserStore";
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
    //Both the login and register buttons are on the same screen
    //Login
    async login() {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password,
        });
        //This brings user back to main screen
        this.$router.push("/");
        const store = UserStore();
        //Stores login information
        store.setUsername(response.data.user.username);
        store.setToken(response.data.token);
        store.setLoggedin(true);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    //Register
    async register() {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          password: this.password,
          balance: 0,
        });
        alert("Account created " + response.data.username);
      } catch (error) {
        alert(error.response.data.error);
      }
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
