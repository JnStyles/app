<template>
  <div>
    <x-header :left-options="{backText: ''}">重置密码</x-header>

    <group title="">
      <x-input title="旧密码" type="password" v-model="form.oldpassword"></x-input>
      <x-input title="新密码" type="password" v-model="form.password"></x-input>
    </group>
    <x-button style="margin-top:60px;" type="warn" @click.native="hanBtn">确定</x-button>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        form:{
          oldpassword:'',
          password:''
        },
      }
    },
    methods:{
      //忘记密码
      hanBtn(){
        let params =this.form;

        this.$api.activity.setPassword(params).then(res =>{
          if(res){
            //返回上一页
            this.$vux.toast.text('修改成功');
            setTimeout(res =>{
              this.$router.go(-1);
            },500)
            console.log('修改成功')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
