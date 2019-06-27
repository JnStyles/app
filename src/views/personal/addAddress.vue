<template>
  <div>
    <x-header :left-options="{backText: ''}">{{title}}</x-header>

    <group title="">
        <x-input title="收货人姓名" v-model="form.username" class="weui-vcode"></x-input>
         <x-input title="手机号码" v-model="form.mobile" :max="11" is-type="china-mobile"></x-input>
        <x-address title="所在地区" v-model="cityArr" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
        <x-input title="详细地址" v-model="form.address" class="weui-vcode"></x-input>
        <x-switch title="设置为默认地址" :value-map="['0', '1']" v-model="form.is_default"></x-switch>
    </group>
    
    <x-button style="width:80%;margin-top:60px;" type="warn" @click.native="hanBtn">确定</x-button>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/assets/city'
export default {
    data:function(){
      return {
        title:'增加地址',
        addressData:ChinaAddressV4Data,
        showAddress:false,
        form:{
          username:'',
          mobile:'',
          address:'',
          is_default:0
        },
        cityArr:[]
      }
    },
    created(){
      console.log(this.$route.query.cityArr)
      if(this.$route.query.id){
        console.log('编辑')
        let arr =[];
        arr.push(this.$route.query.province_id)
        arr.push(this.$route.query.city_id)
        arr.push(this.$route.query.area_id)
        this.title ='修改地址'
        this.form.username =this.$route.query.username
        this.form.mobile =this.$route.query.mobile
        this.form.address =this.$route.query.address
        this.form.is_default =this.$route.query.is_default
        this.cityArr =arr;
      }
    },
    methods:{
      hanBtn(){
        console.log(this.form.stringValue)
        if(!this.form.username){
            this.$vux.toast.text('请填写收货人姓名');
            return false;
        }else if(!this.form.mobile){
            this.$vux.toast.text('请填写收货人手机号');
            return false;
        }else if(this.form.mobile.length!=11){
             this.$vux.toast.text('手机号格式错误');
            return false;
        }
        else if(this.cityArr.length==0){
            this.$vux.toast.text('请填写收货人所在地区');
            return false;
        }else if(!this.form.address){
            this.$vux.toast.text('请填写收货人详细地址');
            return false;
        }
        let params ={
          username:this.form.username,
          mobile:this.form.mobile,
          address:this.form.address,
          province_id:this.cityArr[0],
          city_id:this.cityArr[1],
          area_id:this.cityArr[2],
          is_default:this.form.is_default
        }
        if(this.$route.query.id){
           params.id =this.$route.query.id
         }
        console.log(params)
        this.$api.activity.addShippingAddress(params).then(res =>{
          if(res){
            this.$router.go(-1)
            console.log('添加成功');
          }
        })
      }
    }
}
</script>
