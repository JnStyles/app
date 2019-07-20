<template>
  <div class="getInfo">
    <x-header :left-options="{backText: ''}">领取详情</x-header>

    <group>
      <cell v-if="info.name" primary="content" title="礼品名称" :value="info.name"></cell>
      <cell v-if="info.all_get_type" title="领取方式" :value="info.all_get_type==0?'未领取':info.all_get_type==1?'邮递':info.all_get_type==2?'话费充值':info.all_get_type==3?'兑换豆豆':''"></cell>
      <cell v-if="info.update_time" title="领取时间" :value="info.update_time"></cell>
      <cell v-if="info.mobile" title="收货人手机号" :value="info.mobile"></cell>
      <cell v-if="info.address" primary="content" title="收货地址" :value="info.address"></cell>
      <cell v-if="info.username" title="收货人" :value="info.username"></cell>
      <cell v-if="info.change" title="兑换豆豆金额" :value="info.change"></cell>
      <cell v-if="info.shipments_description" title="发货信息" :value="info.shipments_description"></cell>
    </group>
    <p class="p1">客服电话：<span style="color:blue"> <a :href="'tel:' + phone">{{phone}}</a> </span></p>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        info:'',
        phone:''
      }
    },

    created(){
      let id =this.$route.query.id;
      this.$api.activity.getProductPeriodsInfo({id:id}).then(res =>{
        if(res){
          this.info =res.data.data;
        }
      });
      this.getPhone();
    },

    methods:{
      //获取客服号码
      getPhone(){
        this.$api.activity.getServiceTel({}).then(res =>{
          if(res){
            this.phone =res.data.data.mobile
          }
        })
      }
    }
  }
</script>

<style>
  .getInfo .weui-cell__ft{
    padding-left:34px;
  }
</style>


