<template>
  <div>
    <x-header :left-options="{backText: ''}">商品动态</x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-60" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div>
        <panel :header="item.create_msectime" v-for="item in list" :key="item.id">
          <div slot="body">
            <div class="dl">
              <div class="dt">
                <img :src="item.avatar" alt="">
              </div>
              <div class="dd">
                <p><span class="user blue">{{item.user_nickname}}</span>&nbsp;[{{item.address}}]</p>
                <p class="fontsize12">参与 <span class="pay_count">{{item.pay_count}}</span> 人次</p>
                <p>幸运编码：&nbsp;<badge :text="item.lucky_code"></badge></p>
              </div>
            </div>
          </div>
        </panel>
      </div>
    </scroller>
  </div>

</template>

<script>


  export default {
    data:function(){
      return {
        list: [
          {
            "pay_count": "2",//参与人次
            "create_msectime": "2019-05-31 16:59:57.186",//时间
            "avatar": "https://act.fableedu.com/public/product/5d0355d16e952RQnUWM.jpg",//头像
            "user_nickname": "w**eref",//昵称
            "address": "中国",//地址
            'lucky_code':432423423
          },
          {
            "pay_count": "2",
            "create_msectime": "2019-05-31 16:59:58.529",
            "avatar": "https://act.fableedu.com/public/product/5d0355d16e952RQnUWM.jpg",
            "user_nickname": "w**eref",
            "address": "中国",
            'lucky_code':432423423
          }
        ],
        type:'1',
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
    methods:{
      getList(cb){
        let params ={
          page:this.page,
          id:this.$route.query.id
        }
        this.$api.activity.getProductPeriodsOrderList(params).then(res =>{
          if(res){
            // this.list =res.data.data.list
            cb && cb(res);
          }
        })
      },

      //上拉加载
      upLoad(){
        this.page +=1;
        let params ={
          page:this.page,
        }
        this.$api.activity.getProductPeriodsList(params).then(res =>{
          if(res){
            if(res.data.data.list.length>0){
              this.list =this.list.concat(res.data.data.list)
              this.$nextTick(() => {
                this.$refs.scroller.reset()
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
  .dl{
    display:flex;
    padding:10px;
  }

  .dd{
    padding-left:10px;
  }
  .dt{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .dt image{
    width: 100%;
    max-height: 100%;
  }
  .num{
    display: flex;
    font-size:12px;
    padding-top: 6px;
  }
  .num span{
    color:#E64340
  }
  .dd_box{
    display:flex;
    justify-content:space-between;
  }
  .p_name{
    height: 50px;
  }
  .code{
    padding-top: 10px;
    color: #666;
    display: flex;
    align-items: center;
  }
  .code_span{
    font-size: 16px;
    color:#E64340;
  }

</style>
