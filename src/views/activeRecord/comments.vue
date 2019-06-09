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

  </div>
</template>

<script>

import VueCoreImageUpload  from 'vue-core-image-upload';

  export default {
    data:function(){
      return {
        data: {
            src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        },
        title: '默认为空',
       
      }
    },
    components: {
        'vue-core-image-upload': VueCoreImageUpload
    },
    created(){
     
     
    },
    methods:{
     imageuploaded(){

     },
     
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
