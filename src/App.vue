<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <MyHeader />
    </div>
  </header> -->

  <div>
    <router-view></router-view>
  </div>

  <body>
    <!-- <Dash /> -->
  </body>

  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>

<script>
// import MyHeader from "./components/MyHeader.vue";
// import Dash from "./components/Dash.vue";
// import TheWelcome from "./components/TheWelcome.vue";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import { Popover } from "bootstrap/dist/js/bootstrap.esm.min.js";
// export default {
//   mounted() {
//     //inti Popover
//     console.log("App started");
//     Array.from(
//       document.querySelectorAll('button[data-toggle="popover"]')
//     ).forEach((popoverNode) => new Popover(popoverNode));
//   },
// };
</script>

<style>
@import "./assets/base.css";
</style>
