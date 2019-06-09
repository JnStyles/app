<template>
  <div>
    <x-header :left-options="{backText: ''}">礼品领取</x-header>
    <group>
      <x-input title="礼品名称" class="weui-vcode" readonly :value="name">
        <!-- <x-button slot="right" type="primary" mini>兑换为彩豆</x-button> -->
        <x-switch :value-map="['0', '1']" v-model="stringValue"></x-switch>
      </x-input>

       <x-input title="手机号码" type="text"  placeholder="" v-model="mobile" :min="11" :max="11" @on-change="change"></x-input>
       <x-input title="确认号码" v-model="mobile2" type="text" placeholder="" :min="11" :max="11" :equal-with="mobile"></x-input>
       <x-switch title="是否兑换为彩豆" :value-map="['0', '1']" v-model="stringValue"></x-switch>

       <cell title="选择收货地址" @click.native="handSele" is-link :inline-desc='address'></cell>
    </group>

    <x-button type="warn" class="btn" @click.native="hanBtn">提交</x-button>

    <div class="instructions">
        <p>说明：</p>
        <p>1.填写充值号码并提交后，系统将自动为此号码进行充值。</p>
        <p>2.如发现提交后48小时后未到账，请于客服联系。</p>
        <p>3.该礼品支持兑换为彩豆，兑换彩豆后不另获信息服务次数。</p>
    </div>

    <!-- 选择收货地址弹窗 -->
    <div v-transfer-dom>
      <popup v-model="show">
        <div class="popup0">
          <group>
             <checklist :max="1" title="选择收货地址" :options="inlineDescList" v-model="inlineDescListValue" @on-change="changes"></checklist>
          </group>
        </div>
      </popup>
    </div>

    
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        name:'中国移动50元充值卡中国移动50元充值卡中国移动50元充值卡中国移动50元充值卡',
        mobile:'',
        mobile2:'',
        stringValue:'0',
        address:'',
        show:true,
        inlineDescList: [
        {key: '1', value: 'Tiger is good', inlineDesc: 'Tiger is the king of mountain'},
        {key: '2', value: 'Lion is better', inlineDesc: 'Lion is the king of woods'},
        {key: '3', value: 'Camel is best, no inline-desc'}
      ],
      inlineDescListValue:[1]
      }
    },
  
    methods:{
        change(){
            
        },

        hanBtn(){
          console.log('TIJIAO')
        },

        handSele(){
          console.log('123')
        },
        changes(value,label){
          console.log(value)
          console.log(label)
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


