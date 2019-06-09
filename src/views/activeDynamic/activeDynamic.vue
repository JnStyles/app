<template>
  <div>
    <x-header :left-options="{backText: ''}">活动动态<a slot="right" @click="goRules">活动规则</a></x-header>
   
    <panel style="margin:10px;border-radius:10px;" v-for="item in list" :key="item.id">
        <div slot="body">
            <div class="dl">
                <div class="dt">
                    <!-- <img :src="item.photo_urls" alt=""> -->
                     <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd">
                    <p class="name">{{item.name}}</p>
                    <p>幸运编码：<span>{{item.lucky_code}}</span>   </p>
                </div>
            </div>
            <div class="dl" v-if="item.status ==1">
                <div class="dt_smail">
                    <!-- <img :src="item.avatar" alt=""> -->
                    <img src="../../assets/logo.png" alt="">
                </div>
                <div class="dd_smail">
                    <p>获得者：{{item.user_nickname}}[四川省。。。]</p>
                    <p class="fontsize12">参与{{item.pay_count}}人次 <span>揭晓时间：{{item.open_award_time}}</span></p>
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
      list: [],
      type:'1',
      }
    },
    created(){
      this.$api.activity.getProductPeriodsList({}).then(res =>{
        if(res){
          this.list =res.data.data.list
        }
      })
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
    width:80px;
    height:80px;
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
  .name{
    height:50px;
  }
</style>
