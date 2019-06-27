<template>
  <div>
    <x-header :left-options="{backText: ''}">忘记密码</x-header>

    <group title="">
      <x-input title="手机号码" v-model="form.mobile" :max="13" is-type="china-mobile"></x-input>
      <x-input title="验证码" v-model="form.verification_code" class="weui-vcode" :max="4" type="number">
        <x-button slot="right" type="warn" mini>发送验证码</x-button>
      </x-input>
      
        <x-input title="新密码" type="password" v-model="form.password" class="weui-vcode"></x-input>
    </group>
    <x-button style="margin-top:60px;" type="warn" @click.native="hanBtn">确定</x-button>
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
                  this.$vux.toast.text('修改成功');
                  setTimeout(res =>{
                    this.$router.go(-1);
                  },500)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
