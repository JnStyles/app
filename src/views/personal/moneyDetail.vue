<template>
  <div class="moneyDetail">
    <x-header :left-options="{backText: ''}">豆豆明细</x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-53" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div class="timeline-demo">
        <timeline v-if="list.length>0">
          <timeline-item v-for="(item,index) in list" :key ="index">
            <p class="time" v-if=" index==0">{{item.month}}月{{item.day}}号</p>
            <p class="time" v-if=" index>0 && (list[index].month_day!=list[index-1].month_day)">{{item.month}}月{{item.day}}号</p>
            <template v-if="item.son && item.son.length>0">
              <div class="pbox" v-for="son in item.son" :key="son.id">
                <template v-if="son.is_income==2">
                    <div class="left">
                      <h4>剩余{{son.balance}}豆</h4>
                      <p>参与第 {{son.periods}} 期 {{son.name}}</p>
                    </div>
                    <div class="right">
                      <span>-{{Number(son.change)}}</span>
                      <p>{{son.create_time}}</p>
                    </div>
                </template>
                <template v-else-if="son.is_income==1">
                    <div class="left">
                      <h4>充值</h4>
                      <p>剩余{{son.balance}}豆</p>
                    </div>
                    <div class="right">
                      <span>+{{Number(son.change)}}</span>
                      <p>{{son.create_time}}</p>
                    </div>
                </template>

              </div>
            </template>
          </timeline-item>
          <!--最后添加一个空的-->
          <timeline-item></timeline-item>
        </timeline>
        <div v-else-if="list && list.length==0 && isAxios">
          <NoData></NoData>
        </div>
      </div>
    </scroller>
  </div>

</template>

<script>

  import NoData from "@/components/NoData";

  export default {
    data: function () {
      return {
        list:[],
        arrIndex:[],
        isAxios:false,
        pullupConfig: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        },
        pulldownConfig:{
          content:'下拉刷新',
          downContent:'下拉刷新',
          upContent:'释放刷新',
          loadingContent:'加载中'
        },
        page:1
      }
    },

    components: {
      NoData,
    },

    created(){
      this.getList();
    },
    methods: {
      getList(cb){
        let params ={
          page:1
        }
        this.$api.activity.balanceLog(params).then(res =>{
          if(res){
            this.isAxios =true;
            if(res.data.data.list.length==0){
              this.$refs.scroller.disablePullup() //禁用上拉刷新，在没有更多数据时执行
            }

            // 时间去重
            for(let i=0;i<res.data.data.list.length;i++){
              this.arrIndex.push(res.data.data.list[i].month_day)
            }

            this.list =res.data.data.list;
            cb && cb();
          }
        })
      },

      //上拉加载
      upLoad(){
        this.page +=1;
        let params ={
          page:this.page,
        }
        this.$api.activity.balanceLog(params).then(res =>{
          if(res){
            if(res.data.data.list.length>0){
              // 时间去重
              for(let i=0;i<res.data.data.list.length;i++){
                if(this.arrIndex.indexOf(res.data.data.list[i].month_day)==-1){
                  this.arrIndex.push(res.data.data.list[i].month_day)
                }
              }

              this.$nextTick(() => {
                this.$refs.scroller.reset()
                this.list =this.list.concat(res.data.data.list)
              })
              this.$refs.scroller.donePullup()  // 设置上拉加载操作完成，在数据加载后执行
            }else{
              this.$refs.scroller.disablePullup() //禁用上拉刷新，在没有更多数据时执行
            }
          }
        })
      },
      //下拉刷新
      downLoad(){
        console.log('下拉刷新')
        this.page =1;
        this.getList(res =>{
          this.$refs.scroller.donePulldown()
          this.$refs.scroller.enablePullup() //启用上拉加载
        });
      }

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
      float:right;
      text-align: right;
    }
    .right span{
      font-size:16px;
      color:#E64340
    }
    .time{
      font-size:18px;
      font-weight: 600;
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
