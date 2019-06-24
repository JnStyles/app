<template>
  <div class="getproduct">
    <x-header :left-options="{backText: ''}">礼品领取</x-header>
    <group>
      <x-input title="礼品名称" class="weui-vcode" readonly :value="name">
        <!-- <x-button slot="right" type="primary" mini>兑换为彩豆</x-button> -->
        <x-switch :value-map="['0', '1']" v-model="stringValue"></x-switch>
      </x-input>

       <x-input v-if="get_type==2" title="手机号码" type="tel"  placeholder="" v-model="mobile" :min="11" :max="11" @on-change="change"></x-input>
       <x-input v-if="get_type==2" title="确认号码" v-model="mobile2" type="tel" placeholder="" :min="11" :max="11" :equal-with="mobile"></x-input>
       <x-switch title="是否兑换为彩豆" :value-map="['0', '1']" v-model="stringValue"></x-switch>

       <cell v-if="get_type==1 && inlineDescListValue.length==0" title="选择收货地址" @click.native="handSele" is-link :inline-desc='address'></cell>

       <cell v-if="inlineDescListValue.length>0" :title="selectName"  @click.native="handSele"  :inline-desc='selectInlineDesc' is-link></cell>
    </group>

    <x-button type="warn" class="btn" @click.native="handBtn">提交</x-button>

    <div class="instructions" v-if="get_type==2">
        <p>说明：</p>
        <p>1.填写充值号码并提交后，系统将自动为此号码进行充值。</p>
        <p>2.如发现提交后48小时后未到账，请于客服联系。</p>
        <p>3.该礼品支持兑换为彩豆，兑换彩豆后不另获信息服务次数。</p>
    </div>

    <!-- 选择收货地址弹窗 -->
    <div v-transfer-dom>
      <popup v-model="show">
        <popup-header
        left-text="添加"
        right-text="确定"
        title="选择地址"
        :show-bottom-border="false"
        @on-click-left="goAddress"
        @on-click-right="show =false"></popup-header>
        <div class="popup0">
          <div class="div0" v-if="inlineDescList && inlineDescList.length>0" style="margin-top:0;">
             <checklist :max="1" :options="inlineDescList" v-model="inlineDescListValue" @on-change="changes"></checklist>
          </div>
          <div class="div0" v-else>
            <p class="no_adress">还没有地址，快点 <span class="blue" @click="goAddress">添加</span> 一个吧！</p>
          </div>
        </div>
      </popup>
    </div>

    
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        id:'',
        name:'',
        mobile:'',
        mobile2:'',
        stringValue:'0',
        address:'',
        show:false,
        inlineDescList: [],
        inlineDescListValue:[],
        get_type:'',
        selectName:'',
        selectInlineDesc:''
      }
    },
    created(){
        console.log('vuex数据为');
        console.log(this.$store.state.passWord);
        let value =this.$store.state.passWord;
        if(!value){
          this.$router.replace('/activeRecord');
        }
        // let params ={
        //   password:value
        // };
        // this.$api.activity.verificationPassword(params).then(res =>{
        //   if(res){
        //     sessionStorage.setItem('password',value);
        //     this.$router.push('/getProduct?id='+this.id+'&name='+this.name+'&get_type='+this.get_type)
        //   }
        // })

        let id =this.$route.query.id;
        let name =this.$route.query.name;
        let get_type =this.$route.query.get_type;
        this.name =name;
        this.get_type =get_type;
        this.id =id;
        this.getAddreee();
    },
    methods:{
        change(){
            
        },

        handBtn(){
          if(this.get_type==1 && this.inlineDescListValue.length==0 && this.stringValue!=1){
            this.$vux.toast.text('请选择地址')
            return false;
          }
          if(this.get_type==2 && !this.mobile){
            this.$vux.toast.text('请填写手机号')
            return false;
          }else if(this.get_type==2 && this.mobile.length!=11){
            this.$vux.toast.text('手机号有误')
             return false;
          }else if(this.get_type==2 &&this.mobile !=this.mobile2){
             this.$vux.toast.text('两次输入手机号不一样')
             return false;
          }
          let id =this.$route.query.id;
          let params ={
            id:this.id,
            is_conversion:this.stringValue,
            shipping_address_id:this.inlineDescListValue[0],
            mobile:this.mobile,
          };
          console.log(params)
          this.$api.activity.getGift(params).then(res =>{
              if(res){
                    this.$vux.alert.show({
                    title: '提示',
                    content: '领取成功',
                    onShow () {
                      console.log('Plugin: I\'m showing')
                    },
                    onHide () {
                      this.$router.go(-1)
                      console.log('Plugin: I\'m hiding')
                    }
                  })
              }
          })
        },

        //获取收货地址列表
        getAddreee(){
          this.$api.activity.getShippingAddressList({}).then(res =>{
            if(res){
              let inlineDescList =[];
              if(res.data.data.list && res.data.data.list.length>0){
                  let num =res.data.data.list; 
                  for(let i=0;i<num.length;i++){
                    inlineDescList.push({
                      key:num[i].id,
                      value:num[i].username+''+num[i].mobile,
                      inlineDesc:num[i].province_name+num[i].city_name+num[i].area_name+num[i].address
                    })
                    this.inlineDescList =inlineDescList;
                    if(num[i].is_default==1){
                        this.inlineDescListValue.push(num[i].id)
                    }
                  }
              }
            }
          })
        },

        //弹出地址列表
        handSele(){
          this.show =true;
        },
        //选择完地址点确定按钮
        handSelect(){
            console.log(this.inlineDescListValue)
        },
        changes(value,label){
          console.log(value)
          console.log(label)
          let num =this.inlineDescList;
          console.log(num)
          if(num && num.length>0){
              for(let i=0;i<num.length;i++){
                  if(value[0] ==num[i].key){
                      this.selectName =num[i].value;
                      this.selectInlineDesc =num[i].inlineDesc
                  }
              }
          }
          // 
        },
        //跳转去添加地址按钮
        goAddress(){
          this.$router.push('/addAddress')
        }
    }
  }
</script>
<style scoped>
    .instructions{
      padding-top:20px;
      padding-left:16px;
      font-size: 13px;
    }
    .no_adress{
      line-height:60px;
      padding-left:20px;
    }
    .weui-cells{
      margin-top: 0 !important;
    }
    .div0{
      background:#ffffff;
      font-size:14px;
    }
</style>
<style>
    .getproduct .vux-popup-header-left{
      color:blue;
    }
</style>






