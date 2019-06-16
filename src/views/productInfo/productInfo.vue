<template>
  <div class="productInfo">
    <x-header :left-options="{backText: ''}">礼品详情<a slot="right" @click="toShare">分享图标</a></x-header>
    <card style="margin-top:0;">
        <div slot="content" class="card-demo-flex card-demo-content01">
            <actionsheet
            v-model="show"
            :menus="menus1"
            @on-click-menu="click"></actionsheet>
            <swiper :list="info.photo_urls" v-model="swipe"></swiper>
            
            <div class="box">
                <div class="dl" style="border:none;">
                    <div class="dt">
                        <badge :text="info.status ==1?'进行中':info.status==2?'即将揭晓':info.status==3?'已开奖':''"></badge>
                    </div>
                    <div class="dd p_name">
                        【第{{info.periods}}期】{{info.name}}
                    </div>
                </div>
                <!-- 未开奖情况 -->
                <div v-if="info.status==1">
                    <p class="instructions">注：{{info.description}}</p>
                    <div class="pro_per">
                        <x-progress :percent="(info.surplus_price)/(Number(info.price))*100" :show-cancel="false"></x-progress>
                        <div class="pro_box"><span>总需{{info.price}}</span><span>剩余 <span class="red">{{info.surplus_price}}</span></span></div>
                    </div>
                </div>
                 <!-- 即将揭晓 -->
                 <template v-if="info.status==2">
                     <div class="time_ji red_bg">幸运编码计算中  
                         <clocker :time="info.open_award_time" @on-finish="getInfo" format="%H小时%M分%S秒">
                            <!-- <span style="color:red">%D 天</span>
                            <span style="color:green">%H 小时</span>
                            <span style="color:blue">%M 分 %S 秒</span> -->
                         </clocker>
                    </div>
                 </template>

                 <!-- 已开奖 -->
                 <div v-if="info.status==3" class="kai_box">
                    <div class="dl">
                        <div class="dt">
                            <!-- <img :src="info.avatar" alt=""> -->
                            <img src="http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg" alt="">
                        </div>
                        <div class="dd">
                            <p class="blue">{{info.user_nickname}} <span class="font_small">[{{this.info.address}}]</span></p>
                            <p>参与 <span class="red">{{info.pay_count}}</span>人次</p>
                            <p class="font_small" style="font-size:12px;">揭晓时间&nbsp;&nbsp;{{info.open_award_time}}</p>
                            <p class="p_position font_small">
                                <badge text="获得者"></badge>
                            </p>
                        </div>
                    </div>
                    <div class="times red_bg">幸运编码：{{info.luck_code}}  <span>计算详情</span>  </div>
                 </div>
                
            </div>

           
            
        </div>
    </card>
    <card>
        <!-- 我未参与 -->
        <div slot="content" v-if="info.orderList && info.orderList.length==0" class="smail_box">
            赶快试试手气吧
        </div>
        <!-- 我已参与 -->
        <template v-else>
            <div slot="content"  class="can_box">
            <p>我已参与 <span class="red">12</span>人次</p>
            <p @click="goInfo" class="blue">查看详情 ></p>
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
    <card>
        <!-- <div slot="content" class="smail_box">
            活动记录
        </div> -->
        <div slot="content">
            <cell
                title="活动记录"
                is-link
                :border-intent="false"
                :arrow-direction="showContent001 ? 'up' : 'down'"
                @click.native="showContent001 = !showContent001"></cell>

            <div class="slide" :class="showContent001?'animate':''">
                <div class="dl">
                    <div class="dt">
                        <img src="../../assets/logo.png" alt="">
                    </div>
                    <div class="dd">
                        <p>用户名 <span class="font_small">[用户地址]</span></p>
                        <p class="font_small">2019.06.62 12:00</p>
                        <p class="p_position font_small">参与 <span class="red">130</span>人次 </p>
                    </div>
                </div>
            </div>
        </div>
    </card>
    
      <!-- footer悬浮按钮 -->
      <div class="footer">
          <!-- 未参加 -->
          <template v-if="info.orderList && info.orderList.length==0">
                <x-button type="warn" style="width:90%;margin:0 auto;"  @click.native="handJoin">立即参与</x-button>            
          </template>
          <!-- 参加过了 -->
          <template v-else>
                <p style="padding-left:10px;color:#ffffff;">最新一期进行中</p>
                <x-button type="warn" style="width:30%;">立即参与</x-button>
          </template>
         
      </div>
      
    <!-- 立即参与弹窗 -->
    <div v-transfer-dom>
      <popup v-model="showBuy" height="264px" is-transparent>
          <popup-header
        title="请选择参与次数"
        :show-bottom-border="false"></popup-header>
        <div style="background-color:#fff;height:210px;margin:0 auto;padding-top:10px;">
         <group>
          <x-number v-model="buyNum" :min="0" :step="info.participation_number" width="260px"></x-number>

          <div class="numBox">
             <checker v-model="buyNum" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="Number(5)">5</checker-item>
                <checker-item :value="Number(10)">10</checker-item>
                <checker-item :value="Number(20)">20</checker-item>
                <checker-item :value="Number(30)">包尾</checker-item>
            </checker>
         </div>

         <div style="padding:20px 15px;">
          <x-button type="warn">确认</x-button>
         </div>
         </group>
         
         
        </div>
      </popup>
    </div>
   
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        show:false,
        showBuy:false,
        menus1: {
            menu1: '分享给朋友',
            menu2: '分享朋友圈'
        },
        swipeList: [
         
        ],
        swipe:0,
        percent:60,
        tabList:[{
          name:'礼品简介',
          icon:'#icongift',
          url:'',
          id:1
        },
        {
          name:'活动分享',
          icon:'#iconcamera',
          url:'/comments'+this.id,
          id:2
        },
        {
          name:'活动动态',
          icon:'#iconearth',
          url:'/activeDynamic',
          id:3
        },
        {
          name:'计算规则',
          icon:'#iconcalculator',
          url:'/activeRecord',
          id:4
        }],
         showContent001:false,
         info:'',
         id:'',
         buyNum:0
      }
    },
    created(){
        let id =this.$route.query.id;
        this.id =id;
        this.getInfo();
    },
    methods:{
        getInfo(){
            let params ={
                    id:this.id
                }
            this.$api.activity.getProductInfo(params).then(res =>{
                if(res){
                    this.info =res.data.data;
                    if(res.data.data.photo_urls.length>0){
                        let arr =[];
                        for(let i=0;i<res.data.data.photo_urls.length;i++){
                            arr =[{"img":res.data.data.photo_urls[i]}]
                        }
                    this.info.photo_urls =arr;
                    }
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
            this.showBuy =true;
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
    }
    .time_ji{
        height:40px;
        font-size:14px;
        line-height:40px;
        text-align:center;
        color:#ffffff;
        margin:10px 0;
    }
    .times{
        height:40px;
        line-height:40px;
        display: flex;
        justify-content: space-between;
        color:#ffffff;
        padding:0 10px;
        align-items: center;
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
      width: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
  }
  .vux-checker-box{
      display: flex;
      justify-content: space-between;
      width:86%;
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
    
</style>
<style>
   .productInfo .weui-grid:before{
       height: 60px;
       top:20px;
   }
   .productInfo .time span{
        color:yellow;
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
</style>



