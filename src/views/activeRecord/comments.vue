<template>
  <div class="comments">
    <x-header :left-options="{backText: ''}">晒单</x-header>
    <p class="p1">参与疯狂晒单，有机会获得疯狂大礼！</p>
    <group style="margin-top:0;">
      <x-textarea :max="200" v-model="content" placeholder="请填写15至200字的获奖感言"></x-textarea>
    </group>

    <div class="upload_box">
      <div class="upload" v-if="list && list.length>0" v-for="(item,index) in list" :key="index">
        <span @click="handDelect(index)">
            <svg class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                  <use xlink:href="#iconclose-circle"></use>
            </svg>
        </span>
        <img style="max-width: 100%;max-height: 100%;" :src="item" alt="" >
      </div>
      <div class="upload" v-if="list && list.length<3">
        <vue-core-image-upload
          :crop="false"
          @imagechanged="imagechanged"
          @imageuploaded="imageuploaded"
          @errorhandle="errorhandle"
          inputOfFile="file"
          compress="50"
          :data="data"
          :headers="header"
          :max-file-size="2097152"
          :url="url">
          <img width="30" src="../../assets/cam.png"/>
        </vue-core-image-upload>
      </div>
    </div>

    <!--图片上传 jpg 限制2M-->
    <!--其它的限制200k-->

    <x-button type="warn" class="btn_my" @click.native="handBtn">提交</x-button>

  </div>
</template>

<script>
  import base from '@/request/api/base'
  import VueCoreImageUpload from 'vue-core-image-upload';

  export default {
    data: function () {
      return {
        header:{
          'user-token':localStorage.getItem('token')
        },
        data: {
          // src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        },
        title: '默认为空',
        list:[],
        url:base+'/api/share/uploadImg',
        photo_urls:[],
        content:'',
        id:''

      }
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    created() {
      this.id =this.$route.query.id;
    },
    methods: {

      handBtn(){
        let params ={
          id:this.id,
          content:this.content,
          photo_urls:this.photo_urls
        };
        this.$api.activity.doShare(params).then(res =>{
          if(res){
            this.$vux.alert.show({
              title: '提示',
              content: '发表成功',
              onShow () {
                console.log('Plugin: I\'m showing')
              },
              onHide () {
                this.$router.go(-1);
              }
            })
          }
        })
      },

      // 图片上传前
      imagechanged(e){
        // console.log(e)
        this.$vux.loading.show({
          text: 'Loading'
        })
      },
      // 成功触发
      imageuploaded(res) {
        this.$vux.loading.hide()
        console.log('success')
        console.log(res)
        if(res.code==1){
          this.list.push(res.data.image_url);
          this.photo_urls.push(res.data.url);
        }else if(res.code==10001){
          this.$vux.alert.show({
            title: '提示',
            content: res.msg,
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              localStorage.removeItem('token');
              this.$router.push('/login');
            }
          });
        }else{
          this.$vux.toast.text(res.msg)
        }
      },

      //失败触发
      errorhandle(err){
        this.$vux.loading.hide()
        let _this =this;
        this.$vux.alert.show({
          title: '提示',
          content: err,
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {

          }
        });
        console.log(err)
      },

      //删除上传的图片
      handDelect(index){
        console.log(index)
        this.list.splice(index, 1);
        this.photo_urls.splice(index, 1);
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
    position: relative;
  }
  .comments .upload span{
      position: absolute;
      right: -16px;
      top: -17px;
  }


  .comments .upload_box{
    display: flex;
  }
  .comments .g-core-image-upload-btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comments .btn_my{
    width: 80%;
  }
  .comments .p1{
    line-height:30px;
    padding-left:10px;
    font-size: 16px;
  }

</style>
