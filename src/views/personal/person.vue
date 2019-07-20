<template>
  <div class="person">
    <x-header :left-options="{backText: ''}">个人中心<a slot="right" :href="'tel:' + phone">客服</a></x-header>
    <scroller lock-x ref="scroller" height="-48">
        <div>
          <div class="person_box dl">
            <div class="dt">
              <img v-if="info.avatar" :src="info.avatar" alt="">
            </div>
            <div class="dd">
              <p class="name">{{info.user_nickname}}</p>
              <div class="btn_box">
                <p style="line-height:40px;">豆豆{{info.balance}}个</p>
                <x-button mini type="warn" class="btn" @click.native="goTopUp">充值</x-button>
              </div>
              <p v-if="info.my_gift_count>0">成功抢到 <span style="color:#ff9000 ">{{info.my_gift_count}}</span> 件礼品 <span class="look" @click="look">快去查看></span></p>
              <p v-else="info.my_gift_count>0">还没有抢到礼品 <span class="look" @click="join">快去参加></span></p>
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
            <cell title="豆豆明细" :link="{path:'/moneyDetail'}">
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

          <!--<group title="">-->
          <!--<cell title="邀请好友">-->
          <!--<svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">-->
          <!--<use xlink:href="#iconChat"></use>-->
          <!--</svg>-->
          <!--</cell>-->
          <!--</group>-->

          <!-- <group title="">
          <cell title="信息管理" link="/">
                <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
              <use xlink:href="#iconChat"></use>
            </svg>
          </cell>
          </group> -->

          <group title="">
            <cell title="修改资料" link="/editData">
              <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                <use xlink:href="#iconChat"></use>
              </svg>
            </cell>
          </group>

          <group title="">
            <cell title="重置密码" primary="content" @click.native="tSetPass">
              <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                <use xlink:href="#iconChat"></use>
              </svg>
            </cell>
          </group>

          <group title="">
            <cell title="退出登录" primary="content" @click.native="tLogin">
              <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                <use xlink:href="#iconChat"></use>
              </svg>
            </cell>
          </group>
        </div>
    </scroller>


    <div v-transfer-dom>
      <confirm v-model="showLogin"
               title="退出登录"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">确定退出么？</p>
      </confirm>
    </div>
  </div>

</template>

<script>


  export default {
    data: function () {
      return {
        info:'',
        showLogin:false,
        phone:''
      }
    },

    created(){
      //获取用户信息
      this.$api.activity.getUserInfo({}).then(res =>{
        if(res){
          this.info =res.data.data;
        }
      })

      //获取客服电话
      this.getPhone();
    },
    methods: {
      look(){
        this.$router.push('/activeRecord?status=2')
      },
      join(){
        this.$router.push('/')
      },
      tLogin(){
        this.showLogin =true;
      },
      onConfirm(){
        localStorage.removeItem('token');
        this.$router.replace('/login');
      },
      onCancel(){

      },

      //重置密码
      tSetPass(){
        this.$router.push('/setPassword')
      },

      //获取客服号码
      getPhone(){
        this.$api.activity.getServiceTel({}).then(res =>{
          if(res){
            this.phone =res.data.data.mobile
          }
        })
      },
      goTopUp(){
        this.$router.push('/topUp')
      }
    }
  }
</script>

<style scoped>
    .person_box{
      background: #ffffff;
      /*color:#fff;*/
      /*background: #E64340;*/
      /*background:url("../../assets/person_bg.jpg") no-repeat center left;*/
    }
    .dl{
        align-items: center;
        padding-left:20px;
        height: 180px;
        position:relative;
    }
    .dt{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .dt img{
      width: 100%;
      max-height: 100%;
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
     .person .weui-cell__hd{
        display: flex;
     }
      /*.person .vux-header .vux-header-title{*/
        /*color: #000000 !important;*/
      /*}*/
     /*.person .vux-header .vux-header-left .left-arrow:before{*/
       /*border: 0.026667rem solid #000000;*/
     /*}*/
 </style>
