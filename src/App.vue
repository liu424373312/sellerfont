<template>
  <div id="app">
    <homeheader v-if="$route.name!='login'&$route.name!='register'&$route.name!='authorize'"></homeheader>
    <router-view></router-view>
  </div>
</template>

<script>
import homeheader from "./components/home-header/home-header";
export default {
  name: "App",
  components: {
    homeheader
  },
  created(){
  }
};
</script>

<style>
#app {
  background-color: #f8f8f8;
}
</style>
