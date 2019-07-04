<template>
  <div id="app">
    <!--<router-view></router-view>-->


    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!--<loading v-model="isLoading"></loading>-->


  </div>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  name: 'app' ,
  created(){

  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
