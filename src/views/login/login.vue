<template>
  <div class="home">
    <x-header :left-options="{showBack: false}">登录</x-header>

     <group title="">
        <x-input title="手机号码" v-model="form.mobile" :max="13" is-type="china-mobile"></x-input>
        <x-input title="密码" class="weui-vcode" type="password" v-model="form.password"></x-input>
    </group>

    <p class="forget blue" @click="goForget">忘记密码？</p>

     <x-button style="width:80%;margin-top:60px;" type="warn" @click.native="hanBtn">登录</x-button>
     <x-button style="width:80%;margin-top:10px;" type="default" @click.native="goReg">注册</x-button>

  </div>
</template>

<script>
export default {
    data:function(){
        return {
            form:{
                mobile:'',
                password:''
            }
            
        }
    },
    methods:{
        //登录
        hanBtn(){
            let params =this.form;
            this.$api.login.login(params).then(res =>{
                if(res){
                    //返回上一页
                    console.log('登录成功')
                  localStorage.setItem('token',res.data.data.token)
                  this.$router.push('/')
                }
            })
        },
        goReg(){
            this.$router.push('/registered')
        },
        goForget(){
            this.$router.push('/forget')
        }
    }
}
</script>

<style scoped>
  .forget{
    float: right;
    padding-right: 10px;
    line-height: 30px;
  }
</style>
