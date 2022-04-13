<template>
  <div id="about">
    <h1>About</h1>
    <p>This website was created as a capstone project for my associates.</p>
    <p>Front end uses Vue.js, D3.js, Axios, Bootstrap, Popper and Pinia</p>
    <p>Back end written in Node.js</p>
    <div class="container">
      <div class="row">
        <div class="col-1" style="vertical-align: middle">
          <i class="bi bi-github" style="font-size: 64px"></i>
          <!-- <a> <img src="@/assets/mark-github.svg" width="100" height="50" /></a> -->
        </div>
        <div class="col-5" id="labelForGit">
          <span style="font-size: 24px">Github <br /> </span
          ><span id="" style="font-size: 10px"
            ><a href="https://github.com/breazzzy/profiteer-frontend"
              >Frontend</a
            >&emsp;&emsp;
            <a id="" href="https://github.com/breazzzy/profiteer-backend"
              >Backend</a
            ></span
          >
        </div>
        <div class="col-6">
          <i class="bi bi-linkedin" style="font-size: 64px"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
#about {
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%,-50%);
}
i {
  vertical-align: middle;
}
#labelForGit {
  vertical-align: middle;
  line-height: 20px;
  margin: auto;
  padding: 20px;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New";
}
p,
h1,
span {
  /* border: 3px solid green; */
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
  padding: 10px;
}
</style>
