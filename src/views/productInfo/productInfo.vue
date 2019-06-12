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
                <flexbox>
                    <flexbox-item :span="2">
                        <badge :text="info.status ==1?'进行中':info.status==2?'即将揭晓':info.status==3?'已开奖':'异常'"></badge>
                    </flexbox-item>
                    <flexbox-item>
                        【第{{info.periods}}期】{{info.name}}
                    </flexbox-item>
                </flexbox>
                <!-- 未开奖情况 -->
                <div v-if="info.status==1">
                    <p class="instructions">注：{{info.description}}</p>
                    <div class="pro_per">
                        <x-progress :percent="percent" :show-cancel="false"></x-progress>
                        <div class="pro_box"><span>总需2400</span><span>剩余1200</span></div>
                    </div>
                </div>
                 <!-- 即将揭晓 -->
                 <div v-if="info.status==2">
                     <div class="time red_bg">幸运编码计算中  
                         <clocker :time="info.open_award_time">
                            <!-- <span style="color:red">%D 天</span>
                            <span style="color:green">%H 小时</span>
                            <span style="color:blue">%M 分 %S 秒</span> -->
                         </clocker>
                    </div>
                 </div>

                 <!-- 已开奖 -->
                 <div v-if="info.status==3">
                    <div class="dl">
                        <div class="dt">
                            <img :src="info.avatar" alt="">
                        </div>
                        <div class="dd">
                            <p>{{info.user_nickname}} <span class="font_small">[用户地址]</span></p>
                            <p>参与 <span class="red">{{info.pay_count}}</span>人次</p>
                            <p class="font_small">2019.06.62 12:00</p>
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
        <!-- 我已参与 -->
        <!-- <div slot="content" class="smail_box">
            赶快试试手气吧
        </div> -->
        <!-- 我未参与 -->
        <div slot="content" style="display:flex; justify-content: space-between;padding:10px 10px;border-bottom:1px solid #ccc;">
            <p>我已参与12人次</p>
            <p @click="goInfo">查看详情</p>
        </div>
         <div slot="footer" class="smail_footer">
           <p style="padding-left:10px;font-size:12px;color:#ccc;line-height:40px;">活动编码</p>
           <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
                <grid-item v-for="item in info.orderList" :key="item.lucky_code">
                     {{item.lucky_code}}
                </grid-item>
            </grid>
        </div>

    </card>

    <card>
        <div slot="content">
            <!-- <group gutter='0'>
            <grid :show-vertical-dividers="false">
                <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
                    <icon slot="icon" type="success"></icon>
                </grid-item>
            </grid>
            </group> -->
            <grid :show-lr-borders="false">
                <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
                     <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                </grid-item>
            </grid>
        </div>
    </card>

    <card style="padding-bottom:50px;">
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
          <x-button type="warn" style="width:90%;margin:0 auto;">立即参与</x-button>
          <!-- 参加过了 -->
          <div>
                <!-- <p style="padding-left:10px;color:#ffffff;">最新一期进行中</p>
                <x-button type="warn" style="width:30%;">立即参与</x-button> -->
          </div>
         
      </div>
      

   
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        show:false,
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
          url:'/activeDynamic',
          id:2
        },
        {
          name:'活动动态',
          icon:'#iconearth',
          url:'/activeShare',
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
         id:''
      }
    },
    created(){
        let id =this.$route.query.id;
        this.id =id;
        let params ={
            id:id
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
    methods:{
        //点击分享
        toShare(){
            this.show =true;
        },
        click(){

        },
        goInfo(){
            this.$router.push('/participateInfo?id='+this.id)
        }
    }
  }
</script>
<style scoped>
    .box{
        padding:0 10px;
    }
    .pro_per{
        padding-top: 10px;
    }
    .pro_box{
        display:flex;
        justify-content: space-between;
        font-size:14px;
        color:#cccccc;
    }
    .smail_box{
        height:40px;
        line-height:40px;
        text-align: center;
    }
    .time{
        height:40px;
        line-height:40px;
        text-align:center;
        color:#ffffff;
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
</style>



