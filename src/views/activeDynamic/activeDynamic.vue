<template>
  <div>
    <x-header :left-options="{backText: ''}">活动动态<a slot="right" @click="goRules">活动规则</a></x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-48" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div>
        <panel style="margin:10px;border-radius:10px;" v-for="item in list" :key="item.id" @click.native="goInfo(item.id)">
          <div slot="body">
            <div class="dl product">
              <div class="dt">
                <img :src="item.photo_urls" alt="">
              </div>
              <div class="dd">
                <p class="p_name">{{item.name}}</p>
                <p class="code" v-if="item.status==1"><badge text="幸运编码"></badge>&nbsp;&nbsp;<span class="code_span">{{item.lucky_code}}</span></p>

                <!--即将开奖-->
                <!--icondashboard-->
                <p class="code" v-else-if="item.status==2">
                  <svg slot="icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
                    <use xlink:href="#icondashboard"></use>
                  </svg>
                  <clocker :time="item.open_award_time" @on-finish="getInfo" format="%H小时%M分%S秒"  style="font-size: 20px;padding-left: 20px;" class="red"></clocker>
                  <!--<clocker time="2019-06-22 18:47:02" @on-finish="getInfo" format="%H小时%M分%S秒" style="font-size: 20px;padding-left: 20px;" class="red"></clocker>-->
                </p>
              </div>
            </div>

            <div class="dl" v-if="item.status ==1">
              <div class="dt_smail">
                <img :src="item.avatar" alt="">
              </div>
              <div class="dd_smail">
                <p>获得者:&nbsp;<span class="user">{{item.user_nickname}}</span>&nbsp;{{item.address}}</p>
                <p class="fontsize12">参与 <span class="pay_count">{{item.pay_count}}</span> 人次 <span>&nbsp;&nbsp;揭晓时间：{{item.open_award_time}}</span></p>
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
        list: [],
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
          page:this.page
        }
        this.$api.activity.getProductPeriodsList(params).then(res =>{
          if(res){
            this.list =res.data.data.list
            cb && cb(res);
          }
        })
      },
      //跳转活动规则
      goRules(){
        this.$router.push('/activeRules')
      },

      // 倒计时结束时触发
      getInfo(id){
        this.getList()
      },

      //跳往商品详情页
      goInfo(id){
        this.$router.push('productInfo?id='+id)
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
  .dd_smail{
      padding-left: 10px;
      color:#666;
  }
  .dd_smail .user{
    color:blue;
  }
  .dd_smail .pay_count{
    color:#E64340
  }
  .dt_smail{
    width:40px;
    height:40px;
  }
  .dt_smail img{
      width:100%;
      max-height:40px;
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
