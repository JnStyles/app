<template>
  <div>
    <x-header :left-options="{backText: ''}">地址管理</x-header>
    <group>
      <swipeout>

        <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" v-for="item in list" :key="item.id">
          <div slot="right-menu">
            <swipeout-button v-if="item.is_default!=1" @click.native="onButtonClicks(item.id)" type="primary">设置默认</swipeout-button>
            <swipeout-button @click.native="onButtonClick(item.id)" type="warn">删除</swipeout-button>
          </div>

          <div slot="content" class="demo-content vux-1px-t" style="position: relative">
            <span v-if="item.is_default==1" class="default_adress">
                <svg slot="icon" class="icon" aria-hidden="true" style="width: 80px;height: 50px;">
                    <use xlink:href="#iconmorendizhi"></use>
                </svg>
            </span>
            <cell :title="item.title"
                  :link="'/addAddress?id='+item.id+'&username='+item.username+'&mobile='+item.mobile+'&province_id='+item.province_id+'&city_id='+item.city_id+'&area_id='+item.area_id+'&address='+item.address+'&is_default='+item.is_default"
                  :inline-desc='item.desc'></cell>
          </div>
        </swipeout-item>
      </swipeout>
    </group>




     <x-button style="width:80%;margin-top:30px;" type="warn" @click.native="hanBtn">添加收货地址</x-button>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      type:'2',
      list: [],
    }
  },
  created(){
    this.getList();
  },
  methods:{

    getList(){
      this.$api.activity.getShippingAddressList({}).then(res =>{
        if(res){
          if(res.data.data.list.length>0){
            let list =[];
            for(let i=0;i<res.data.data.list.length;i++){
              list.push({
                id:res.data.data.list[i].id,
                title:res.data.data.list[i].username +' '+ res.data.data.list[i].mobile,
                username:res.data.data.list[i].username,
                mobile:res.data.data.list[i].mobile,
                desc:res.data.data.list[i].province_name+res.data.data.list[i].city_name+res.data.data.list[i].area_name+res.data.data.list[i].address,
                province_id:res.data.data.list[i].province_id,
                city_id:res.data.data.list[i].city_id,
                area_id:res.data.data.list[i].area_id,
                address:res.data.data.list[i].address,
                is_default:res.data.data.list[i].is_default,
              })
            }
            this.list =list;
          }else{
            this.list =[];
          }
        }
      })
    },

    hanBtn(){
      this.$router.push('/addAddress')
    },

    handleEvents(){

    },

    //删除地址
    onButtonClick(id){
      let params ={
        id:id
      }
      this.$api.activity.deleteShippingAddress(params).then(res =>{
        if(res){
            this.$vux.toast.text('删除成功');
            this.getList();
        }
      })
    },

    //设置默认
    onButtonClicks(id){
      let params ={
        id:id
      }
      this.$api.activity.setDefaultShippingAddress(params).then(res =>{
        if(res){
          this.$vux.toast.text('设置成功');
          this.getList();
        }
      })
    }
  }
    
}
</script>
<style scoped>
    .default_adress{
      position: absolute;
      right: 40px;
      top: 0;
      /*font-size: 12px;*/
      /*padding: 2px 10px;*/
      /*background: #eee;*/
      /*border-radius: 10px;*/
    }
</style>
