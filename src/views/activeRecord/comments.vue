<template>
  <div class="comments">
    <x-header :left-options="{backText: ''}">晒单</x-header>
    <p style="line-height:30px;padding-left:10px;">参与疯狂晒单，有机会获得疯狂大礼！</p>
    <group style="margin-top:0;">
      <x-textarea :max="200" placeholder="请填写15至200字的获奖感言"></x-textarea>
    </group>

    <!--<vue-core-image-upload-->
    <!--:class="['btn', 'btn-primary']"-->
    <!--crop="local"-->
    <!--@imageuploaded="imageuploaded"-->
    <!--:data="data"-->
    <!--:max-file-size="5242880"-->
    <!--url="http://act.test.fableedu.com/admin/rolepublic/uploader" >-->
    <!--</vue-core-image-upload>-->
    <div class="upload_box">
      <div class="upload" v-if="list && list.length>0">
        <img src="../../assets/cam.png" alt="" >
      </div>
      <div class="upload">
        <vue-core-image-upload
          :crop="false"
          @imageuploaded="imageuploaded"
          @errorhandle="errorhandle"
          :data="data"
          :max-file-size="5242880"
          url="http://39.105.173.183/api/share/uploadImg">
          <img width="31" src="../../assets/cam.png"/>
        </vue-core-image-upload>
      </div>
    </div>
    


    <x-button type="warn" class="btn">提交</x-button>

  </div>
</template>

<script>

  import VueCoreImageUpload from 'vue-core-image-upload';

  export default {
    data: function () {
      return {
        data: {
          src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',

        },
        title: '默认为空',
        list:[]

      }
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    created() {


    },
    methods: {
      // 成功触发
      imageuploaded(res) {
        console.log(res)
      },

      //失败触发
      errorhandle(err){
        let _this =this;
        this.$vux.alert.show({
          title: '提示',
          content: '上传失败',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            localStorage.removeItem('token');
            _this.$router.push('/login');

          }
        });
        console.log(err)
      }

    }
  }
</script>
<style>
  .comments .weui-cells {
    margin-top: 0;
  }

  .comments .upload {
    width: 80px;
    height: 80px;
    border: 1px solid #F0EFF4;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }
  .upload_box{
    display: flex;
  }
  .g-core-image-upload-btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn{
    width: 80%;
  }

</style>
