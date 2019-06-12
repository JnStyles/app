<template>
  <div class="home">
    <x-header :left-options="{showBack: false}">会员活动<a slot="right" @click="goPerson">我的活动</a></x-header>
    <swiper :list="swipeList" v-model="swipe"></swiper>
    

    <group gutter='0'>
      <grid :show-vertical-dividers="false">
      <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
        <!-- <img slot="icon" src="../assets/grid_icon.png"> -->
        <!--<icon slot="icon" type="success"></icon>-->
        <!--<i slot="icon" class="iconfont aliIcon-minganciku"></i>-->
        <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
          <use :xlink:href="item.icon"></use>
        </svg>

      </grid-item>
    </grid>
      <cell title="公告">
        <marquee>
          <marquee-item v-for="item in jiangList" :key="item.id" direction="down" @click.native="onClick(i)">恭喜{{item.user_nickname}}在活动中抽中{{item.name}}</marquee-item>
        </marquee>
      </cell>
    </group>

    <group>
       <tab :line-width=2 active-color='#fc378c' v-model="activeValue">
        <tab-item class="vux-center" :selected="activeValue == item.id" v-for="(item, index) in menuList" @on-item-click="handTab" :key="index">{{item.name}}</tab-item>
      </tab>
      <div>
          <panel style="margin-top:0;" @click.native="goInfo(item.id)" v-for="item in proList" :key="item.id">
            <div slot="body">
              <div class="dl">
                <div class="dt">
                  <!-- <img :src=item.photo_urls alt=""> -->
                  <img src="../assets/logo.png" alt="">
                </div>
                <div class="dd">
                  <p class="p_name">{{item.name}}</p>
                  <div class="dd_box">
                    <div style="padding-top:16px;">
                      <x-progress :percent="(item.sell_price)/(Number(item.surplus_price)+Number(item.sell_price))" :show-cancel="false"></x-progress>
                      <div class="num"><p>总需：{{Number(item.surplus_price)+Number(item.sell_price)}}</p><p>剩余：<span>{{item.surplus_price}}</span></p></div>
                    </div>
                    <x-button type="warn" style="width:100px;padding:0;margin:0;">立即参与</x-button>
                  </div>
                </div>
              </div>
            </div>
          </panel>
      </div>
    </group>

    <!-- 全部分类弹窗 -->
    <div v-transfer-dom>
      <popup v-model="show">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        title="选择分类"
        :show-bottom-border="false"
        @on-click-left="show = false"
        @on-click-right="show = false"></popup-header>
        <group gutter="0">
          <cell :title="item.name" v-for="item in goryList" :key="item.id" @click.native="handGory(item.id)">

          </cell>

          
        </group>
      </popup>
    </div>
  </div>
</template>

<script>

  import { Group, Cell,XHeader,Swiper,Grid,Icon, GridItem,Marquee, MarqueeItem,SwiperItem } from 'vux'
  import tabbar from '../components/Tabbar'

  export default {
    data:function(){
      return {
        swipe:0,
        swipeList: [],//图片轮播
        jiangList:[],//中奖用户列表
        proList:[],//商品列表
        tabList:[{
          name:'信息服务',
          icon:'#iconxinxichaxun',
          url:'',
          id:1
        },
        {
          name:'活动动态',
          icon:'#icongerentousudengji',
          url:'/activeDynamic',
          id:2
        },
        {
          name:'活动分享',
          icon:'#iconpaizhao',
          url:'/activeShare',
          id:3
        },
        {
          name:'活动记录',
          icon:'#iconjilu',
          url:'/activeRecord',
          id:4
        }],
        menuList:[{
          id:'0',
          name:'全部分类'
        },
        {
          id:'1',
          name:'人气'
        },
        {
          id:'2',
          name:'最新'
        },{
          id:'3',
          name:'进度'
        }],
        activeValue:0,
        type: '1',
        order_type:'',
        product_category_id:'',
        page:1,
        show:false,
        goryList:[]
      }
    },
    components: {
      Group,
      Cell,
      tabbar,
      XHeader,
      Swiper ,
      Grid,
      GridItem,
      Icon,
      Marquee, 
      MarqueeItem,
       SwiperItem 
    },
    created(){
      // let params ={
      //   mobile:'13611266774'
      // }
      // this.$api.activity.getLoginSmsCode(params).then(res =>{
      //   console.log(res)
      // })
      // 获取banner图和中奖纪录
      this.$api.activity.getBannerList({}).then(res =>{
        if(res){
          this.swipeList =res.data.data.banner_list;
          this.jiangList =res.data.data.product_periods_list;
        }
      })

      this.getProList();

      
    },

    methods:{
      //商品列表
      getProList(){
        let params ={
          page:this.page,
          product_category_id:this.product_category_id,
          order_type:this.order_type
        }
        this.$api.activity.getProductList(params).then(res =>{
          if(res){
            this.proList =res.data.data.list;
          }
        })
      },
      //点击tab切换
      handTab(index){
        console.log(index)
        if(index!=0){
          this.order_type =index;
          this.getProList();
        }else{
          this.show =true;
          if(this.goryList.length==0){
            this.getCategoryList();
          }
        }
       
      },
      //点击全部分类
      handGory(id){
        this.order_type =0;
        this.product_category_id =id;
        this.getProList();
        this.show =false;
      },
      //获取全部分类列表
      getCategoryList(){
        this.$api.activity.getCategoryList({}).then(res =>{
          if(res){
            this.goryList =res.data.data;
          }
        })
      },
      //点击获奖名单
      onClick(){
        console.log(123)
      },
      // 点击跳转礼品详情页面
      goInfo(id){
        this.$router.push('/productInfo?id='+id);
      },
      goPerson(){
        this.$router.push('/person');
      }
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
  }
  .dt img{
    width:100px;
    height:100px;
  }
  .dd{
    padding-left:10px;
    flex: 1;
  }
  .dd .p_name{
    min-height: 55px;
  }
  .num{
    display: flex;
    font-size:12px;
    padding-top: 6px;
  }
  .num span{
    color:red;
  }
  .dd_box{
    display:flex;
    justify-content:space-between;
  }
</style>
<style>
    .home .weui-cell__ft{
      text-align:left;
    }
</style>

