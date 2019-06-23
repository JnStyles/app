<template>
  <div>
    <x-header :left-options="{backText: ''}">忘记密码</x-header>

    <group title="">
      <x-input title="手机号码" mask="999 9999 9999" v-model="form.mobile" :max="13" is-type="china-mobile"></x-input>
      <!-- <cell title="value" :value="maskValue"></cell> -->
      <x-input title="发送验证码" v-model="form.verification_code" class="weui-vcode" :max="4">
        <x-button slot="right" type="warn" mini>发送验证码</x-button>
      </x-input>
      
        <x-input title="新密码" type="password" v-model="form.password" class="weui-vcode"></x-input>
    </group>
    <x-button style="width:80%;margin-top:60px;" type="warn" @click.native="hanBtn">确定</x-button>
  </div>
</template>

<script>
export default {
    data:function(){
        return {
          form:{
            mobile:'',
            password:'',
            verification_code:''
          },
            isAgree:true
        }
    },
    methods:{
        //忘记密码
        hanBtn(){
            let params =this.form;
            this.$api.login.passwordReset(params).then(res =>{
                if(res){
                    //返回上一页
                    console.log('登录成功')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
