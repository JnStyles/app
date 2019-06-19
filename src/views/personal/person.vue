<template>
  <div class="person">
    <x-header :left-options="{backText: ''}">个人中心<a slot="right">客服</a></x-header>
    <div class="person_box dl">
        <div class="dt">
            <!--<img src="../../assets/logo.png" alt="">-->
             <img v-if="info.avatar" :src="info.avatar" alt="">
          <!--iconboy-cm-->
            <template v-else>
              <svg slot="icon" class="icon" aria-hidden="true" style="width: 100px;height: 100px;">
                <use xlink:href="#iconboy-cm"></use>
              </svg>
            </template>
        </div>
        <div class="dd">
            <p class="name">{{info.user_nickname}}</p>
            <div class="btn_box">
              <p style="line-height:60px;">彩豆{{info.sex}}个</p>
              <x-button mini type="warn" class="btn">兑换</x-button>
            </div>
            <p>成功抢到 <span style="color:#ff9000 ">{{info.sex}}</span> 件礼品 <span class="look" @click="look">快去查看></span></p>
            
        </div>
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
      <cell title="信息管理" link="/">
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
      look(){
        this.$router.push('/activeRecord?status=2')
      }
    }
  }
</script>

<style scoped>
    .person_box{
      color:#fff;
      background:url("../../assets/person_bg.jpg") no-repeat center left;
    }
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
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .look{
      float:right;
      padding-right:20px;
    }
    .btn{
     margin:0 20px 0 0;
    }
    .btn_box{
      display:flex;
      align-items: center;
      justify-content: space-between;
    }
 </style>
 <style>
      .person .weui-cells{
        margin-top: 10px;
      }
 </style>
