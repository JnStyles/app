<template>
  <div>
    <x-header :left-options="{backText: ''}">商品动态</x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-50" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div>
        <template v-if="list && list.length>0">
          <panel :header="'第'+item.periods+'期 &nbsp;'+item.open_award_time" v-for="item in list" :key="item.id" @click.native="goProInfo(item.id)">
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
        </template>
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
    data:function(){
      return {
        list: [],
        type:'1',
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
    methods:{
      getList(cb){
        let params ={
          page:this.page,
          id:this.$route.query.id
        }
        this.$api.activity.getProductPeriodsDynamic(params).then(res =>{
          if(res){
            this.isAxios =true;
            this.list =res.data.data.list
            cb && cb(res);
          }
        })
      },

      // /跳往商品详情页
      goProInfo(id){
          this.$router.push('/productInfo?id='+id)
      },

      //上拉加载
      upLoad(){
        this.page +=1;
        let params ={
          id:this.$route.query.id,
          page:this.page,
        }
        this.$api.activity.getProductPeriodsDynamic(params).then(res =>{
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .dt img{
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
