<template>
  <div>
    <x-header :left-options="{backText: ''}">活动动态<a slot="right" @click="goRules">活动规则</a></x-header>
   
    <panel style="margin:10px;border-radius:10px;">
        <div slot="body">
            <div class="dl">
                <div class="dt">
                    <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd">
                    <p>中国石化200元加油卡哇哈哈哈哈哈哈</p>
                    <p>幸运编码：<span>213123</span>   </p>
                </div>
            </div>
            <div class="dl">
                <div class="dt_smail">
                    <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd_smail">
                    <p>获得者：123[四川省。。。]</p>
                    <p>参与52人次 <span>揭晓时间：2019-06-01</span></p>
                </div>
            </div>
        </div>
    </panel>
    <panel style="margin:10px;border-radius:10px;">
        <div slot="body">
            <div class="dl">
                <div class="dt">
                    <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd">
                    <p>中国石化200元加油卡哇哈哈哈哈哈哈</p>
                    <p>幸运编码：<span>213123</span>   </p>
                </div>
            </div>
            <div class="dl">
                <div class="dt_smail">
                    <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd_smail">
                    <p>获得者：123[四川省。。。]</p>
                    <p>参与52人次 <span>揭晓时间：2019-06-01</span></p>
                </div>
            </div>
        </div>
    </panel>
  </div>
   
</template>

<script>


  export default {
    data:function(){
      return {
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell'
      }, {
        src: 'http://somedomain.somdomain/x.jpg',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        }
      }],
      type:'1',
      }
    },
    methods:{
      //跳转活动规则
      goRules(){
        this.$router.push('/activeRules')
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
  .dd_smail{
      padding-left: 10px;
  }
  .dt_smail img{
      width:40px;
      height:40px;
  }
</style>
