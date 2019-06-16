<template>
  <div>
    <x-header :left-options="{backText: ''}">活动动态<a slot="right" @click="goRules">活动规则</a></x-header>
   
    <panel style="margin:10px;border-radius:10px;" v-for="item in list" :key="item.id">
        <div slot="body">
            <div class="dl product">
                <div class="dt">
                    <img :src="item.photo_urls" alt="">
                </div>
                <div class="dd">
                    <p class="p_name">{{item.name}}</p>
                    <p class="code">幸运编码：<span class="code_span">{{item.lucky_code}}</span>   </p>
                </div>
            </div>
            <div class="dl" v-if="item.status ==1">
                <div class="dt_smail">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="dd_smail">
                    <p>获得者:&nbsp;<span class="user">{{item.user_nickname}}</span>&nbsp;[没地区字段]</p>
                    <p class="fontsize12">参与 <span class="pay_count">{{item.pay_count}}</span> 人次 <span>&nbsp;&nbsp;揭晓时间：{{item.open_award_time}}</span></p>
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

  .dd{
    padding-left:10px;
  }
  .num{
    display: flex;
    font-size:12px;
    padding-top: 6px;
  }
  .num span{
    color:#E64340
  }
  .dd_box{
    display:flex;
    justify-content:space-between;
  }
  .dd_smail{
      padding-left: 10px;
      color:#666;
  }
  .dd_smail .user{
    color:blue;
  }
  .dd_smail .pay_count{
    color:#E64340
  }
  .dt_smail{
    width:40px;
    height:40px;
  }
  .dt_smail img{
      width:100%;
      max-height:40px;
  }
  .p_name{
    height: 50px;
  }
  .code{
    padding-top: 10px;
    color: #666;
  }
  .code_span{
    font-size: 16px;
    color:#E64340;
  }

</style>
