<template>
  <div class="moneyDetail">
    <x-header :left-options="{backText: ''}">彩豆明细</x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-53" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div class="timeline-demo">
        <timeline v-if="list.length>0">
          <timeline-item v-for="(item,index) in list" :key ="index">
            <p class="time">{{item.month}}月{{item.day}}号</p>
            <!--<p>{{arrIndex[index]}}</p>-->
            <template v-if="item.son && item.son.length>0">
              <div class="pbox" v-for="son in item.son" :key="son.id">
                  <div class="left">
                      <h4>剩余{{son.balance}}豆</h4>
                       <p>参与第 {{son.periods}} 期 {{son.name}}</p>
                  </div>
                  <div class="right">
                      <span>-{{Number(son.change)}}</span>
                      <p>{{son.create_time}}</p>
                  </div>
              </div>
            </template>
          </timeline-item>
          <!--最后添加一个空的-->
          <timeline-item></timeline-item>
        </timeline>
        <div v-else>暂无明细</div>
      </div>
    </scroller>
  </div>

</template>

<script>


  export default {
    data: function () {
      return {
        // list: [],
        list:[
          {"month_day":"0625","month":"06","day":"25",
            "son":[
              {"id":216,"create_time":"10:52:38","change":"100","balance":"95110","name":"华为 P30 Pro 超大广角 超感光徕卡四射 10倍混合变焦 全网通版双4G","periods":1,"month":"06","day":"25","month_day":"0625"},
              {"id":215,"create_time":"10:51:10","change":"50","balance":"95210","name":"移动 联通 电信全国通用 200元 手机充值卡","periods":1,"month":"06","day":"25","month_day":"0625"},
              {"id":214,"create_time":"10:50:32","change":"500","balance":"95260","name":"京东E卡经典卡1000面值实体卡 全国通用","periods":1,"month":"06","day":"25","month_day":"0625"},
              {"id":213,"create_time":"10:50:16","change":"30","balance":"95760","name":"Apple iphone XS 256GB 超视网膜显示屏 全网通4G手机","periods":1,"month":"06","day":"25","month_day":"0625"},
              {"id":212,"create_time":"10:45:52","change":"10","balance":"95790","name":"移动 联通 电信全国通用 200元 手机充值卡","periods":1,"month":"06","day":"25","month_day":"0625"},
              {"id":211,"create_time":"10:18:27","change":"3","balance":"95800","name":"京东E卡经典卡500面值实体卡 全国通用","periods":9,"month":"06","day":"25","month_day":"0625"}
              ]
          },
          {"month_day":"0624","month":"06","day":"24",
            "son":[{"id":210,"create_time":"21:32:05","change":"1","balance":"95803","name":"京东E卡经典卡500面值实体卡 全国通用","periods":9,"month":"06","day":"24","month_day":"0624"},
              {"id":209,"create_time":"21:21:42","change":"3","balance":"95804","name":"京东E卡经典卡500面值实体卡 全国通用","periods":9,"month":"06","day":"24","month_day":"0624"},
              {"id":208,"create_time":"15:32:37","change":"600","balance":"95807","name":"京东E卡经典卡500面值实体卡 全国通用","periods":8,"month":"06","day":"24","month_day":"0624"},
              {"id":207,"create_time":"15:31:30","change":"600","balance":"96407","name":"京东E卡经典卡500面值实体卡 全国通用","periods":7,"month":"06","day":"24","month_day":"0624"}]
          },
          {"month_day":"0624","month":"06","day":"24",
            "son":[{"id":206,"create_time":"15:30:13","change":"600","balance":"97007","name":"京东E卡经典卡500面值实体卡 全国通用","periods":6,"month":"06","day":"24","month_day":"0624"},
              {"id":205,"create_time":"15:28:47","change":"600","balance":"97607","name":"京东E卡经典卡500面值实体卡 全国通用","periods":5,"month":"06","day":"24","month_day":"0624"},
              {"id":200,"create_time":"14:28:31","change":"600","balance":"98207","name":"京东E卡经典卡500面值实体卡 全国通用","periods":3,"month":"06","day":"24","month_day":"0624"},
              {"id":199,"create_time":"14:25:42","change":"600","balance":"98807","name":"京东E卡经典卡500面值实体卡 全国通用","periods":2,"month":"06","day":"24","month_day":"0624"},
              {"id":198,"create_time":"14:09:26","change":"599","balance":"99407","name":"京东E卡经典卡500面值实体卡 全国通用","periods":1,"month":"06","day":"24","month_day":"0624"},
              {"id":197,"create_time":"14:09:01","change":"7","balance":"100006","name":null,"periods":null,"month":"06","day":"24","month_day":"0624"},
              {"id":196,"create_time":"14:09:01","change":"100000","balance":"99999","name":null,"periods":null,"month":"06","day":"24","month_day":"0624"},
              {"id":195,"create_time":"12:33:51","change":"1","balance":"9989956","name":"京东E卡经典卡500面值实体卡 全国通用","periods":1,"month":"06","day":"24","month_day":"0624"}]
          }],
        arrIndex:[],
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
              // if(this.arrIndex.length>0){
              //   for(let i=0;i<this.arrIndex.length;i++){
              //     if(this.arrIndex.indexOf(res.data.data.list[i].month_day)>-1){
              //         // 说明在同一个日期里
              //         this.list =this.list[i].son.push(res.data.data.list[0].son)
              //     }else{
              //       this.arrIndex.push(res.data.data.list[0].month_day)
              //       this.list =this.list.concat(res.data.data.list)
              //     }
              //   }
              // }

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
      font-size:16px;
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
