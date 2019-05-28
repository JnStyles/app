<template>
  <div>
    <x-header :left-options="{backText: ''}">礼品领取</x-header>
    <group>
      <x-input title="礼品名称" class="weui-vcode" readonly :value="name">
        <x-button slot="right" type="primary" mini>兑换为彩豆</x-button>
      </x-input>

       <x-input title="手机号码" type="text" placeholder="" v-model="mobile" :min="11" :max="11" @on-change="change"></x-input>
      <x-input title="确认号码" v-model="mobile2" type="text" placeholder="" :min="11" :max="11" :equal-with="mobile"></x-input>
    </group>

    <x-button type="warn">提交</x-button>

    <div class="instructions">
        <p>说明：</p>
        <p>1.填写充值号码并提交后，系统将自动为此号码进行充值。</p>
        <p>2.如发现提交后48小时后未到账，请于客服联系。</p>
        <p>3.该礼品支持兑换为彩豆，兑换彩豆后不另获信息服务次数。</p>
    </div>
    
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
          name:'中国移动50元充值卡中国移动50元充值卡',
        mobile:'',
        mobile2:''
      }
    },
  
    methods:{
        change(){
            
        }
    }
  }
</script>
<style scoped>
    .instructions{
      padding-top:20px;
      padding-left:16px;
    }
</style>


