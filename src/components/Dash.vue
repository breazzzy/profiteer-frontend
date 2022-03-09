<script setup>
import pLineChart from "./pLineChart.vue";
import StockInfo from "./StockInfo.vue";
</script>

<template >
<!-- boostrap -->
  <nav class="navbar navbar-light bg-light p-3" style="background-color: #e3f2fd;">
    <div
      class="d-flex p-0 col-12 col-md-1 col-lg-1 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between"
    >
      <a class="navbar-brand" href="#"> profiteer </a>
      <!-- <button
        class="navbar-toggler d-md-none collapsed mb-3"
        type="button"
        data-toggle="collapse"
        data-target="#sidebar"
        aria-controls="sidebar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->
    </div>
    <div class="col-12 col-md-4 col-lg-2">
      <input
        class="form-control form-control-dark"
        type="text"
        v-model="search"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
    <button @click="submit"></button>
    <div
      class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0"
    >
      <!-- <div class="mr-3 mt-1">
        <a
          class="github-button"
          href="https://github.com/themesberg/simple-bootstrap-5-dashboard"
          data-color-scheme="no-preference: dark; light: light; dark: light;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star /themesberg/simple-bootstrap-5-dashboard"
          >Star</a
        >
      </div> -->
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Account
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <!-- <li><a class="dropdown-item" href="#">Messages</a></li> -->
          <li><a class="dropdown-item" href="#">Sign out</a></li>

          <li><a class="dropdown-item" href="/register">Register</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Dashboard area -->
  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebar"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <p>Sidebar</p>
        <!-- sidebar content -->
      </nav>
      <!-- Stock Info -->
      <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
        <h1 class="h2">
          <!-- <div class="card">
            <h5 class="card-header">CHART</h5>
            <div class="card-body">
              <pLineChart />
              <h5 class="card-title">D#####</h5>
            </div>
          </div> -->
          <StockInfo ref="stockView" :searched_symbol="what_to_search"/>
        </h1>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      what_to_search: "GME",
      search: "",
    };
  },
  methods: {
    async submit() {
      console.log("Search for " + this.search + " submited");
      this.what_to_search = this.search;
    },
  },
};
</script>

<style>

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 90px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.navbar {
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}



@media (min-width: 767.98px) {
  .navbar {
    top: 0;
    position: sticky;
    z-index: 999;
  }
}

</style>
