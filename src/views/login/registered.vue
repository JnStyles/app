<template>
  <div class="registered">
    <x-header :left-options="{backText: ''}">注册</x-header>

    <group title="">
      <x-input title="手机号码" required v-model="form.mobile" type="number" :max="13" is-type="china-mobile"></x-input>
      <x-input title="验证码" v-model="form.verification_code" class="weui-vcode" :max="6" type="number">
        <x-button slot="right" type="warn" mini @click.native="handCode">{{isDisabled?btntxt:'获取验证码'}}</x-button>
      </x-input>
       <x-input title="昵称" v-model="form.user_nickname" class="weui-vcode"></x-input>
       <x-input title="密码" type="password" v-model="form.password" class="weui-vcode"></x-input>
    </group>
    <check-icon :value.sync="isAgree" type="plain" style="line-height:60px;">注册即同意协议</check-icon>
    <x-button style="width:80%;margin-top:60px;" type="warn" action-type="submit" @click.native="hanBtn">注册</x-button>
  </div>
</template>

<script>
export default {
    data:function(){
        return {
          form:{
            mobile:'',
            password:'',
            verification_code:'',
            user_nickname:'',
          },
          isAgree:true,
          isDisabled: false,
          time: '',
          btntxt: '获取验证码',
        }
    },
    methods:{
        //注册
        hanBtn(){
          if(this.form.mobile && this.form.password && this.form.verification_code && this.form.user_nickname){
            console.log('注册')
            let params =this.form;
            this.$api.login.register(params).then(res =>{
                if(res){
                  localStorage.setItem('token',res.data.data.token);
                  this.$router.push('/')
                }
            })
          }else{
            this.$vux.toast.text('资料填写不完整')
          }

        },
        //发送验证码
        handCode() {
          let modelReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
          if (!modelReg.test(this.form.mobile)) {
            console.log('手机号格式不正确')
            this.$vux.toast.text('手机号格式不正确')
            return false;
          }
          if (!this.isDisabled) {
            console.log('点击获取验证码');
            let params = {
              mobile: this.form.mobile
            };
            console.log(params)

            this.$api.login.sendMobileCode(params).then(res =>{
              if (res) {
                this.time = 60;
                this.isDisabled = true;
                this.timer();
              }
            })
          }

        },
        //60S倒计时
        timer() {
          if (this.time > 0) {
            this.time--;
            this.btntxt = this.time + "s后重新获取";
            setTimeout(this.timer, 1000);
          } else {
            this.time = 0;
            this.btntxt = "获取验证码";
            this.isDisabled = false;
          }
        },

    }
}
</script>

<style>
  .registered .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
    color: #E64340!important;
  }
</style>
