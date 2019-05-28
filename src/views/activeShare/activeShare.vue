<template>
  <div class="activeShare">
    <x-header :left-options="{backText: ''}">活动分享</x-header>
   
    <panel style="margin-top:0">
        <div slot="body">
            <div class="dl">
                <div class="dt">
                    <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd">
                    <p class="one"><span>用户名 <i>地区</i></span><span class="span">04-21</span> </p>
                    <p  class="two">获奖的商品名称</p>
                    <div class="info">
                        <p>我是评论的内容，很长很长的文字很长很长的文字很长很长的文字很长很长的文字很长很长的文字很长很长的文字</p>
                        <grid :show-lr-borders="false" :show-vertical-dividers="false">
                            <grid-item link="/component/cell">
                                <img slot="icon" src="../../assets/logo.png">
                            </grid-item>
                            <grid-item :link="{ path: '/component/cell'}">
                                <img slot="icon" src="../../assets/grid_icon.png">
                            </grid-item>
                            <grid-item :link="{ path: '/component/cell'}">
                                <img slot="icon" src="../../assets/grid_icon.png">
                            </grid-item>
                        </grid>
                    </div>
                    <div class="zan">点赞图标</div>
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
      
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
  }
  .dt img{
    width:30px;
    height:30px;
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
  .one{
      color:bule;
      font-size: 14px;
  }
  .one span{
      color:#ccc;
  }
  .one .span{
      float: right;
  }
  .one i{
      font-style: normal;
  }
  .info{
      color:#ccc;
  }
  .zan{
      float: right;
  }
 
</style>

<style>
    .activeShare .weui-grids::before{
        border:none;
    }
   .activeShare .weui-grid:after{
       border:none;
   }
   .activeShare .weui-grid__icon{
        width:80px;
        height: 80px;
   }
</style>

