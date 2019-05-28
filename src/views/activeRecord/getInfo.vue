<template>
  <div class="comments">
    <x-header :left-options="{backText: ''}">领取详情</x-header>

    <group>
      <cell title="礼品名称" :value="name"></cell>
      <cell title="领取方式" :value="way"></cell>
      <cell title="领取时间" :value="time"></cell>
    </group>
    <p class="p1">客服电话：<span style="color:blue">13611266774</span></p>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
       name:'中国移动50元充值卡',
       way:'自动充值',
       time:'2019.06.18'
      }
    },
  
    methods:{
   
    }
  }
</script>

