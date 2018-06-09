<template>
  <div id="home">
      <homegheader></homegheader>
      <homegrids></homegrids>
  </div>
</template>

<script>
import homegrids from '../../../components/home-grids/home-grids'
import homegheader from '../../../components/home-header/home-header'
import axios from 'axios';
import qs from 'qs';
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
