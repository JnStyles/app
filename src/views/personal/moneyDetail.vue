<template>
  <div class="activeRecord">
    <x-header :left-options="{backText: ''}">彩豆明细</x-header>
    
    <div class="timeline-demo">
      <timeline v-if="list.length>0">
        <timeline-item v-for="(item,index) in list" :key ="index">
          <p>{{item.month}}月{{item.day}}号</p>
          <template v-if="item.son && item.son.length>0">
            <div class="pbox" v-for="son in item.son" :key="son.id">
                <div class="left">
                    <h4>剩余{{item.balance}}豆</h4>
                    <p>{{son.name}}</p>
                </div>   
                <div class="right">
                    <span>{{Number(son.change)}}</span>
                    <p>{{son.create_time}}</p>
                </div>
            </div>
          </template>
          
        </timeline-item>
      </timeline>
      <div v-else>暂无明细</div>
    </div>
  </div>

</template>

<script>


  export default {
    data: function () {
      return {
        list: [
    
        ]
      }
    },

    created(){
      let params ={
        page:1
      }
      this.$api.activity.balanceLog(params).then(res =>{
        if(res){
            this.list =res.data.data.list
        }
      })
    },
    methods: {

    }
  }
</script>

<style scoped>
    .pbox{
        padding:14px;
        background:#ffffff;
        display:flex;
        align-items: center;
        justify-content: space-between;
        border-bottom:1px solid #eee;
    }

</style>
