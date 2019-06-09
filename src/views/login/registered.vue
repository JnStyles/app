<template>
  <div class="home">
    <x-header :left-options="{backText: ''}">注册</x-header>

    <group title="">
      <x-input title="手机号码" mask="999 9999 9999" v-model="form.mobile" :max="13" is-type="china-mobile"></x-input>
      <!-- <cell title="value" :value="maskValue"></cell> -->
      <x-input title="发送验证码" v-model="form.verification_code" class="weui-vcode" :max="4">
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
       <x-input title="昵称" v-model="form.user_nickname" class="weui-vcode"></x-input>
        <x-input title="密码" type="password" v-model="form.password" class="weui-vcode"></x-input>
    </group>
    <check-icon :value.sync="isAgree" type="plain" style="line-height:60px;">注册即同意协议</check-icon>
    <x-button style="width:80%;margin-top:60px;" type="primary" @click.native="hanBtn">注册</x-button>
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
          isAgree:true
        }
    },
    methods:{
        //注册
        hanBtn(){
          let params =this.form;
          this.$api.login.register(params).then(res =>{

          })
        }
    }
}
</script>

<style scoped>

</style>
