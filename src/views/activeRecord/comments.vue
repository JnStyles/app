<template>
  <div class="comments">
    <x-header :left-options="{backText: ''}">晒单</x-header>
    <p style="line-height:30px;padding-left:10px;">参与疯狂晒单，有机会获得疯狂大礼！</p>
    <group style="margin-top:0;">
      <x-textarea :max="200" placeholder="请填写15至200字的获奖感言" ></x-textarea>
    </group>

    <!--<vue-core-image-upload-->
      <!--:class="['btn', 'btn-primary']"-->
      <!--crop="local"-->
      <!--@imageuploaded="imageuploaded"-->
      <!--:data="data"-->
      <!--:max-file-size="5242880"-->
      <!--url="http://act.test.fableedu.com/admin/rolepublic/uploader" >-->
    <!--</vue-core-image-upload>-->
    <vue-core-image-upload
      :crop="false"
      @imageuploaded="imageuploaded"
      :data="data"
      :max-file-size="5242880"
      url="http://101.198.151.190/api/upload.php" >
      <img width="150" src="http://img1.vued.vanthink.cn/vuededa653aa59d1a1287d9a6e18890a7e51.png" />
    </vue-core-image-upload>

    <x-button type="warning" style="width:80%;">提交</x-button>

    <x-address @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>
  </div>
</template>

<script>

import VueCoreImageUpload  from 'vue-core-image-upload';

// import { ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
import ChinaAddressV4Data from '../../assets/city'
  export default {
    data:function(){
      return {
        data: {
            src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        },
        title: '默认为空',
        value_0_1: [],
        value: [],
        title2: '设置值',
        value2: ['天津市', '市辖区', '和平区'],
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV4Data,
        value4: [],
        value5: ['广东省', '深圳 市', '南山区'],
        showAddress: false
      }
    },
    components: {
        'vue-core-image-upload': VueCoreImageUpload
    },
    created(){
      console.log(ChinaAddressV4Data)
      let params ={};
      this.$api.activity.getProductList(params).then(res =>{
        console.log(res)
      })
    },
    methods:{
     imageuploaded(){

     },
      doShowAddress () {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange (ids, names) {
        console.log(ids, names)
      },
      changeData () {
        this.value2 = ['430000', '430400', '430407']
      },
      changeDataByLabels () {
        this.value2 = ['广东省', '广州市', '天河区']
      },
      changeDataByLabels2 () {
        this.value2 = ['广东省', '中山市', '--']
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      }
    }
  }
</script>
<style>
   .comments .weui-cells{
       margin-top:0;
   }
   .my_upload{
       height:100px;
   }
</style>
