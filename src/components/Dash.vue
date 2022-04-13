<script setup>
import StockInfo from "./StockInfo.vue";
import BuySellService from "@/services/BuySellService.js";
import { UserStore } from "@/stores/UserStore";
import Sidebar from "./Sidebar.vue";
const store = UserStore();
</script>

<template>
  <!-- boostrap -->
  <nav
    class="navbar navbar-light bg-light p-3 position-sticky"
    style="background-color: #e3f2fd"
  >
    <div
      class="d-flex p-0 col-12 col-md-1 col-lg-1 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between"
    >
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo_profiteer.svg" width="150" height="50" />
      </a>
    </div>
    <div class="col-12 col-md-4 col-lg-2" id="searchBar">
      <input
        class="form-control form-control-dark"
        type="text"
        v-model="search"
        placeholder="Search"
        @keydown.enter="submit"
        aria-label="Search"
      />
    </div>
    <button class="btn btn-info" @click="submit">
      <i class="bi bi-search"> Search</i>
    </button>
    <div
      class="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0"
    >
      <div class="mr-3 mt-1">
        <a
          class="btn btn-outline-danger"
          href="https://github.com/breazzzy/profiteer-frontend"
          target="_blank"
          ><i class="bi bi-github"></i>Github</a
        >
      </div>

      <div class="dropdown">
        <button
          class="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle"></i> Account &nbsp;
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a class="dropdown-item" href="/about">
              <i class="bi bi-info-square"></i> About</a
            >
          </li>
          <!-- <li><a class="dropdown-item" href="#">Messages</a></li> -->
          <li>
            <a class="dropdown-item" @click="signout" href="#"
              ><i class="bi bi-box-arrow-left"></i> Sign out</a
            >
          </li>

          <li>
            <a class="dropdown-item" href="/register"
              ><i class="bi bi-box-arrow-in-right"></i> Login/Register</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Dashboard area -->
  <div class="container-fluid">
    <div class="row">
      <!-- Stock Info -->
      <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
        <h1 class="h2">
          <!-- watch_data is a prop that passes in the current logged in users watched stocks -->
          <Sidebar
            :searchQuery="searchQuery"
            @updateSearchedSymbol="searchQuery = $event"
          />
          <StockInfo ref="stockView" :searchQuery="searchQuery" />
        </h1>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "GME",
      search: "",
    };
  },
  methods: {
    //Submit button for search bar
    async submit() {
      console.log("Search for " + this.search + " submited");
      this.searchQuery = this.search;
    },
    //Signout
    async signout() {
      const store = UserStore();
      store.logout();
    },
  },
};
</script>

<style scoped>
/* import for icons */
@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css);
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

.navbar-brand{
  padding-right: 20px;
}

@media (min-width: 767.98px) {
  .navbar {
    top: 0;
    position: sticky;
    z-index: 999;
  }
}

#searchBar{
  padding-left: 40px;
}
</style>
