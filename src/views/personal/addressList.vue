<template>
  <div>
    <x-header :left-options="{backText: ''}">地址管理</x-header>

     <!-- <panel v-if="list.length>0" :list="list" :type="type"></panel> -->

     <group>
      <cell v-for="item in list" :key="item.id" :title="item.title"
       :link="'/addAddress?id='+item.id+'&username='+item.username+'&mobile='+item.mobile+'&province_id='+item.province_id+'&city_id='+item.city_id+'&area_id='+item.area_id+'&address='+item.address" 
       :inline-desc='item.desc'></cell>
    </group>

     <x-button style="width:80%;margin-top:30px;" type="primary" @click.native="hanBtn">添加收货地址</x-button>
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
            })
          }
          this.list =list;
        }
        
        // this.list =res.data.data.list;
      }
    })
  },
  methods:{
    hanBtn(){
      this.$router.push('/addAddress')
    }
  }
    
}
</script>
    