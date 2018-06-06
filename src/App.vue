<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import myheader from "./components/header/header";
export default {
  name: "App",
  components: {
    myheader
  }
};
</script>

<style>
#app {
  background-color: #f8f8f8;
}
</style>
