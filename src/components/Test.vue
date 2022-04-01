<template>
  <div class="container p-5">
    <h1 class="mb-5">therichpost.com</h1>
    <button
      type="button"
      class="btn btn-secondary me-2"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-placement="top"
      data-bs-content="Top popover"
    >
      Popover on top
    </button>
    <button
      type="button"
      class="btn btn-secondary me-2"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-trigger="focus"
      data-bs-animation="true"
      data-bs-placement="bottom"
      data-bs-html="true"
      data-bs-content="<div class='btn btn-danger' @click='test()'>HAGDFSGASDFGDSF</div>"
    >
      Popover tester
    </button>
    <button
      type="button"
      class="btn btn-secondary me-2"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-placement="bottom"
      data-bs-content="Bottom popover"
    >
      Popover on bottom
    </button>
    <button
      type="button"
      class="btn btn-secondary me-2"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-placement="left"
      data-bs-content="Left popover"
    >
      Popover on left
    </button>

    <Popper content="This is the Popper content 🍿" arrow>
      <button class="btn btn-primary">Click me</button>
      <template #content>
        <div class="d-flex justify-content-center">
          <input
            type="username"
            class="form-control"
            v-model="test_input"
            id="usernameinput"
            placeholder="Amount $$$"
          />
          <button class="btn btn-primary" @click="test">Confirm</button>
        </div>
      </template>
    </Popper>
    <button class="btn btn-primary">test</button>
  </div>
</template>
<script>
//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Popover } from "bootstrap/dist/js/bootstrap.esm.min.js";
import Bootstrap from "bootstrap/dist/js/bootstrap.min.js";
export default {
  data() {
    return {
      test_input: null,
    };
  },

  setup() {
    var myDefaultAllowList = Bootstrap.Tooltip.Default.allowList;
  },
  mounted() {
    //inti Popover
    Array.from(
      document.querySelectorAll('button[data-bs-toggle="popover"]')
    ).forEach((popoverNode) => new Popover(popoverNode));
  },
  methods: {
    test() {
      alert(this.test_input);
    },
  },
};
</script>
<style>
:root {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
