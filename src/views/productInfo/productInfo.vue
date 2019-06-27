<template>
  <div class="productInfo">
    <x-header :left-options="{backText: ''}">礼品详情
      <!--<a slot="right" @click="toShare">分享图标</a>-->
    </x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-96" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
        <div>
          <card style="margin-top:0;">
            <div slot="content" class="card-demo-flex card-demo-content01">
              <swiper :list="info.photo_urls" v-model="swipe"></swiper>

              <div class="box">
                <div class="dl" style="border:none;">
                  <div class="dt">
                    <badge :text="info.status ==1?'进行中':info.status==2?'即将揭晓':info.status==3?'已开奖':''"></badge>
                  </div>
                  <div class="dd p_name" style="flex: 1">
                    【第{{info.periods}}期】{{info.name}}
                  </div>
                </div>
                <!-- 未开奖情况 -->
                <div v-if="info.status==1">
                  <p class="instructions" v-if="info.description">注：{{info.description}}</p>
                  <div class="pro_per">
                    <x-progress :percent="(Number(info.price)-Number(info.surplus_price))/(Number(info.price))*100" :show-cancel="false"></x-progress>
                    <div class="pro_box"><span>总需{{info.price}}</span><span>剩余 <span class="red">{{info.surplus_price}}</span></span></div>
                  </div>
                </div>
                <!-- 即将揭晓 -->
                <template v-if="info.status==2">
                  <div class="time_ji red_bg">
                    <span>幸运编码计算中</span>
                    <div style="width: 160px;">
                      <Clockers :time="info.open_award_time" @on-finish="getInfo" style="font-size: 20px;" format="%S 秒 %Z"></Clockers>
                    </div>
                  </div>
                </template>

                <!-- 已开奖 -->
                <div v-if="info.status==3" class="kai_box">
                  <div class="dl" style="border: none;">
                    <div class="dt">
                      <img :src="info.avatar" alt="">
                    </div>
                    <div class="dd">
                      <p class="blue">{{info.user_nickname}} &nbsp;&nbsp; <span class="font_small">{{this.info.address}}</span></p>
                      <p>参与 <span class="red">{{info.pay_count}}</span>人次</p>
                      <p class="font_small" style="font-size:12px;">揭晓时间&nbsp;&nbsp;{{info.open_award_time}}</p>
                      <p class="p_position font_small">
                        <badge text="获得者"></badge>
                      </p>
                    </div>
                  </div>
                  <div class="times red_bg"><div>幸运编码：<strong class="yellow">{{info.lucky_code}}</strong> </div> <span @click="goCalculate">计算详情</span>  </div>
                </div>
              </div>
            </div>
          </card>
          <card>
            <!-- 我未参与 -->
            <div slot="content" v-if="info.orderList && info.orderList.length==0" class="smail_box">
              赶快试试手气吧
            </div>
            <!--我已参与 -->
            <template v-else>
              <div slot="content"  class="can_box">
                <p>我已参与<span class="red">{{info.userOrderCount}}</span>人次</p>
                <p @click="goInfo" class="blue can_box_p">查看详情 <x-icon type="ios-arrow-forward" size="14"></x-icon> </p>
              </div>
              <div slot="footer" class="smail_footer">
                <p style="padding-left:10px;font-size:12px;color:#ccc;line-height:40px;">活动编码</p>
                <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
                  <grid-item v-for="item in info.orderList" :key="item.lucky_code">
                    {{item.lucky_code}}
                  </grid-item>
                </grid>
              </div>
            </template>
          </card>
          <card>
            <div slot="content">
              <grid :show-lr-borders="false">
                <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
                  <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                    <use :xlink:href="item.icon"></use>
                  </svg>
                </grid-item>
              </grid>
            </div>
          </card>
          <card class="card_list" v-if="list && list.length>0">
            <div slot="content">
              <cell
                title="活动记录"
                :border-intent="false"
                :arrow-direction="showContent001 ? 'up' : 'down'"
               ></cell>

              <div class="slide" :class="showContent001?'animate':''">
                <div class="dl" v-for="(item,index) in list" :key="index">
                  <div class="dt">
                    <img :src="item.avatar" alt="">
                  </div>
                  <div class="dd">
                    <p class="blue">{{item.user_nickname}} <span class="font_smalls">[{{item.address}}]</span></p>
                    <p class="font_smalls padtop">{{item.create_msectime}}</p>
                    <p class="p_position font_smalls">参与 <span class="red">{{item.pay_count}}</span>人次 </p>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
    </scroller>

    <actionsheet
      v-if="show"
      v-model="show"
      :menus="menus1"
      @on-click-menu="click"></actionsheet>

    <!-- footer悬浮按钮 -->
    <div class="footer">
        <!-- 没开奖 -->
        <template v-if="info.status==1">
              <x-button type="warn" style="width:90%;margin:0 auto;"  @click.native="handJoin">立即参与</x-button>
        </template>
        <!-- 已经开奖过了的 -->
        <template v-else>
              <p style="padding-left:10px;color:#ffffff;font-size:12px;">最新一期进行中</p>
              <x-button type="warn" style="width: 60% !important;" @click.native="goNew">立即前往</x-button>
        </template>

    </div>
      
    <!-- 立即参与弹窗 -->
    <div v-transfer-dom>
      <popup v-model="showBuy" height="264px" is-transparent>
          <popup-header
        :title="'请选择参与次数 (必须是'+info.participation_number+'的倍数)'"
        :show-bottom-border="false"></popup-header>
        <div style="background-color:#fff;height:210px;margin:0 auto;padding-top:10px;">
         <group class="g_box">
          <x-number v-model="buyNum" :fillable="true" :min="0" :max="Number(info.surplus_price)" :step="info.participation_number" width="7rem"></x-number>
            <div class="numBox">
                <checker v-model="buyNum" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item :value="Number(info.participation_number*1)">{{info.participation_number*1}}</checker-item>
                    <checker-item :value="Number(info.participation_number*2)">{{info.participation_number*2}}</checker-item>
                    <checker-item :value="Number(info.participation_number*3)">{{info.participation_number*3}}</checker-item>
                    <checker-item :value="Number(info.surplus_price)">包尾</checker-item>
                </checker>
            </div>
         </group>
         <div style="padding:20px 15px;">
          <x-button type="warn" @click.native="handBtn">确认</x-button>
         </div>
        </div>
      </popup>
    </div>

    <!--登录后参与-->
    <div v-transfer-dom>
      <confirm v-model="showLogin"
               title="请登录后参与"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">是否立即登录？</p>
      </confirm>
    </div>
  </div>
</template>

<script>

  import Clockers from "@/components/clocker/index";


  export default {
    data:function(){
      return {
        show:false,
        showLogin:false,
        showBuy:false,
        menus1: {
            menu1: '分享给朋友',
            menu2: '分享朋友圈'
        },
        swipeList: [
         
        ],
        swipe:0,
        percent:60,
        tabList:[],
        showContent001:true,
        info:'',
        id:'',
        buyNum:0,
        list:[],
        page:1,
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
      }
    },
    activated(){
        let id =this.$route.query.id;
        this.id =id;
        this.getInfo();

        this.page =1;
        this.getProList();//获取活动记录
    },

    components: {
      Clockers
    },

    methods:{
        //获取详情
        getInfo(cb){
            let params ={
                    id:this.id
                }
            this.$api.activity.getProductInfo(params).then(res =>{
                if(res){
                    this.info =res.data.data;
                    if(res.data.data.photo_urls.length>0){
                        this.buyNum =this.info.participation_number;
                        let arr =[];
                        for(let i=0;i<res.data.data.photo_urls.length;i++){
                            arr =[{"img":res.data.data.photo_urls[i]}]
                        }
                        this.info.photo_urls =arr;
                    }
                    let tabList =[{
                      name:'礼品简介',
                      icon:'#icongift',
                      url:'/productIntroduce?id='+this.id,
                      id:1
                    },
                      {
                        name:'活动分享',
                        icon:'#iconcamera',
                        url:'/activeShare?id='+this.id,
                        // url:'/comments?id='+this.id,
                        id:2
                      },
                      {
                        name:'活动动态',
                        icon:'#iconearth',
                        url:'/productDynamic?id='+this.id,
                        id:3
                      },
                      {
                        name:'计算规则',
                        icon:'#iconcalculator',
                        url:'/calculationRules',
                        id:4
                      }];
                    this.tabList =tabList;
                    cb && cb(res)
                }
            })
        },
        //获取活动记录
        getProList(cb){
          let params ={
            page:this.page,
            id:this.id
          };
          this.$api.activity.getProductPeriodsOrderList(params).then(res =>{
            if(res){
              this.list =res.data.data.list;
              cb && cb(res);
            }
          })
        },
        //点击分享
        toShare(){
            this.show =true;
        },
        click(){

        },
        goInfo(){
            this.$router.push('/participateInfo?id='+this.id)
        },
        //点击立即参与
        handJoin(){
            if(localStorage.getItem('token')){
              this.showBuy =true;
              this.showLogin  =false;
            }else{
              this.showLogin  =true;
            }
        },
        //点击立即购买
        handBtn(){
            if(this.buyNum<=0){
                this.$vux.toast.text('最少参与次数为'+this.info.participation_number);
                return false;
            }else if((this.buyNum)%(this.info.participation_number)!=0){
                this.$vux.toast.text('参与次数为'+this.info.participation_number+'的倍数');
                return false;
            }else{
                this.$router.push('/buyInfo?id='+this.id+'&balance='+this.buyNum)
            }
        },
      onConfirm(){
          console.log(this.$route)
          sessionStorage.setItem('goUrl',this.$route.fullPath);
          this.$router.push('/login')
      },
      onCancel(){
          this.showLogin  =false;
      },
      //去往最新一期的商品
      goNew(){
          this.id =this.info.newid;
          this.page =1;
          let url ='/productInfo?id='+this.id;
          this.$router.replace(url);
          this.getInfo();
          this.getProList();
      },
      //跳往计算详情
      goCalculate(){
          this.$router.push('/calculate?id='+this.id)
      },

      //上拉加载
      upLoad(){
        this.page +=1;
        let params ={
          page:this.page,
          id:this.id
        }
        this.$api.activity.getProductPeriodsOrderList(params).then(res =>{
          if(res){
            if(res.data.data.list.length>0){
              this.$nextTick(() => {
                this.list =this.list.concat(res.data.data.list)
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
        this.getInfo(res =>{
          this.$refs.scroller.donePulldown()
        });
        this.getProList();
      }
    }
  }
</script>
<style scoped>
    .box{
        padding:0 10px;
    }
    .pro_per{
        padding:10px 0;
    }
    .pro_box{
        display:flex;
        justify-content: space-between;
        font-size:12px;
        color:#cccccc;
        padding-top:6px;
    }
    .smail_box{
        height:40px;
        line-height:40px;
        text-align: center;
        font-size:14px;
    }
    .time_ji{
        display: flex;
        height:40px;
        font-size:14px;
        line-height:40px;
        text-align:center;
        color:#ffffff;
        margin:10px 0;
        justify-content: center;
    }
    .times{
        height:40px;
        line-height:40px;
        display: flex;
        justify-content: space-between;
        color:#ffffff;
        padding:0 10px;
        align-items: center;
        border-radius: 4px;
        margin-top: 10px;
    }
    .times span{
        font-size:12px;
        color:#ffffff;
        display: inline-block;
        width:60px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        border:1px solid #ffffff;
      border-radius: 4px;
    }
    .times strong{
      font-size: 16px;
    }
    .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .dt img{
      width:50px;
      height:50px;
      border-radius: 50%;
  }

    .dl{
        position: relative;
        border-bottom:1px solid #ccc;
        padding-top:10px;
    }
  .dd{
      padding-left: 10px;
  }
  .p_position{
      position: absolute;
      right:10px;
      top:20px;
  }
  .footer{
      width:100%;
      height: 50px;
      background:rgba(000, 000, 000, .9);
      position:fixed;
      display:flex;
      justify-content: space-between;
      align-items: center;
      bottom:0;
  }
  .footer button{
      padding:0;
      margin:0;
      margin-right:10px;
  }
  .p_name{
      font-size:16px;
  }
  .instructions{
      padding-top:10px;
  }
  .can_box{
      display:flex; 
      justify-content: space-between;
      padding:10px 10px;
      /* border-bottom:0.5px solid #ccc; */
      font-size:14px;
  }
  .kai_box{
      margin-bottom:10px;
  }
  .numBox{
     padding:10px 20px;
     display: flex;
     align-items: center;
     justify-content: center;
  }
  .vux-checker-box{
      display: flex;
      justify-content: space-between;
      width:100%;
  }
  .demo1-item {
    border: 1px solid #ececec;
    width: 20%;
    text-align: center;
    height: 30px;
    line-height:30px;
  }
    .demo1-item-selected {
        border: 1px solid #E64340;
}
    .weui-cells:before{
        border:none;
    }
    .card_list{
      margin-bottom: 150px;
    }
    .padtop{
      padding-top: 10px;
    }
    .can_box_p{
      font-size: 12px;
      display: flex;
      align-items: center;
    }

    
</style>
<style>
   .productInfo .weui-grid:before{
       height: 60px;
       top:20px;
   }
   .productInfo .time span{
        color:#ffc900;
    }
    .smail_footer .weui-grids:before{
        border:none;
    }
    .smail_footer .weui-grid{
        padding:0 20px 10px 10px;
        color:#ccc;
    }
    .smail_footer .weui-grid:after{
        border:none;
    }
    .weui-cells:before{
        border:none !important;
    }
   .weui-cells:after{
     border:none !important;
   }
    .g_box{
      width: 375px!important;
    }
   .productInfo .vux-x-icon {
     fill: blue;
   }
</style>



