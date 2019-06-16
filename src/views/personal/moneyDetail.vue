<template>
  <div class="moneyDetail">
    <x-header :left-options="{backText: ''}">彩豆明细</x-header>
    
    <div class="timeline-demo">
      <timeline v-if="list.length>0">
        <timeline-item v-for="(item,index) in list" :key ="index">
          <p  v-if="item.month">{{item.month}}月{{item.day}}号</p>
          <template v-if="item.son && item.son.length>0">
            <div class="pbox" v-for="son in item.son" :key="son.id">
                <div class="left">
                    <h4>剩余{{son.balance}}豆</h4>
                    <!-- <p>{{son.name}}</p> -->
                    <p>参与我爱我家的第三期活动</p>
                </div>   
                <div class="right">
                    <span>-{{Number(son.change)}}</span>
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
            this.list.push({})
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
    .left h4{
        font-size:16px;
    }
    .left p{
      color:#666;
    }
    .right{
      padding-right:16px;
    }
    .right span{
      font-size:16px;
      color:#E64340
    }
</style>

<style>
    
  .moneyDetail .vux-timeline-item-checked.weui-icon-success-no-circle::before {
    font-size: 0;
  }

  .moneyDetail .vux-timeline-item-head-first {
    width: 10px;
    height: 10px;
    left: 1px;
  }
  .moneyDetail .vux-timeline{
    padding: 20px;
  }
  .moneyDetail .vux-timeline-item-content{
    padding-left: 16px;
    padding-bottom: 1px;
  }
  .moneyDetail .weui-btn + .weui-btn{
      margin:0;
  }
</style>
