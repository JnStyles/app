<template>
  <div class="activeRules">
    <x-header :left-options="{backText: ''}"><a slot="left" style="padding-left:20px;font-size:20px;" @click="goIndex">×</a>活动规则</x-header>
  
    <group gutter='0'>
      <grid :show-vertical-dividers="false">
        <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
          <icon slot="icon" type="success"></icon>
        </grid-item>
      </grid>
    </group>

    <div style="line-height:50px;padding-left:15px;">常见问题</div>
    <group style="margin-top:0;">
     <cell
      title="什么是全民疯抢"
      is-link
      :border-intent="false"
      :arrow-direction="showContent001 ? 'up' : 'down'"
      @click.native="showContent001 = !showContent001"></cell>

      <p class="slide" :class="showContent001?'animate':''">blablabla...</p>

        <cell
      title="什么是全民疯抢"
      is-link
      :border-intent="false"
      :arrow-direction="showContent002 ? 'up' : 'down'"
      @click.native="showContent002 = !showContent002"></cell>

      <p class="slide" :class="showContent002?'animate':''">什么是全民疯抢什么是全民疯抢什么是全民疯抢什么是全民疯抢什么是全民疯抢...</p>

      
      </group>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        tabList:[{
          name:'新手指南',
          icon:'',
          url:'',
          id:1
        },
        {
          name:'关于配送',
          icon:'',
          url:'',
          id:2
        },
        {
          name:'参与保障',
          icon:'',
          url:'',
          id:3
        },
        {
          name:'服务协议',
          icon:'',
          url:'',
          id:4
        }],
         showContent001: false,
         showContent002: false,
      }
    },
   
    methods:{
      //回首页
      goIndex(){
        console.log('回首页')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
  }
  .dt img{
    width:100px;
    height:100px;
  }
  .dd{
    padding-left:10px;
  }
  .num{
    display: flex;
    font-size:12px;
    padding-top: 6px;
  }
  .num span{
    color:red;
  }
  .dd_box{
    display:flex;
    justify-content:space-between;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>
<style>
.activeRules .weui-cells{
  margin-top:0;
}
</style>

