<template>
  <button @click="testAuth"></button>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";
import { UserStore } from "@/stores/UserStore";
export default {
  methods: {
    async testAuth() {
      const store = UserStore();
      console.log(store);
      await AuthenticationService.testAuth({ data: store.state.token });
    },
  },
};
</script>
//importing bootstrap 5 Modules
