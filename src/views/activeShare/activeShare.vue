<template>
  <div class="activeShare">
    <x-header :left-options="{backText: ''}">活动分享</x-header>
   
    <panel style="margin-top:0">
        <div slot="body">
            <div class="dl" v-for="item in list">
                <div class="dt">
                    <img src="../../assets/logo.png" alt="">
                    <!-- <img :src="item.avatar" alt=""> -->
                </div>
                <div class="dd">
                    <p class="one"><span>{{item.user_nickname}} <i>地区</i></span><span class="span">{{item.create_time}}</span> </p>
                    <p  class="two">{{item.name}}</p>
                    <div class="info">
                        <p>{{item.content}}</p>
                        <grid :show-lr-borders="false" :show-vertical-dividers="false">
                            <grid-item link="/component/cell" v-for="index in item.photo_urls">
                                <img slot="icon" src="../../assets/logo.png">
                                <!-- <img slot="icon" :src="list"> -->
                            </grid-item>
                        </grid>
                    </div>
                    <div class="zan">
                      <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                        <use xlink:href="#iconlike"></use>
                      </svg>
                      {{item.like_count}}</div>
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
      list:[],
      type:'1',
      }
    },
    created(){
      this.$api.activity.getShareList({}).then(res =>{
        if(res){
            this.list =res.data.data.list;
        } 
      })
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
    flex:1;
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
      display:flex;
      align-items: center;
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

