<template>
  <div>
    <x-header :left-options="{backText: ''}">活动动态<a slot="right" @click="goRules">活动规则</a></x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-48" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div>
        <template v-if="list && list.length>0">
          <panel style="margin:10px;border-radius:10px;" v-for="item in list" :key="item.id" @click.native="goInfo(item.id)">
            <div slot="body">
              <div class="dl product">
                <div class="dt">
                  <img :src="item.thumbnail" alt="">
                </div>
                <div class="dd">
                  <p class="p_name">{{item.name}}</p>
                  <p class="code" v-if="item.status==1"><span>幸运编码</span>&nbsp;&nbsp;<span class="code_span">{{item.lucky_code}}</span></p>

                  <!--即将开奖-->
                  <!--icondashboard-->
                  <p class="code" v-else-if="item.status==2">
                    <!--<svg slot="icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">-->
                      <!--<use xlink:href="#icondashboard"></use>-->
                    <!--</svg>-->
                    <span class="web-font red">即将揭晓</span>
                    <Clockers :time="item.open_award_time" @on-finish="getInfo" format="%M : %S : %Z"  style="font-size: 26px;padding-left: 6px;" class="red"></Clockers>
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
  import Clockers from "@/components/clocker/index";

  export default {
    data:function(){
      return {
        list: [],
        type:'1',
        isAxios: false,
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
        page:1,
        usePullup:false
      }
    },
    components: {
      NoData,
      Clockers
    },
    created(){
      setTimeout(res =>{
        this.$refs.scroller.disablePullup();
      },1)
    },
    activated(){
      if (!this.$route.meta.isUserCache) {
        this.page =1;
        this.getList();
      }
      this.$route.meta.isUserCache = false;
    },

    beforeRouteLeave(to, from, next) {
      if (to.path=="/productInfo") {
        console.log('开启缓存');
        from.meta.isUserCache = true; //开启缓存
      }
      next();
    },

    methods:{
      getList(cb){
        let params ={
          page:this.page
        }
        this.$api.activity.getProductPeriodsList(params).then(res =>{
          if(res){
            this.isAxios =true;
            if(res.data.data.totalCount<=10){
              console.log('禁用')
              this.$refs.scroller.disablePullup();
            }else{
              this.$refs.scroller.enablePullup();  //启用上拉加载组件
            }
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
          if(res.data.data.totalCount>10){
            this.$refs.scroller.enablePullup() //启用上拉加载
          }
        });
      }
    }
  }
</script>

<style scoped>
  .product{
    border-bottom: 1px solid #eeeeee;
  }
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
    border-radius: 50%;
  }
  .dt_smail img{
      width:100%;
      max-height:40px;
      border-radius: 50%;
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
    /*background: #E64340;*/
    font-size: 22px;
    color:#E64340;

  }

</style>
