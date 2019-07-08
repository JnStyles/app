<template>
  <div class="buyInfo">
    <x-header :left-options="{backText: ''}">支付</x-header>
    <group>
      <x-input title="共需支付" class="weui-vcode" readonly>
          <p slot="right">{{balance}}6豆
        </p>
      </x-input>

      <x-input title="6豆抵扣" class="weui-vcode" readonly :value="'剩余'+user_balance+'个'">
        <p v-if="Number(user_balance)>Number(balance)" slot="right">{{balance}}6豆
            <icon type="success"></icon>
        </p>

        <p v-else slot="right">
          <x-button type="warn" mini @click.native="goTopUp">去充值</x-button>
        </p>
      </x-input>
    </group>

    <x-button type="warn" class="btn" @click.native="handBtn">确认支付</x-button>

    <div class="instructions">
        <p>说明：</p>
        <p>1.支付一元兑换一次信息服务，赠送一个6豆，使用6豆可参与活动（支付成功后不可退回）</p>
        <p>2.如发现提交后48小时后未到账，请于客服联系。</p>
        <p>3.该礼品支持兑换为6豆，兑换6豆后不另获信息服务次数。</p>
    </div>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
          id:'',
          balance:'',
          num:33,
          user_balance:0,//用户余额
      }
    },
    created(){
        let id =this.$route.query.id;
        let balance =this.$route.query.balance;
        this.id =id;
        this.balance =balance;

        //获取用户信息
        this.$api.activity.getUserInfo({}).then(res =>{
           if(res){
              this.user_balance =res.data.data.balance
           }
        })
    },
    methods:{
        handBtn(){
            let params ={
                id:this.id,
                balance:this.balance
            }
            this.$api.activity.doPay(params).then(res =>{
                let _this =this;
                if(res){
                  this.$vux.alert.show({
                    title: '恭喜您',
                    content: '参与成功',
                    onShow () {
                      console.log('Plugin: I\'m showing')
                    },
                    onHide () {
                      _this.$router.go(-1)
                    }
                  })
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
    .instructions{
      padding-top:20px;
      padding-left:16px;
      font-size: 13px;
    }
</style>
<style>
    .buyInfo .weui-input{
        font-size:12px  !important;
        color:#666  !important;
    }
</style>






