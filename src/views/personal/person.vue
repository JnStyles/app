<template>
  <div class="person">
    <x-header :left-options="{backText: ''}">个人中心<a slot="right">客服</a></x-header>
    <div class="dl">
        <div class="dt">
            <img src="../../assets/logo.png" alt="">
            <!-- <img :src="info.avatar" alt=""> -->
        </div>
        <div class="dd">
            <p class="name">{{info.user_nickname}}</p>
            <p style="line-height:60px;">彩豆{{info.sex}}个</p>
            <p>成功抢到{{info.sex}}件礼品 <span class="look">快去查看></span></p>
        </div>
        <x-button class="btn">兑换</x-button>
    </div>

    <group title="">
      <cell title="活动记录" :link="{path:'/activeRecord'}">
         <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
          <use xlink:href="#iconChat"></use>
        </svg>
      </cell>
      </group>

      <group title="">
      <cell title="菜豆明细" :link="{path:'/moneyDetail'}">
            <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
          <use xlink:href="#iconChat"></use>
        </svg>
      </cell>
      </group>

      <group title="">
      <cell title="地址管理" :link="{path:'/addressList'}">
            <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
          <use xlink:href="#iconChat"></use>
        </svg>
      </cell>
      </group>

      <group title="">
      <cell title="邀请好友">
            <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
          <use xlink:href="#iconChat"></use>
        </svg>
      </cell>
      </group>

      <group title="">
      <cell title="信息管理" link="https://vux.li">
            <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
          <use xlink:href="#iconChat"></use>
        </svg>
      </cell>
    </group>
  </div>

</template>

<script>


  export default {
    data: function () {
      return {
        info:''
      }
    },

    created(){
      //获取用户信息
      this.$api.activity.getUserInfo({}).then(res =>{
        if(res){
          this.info =res.data.data;
        }
      })
    },
    methods: {

    }
  }
</script>

<style scoped>
    .dl{
        align-items: center;
        padding-left:20px;
        height: 200px;
        position:relative;
    }
    .dt img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .dd{
        padding-left:20px;
        flex:1;
    }
    .name{
        font-size:20px;
    }
    .btn{
        width:80px;
        position:absolute;
        right:20px;
        top:40%;
    }
    .look{
      float:right;
      padding-right:20px;
    }
 </style>
 <style>
      .person .weui-cells{
        margin-top: 10px;
      }
 </style>
 