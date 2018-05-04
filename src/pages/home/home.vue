<template>
  <div id="home">
      <homegheader></homegheader>
      <homegrids ref="homegrids"></homegrids>
  </div>
</template>

<script>
import homegrids from '../../components/home-grids/home-grids'
import homegheader from '../../components/home-header/home-header'
import axios from 'axios';
import qs from 'qs';
const API_PROXY = 'https://bird.ioliu.cn/v1?url=';
export default {
  data(){
    return {

    }
  },
  created() {
  },
  methods:{
  },
    components:{
        homegrids,
        homegheader
    }
}
</script>

<style>
</style>
