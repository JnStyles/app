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
        <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-170" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
          <div>
            <panel style="margin-top:0;" @click.native="goInfo(item.id)" v-for="(item,index) in proList" :key="index">
              <div slot="body">
                <div class="dl product">
                  <div class="dt">
                    <img :src=item.photo_urls alt="">
                  </div>
                  <div class="dd">
                    <p class="p_name">{{item.name}}</p>
                    <div class="dd_box">
                      <div class="dd_box_div">
                        <x-progress :percent="(item.sell_price)/(Number(item.surplus_price)+Number(item.sell_price))*100" :show-cancel="false"></x-progress>
                        <div class="num"><p>总需 &nbsp;{{Number(item.surplus_price)+Number(item.sell_price)}}</p><p>剩余&nbsp;<span>{{item.surplus_price}}</span></p></div>
                      </div>
                      <x-button mini type="warn">立即参与</x-button>
                    </div>
                  </div>
                </div>
              </div>
            </panel>
          </div>
        </scroller>
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
          name:'全部分类  ∨'
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
        show:false,
        goryList:[],
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
      Group,
      Cell,
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
      // 获取banner图和中奖纪录
      this.$api.activity.getBannerList({}).then(res =>{
        if(res){
          this.swipeList =res.data.data.banner_list;
          this.jiangList =res.data.data.product_periods_list;
        }
      });
      this.getProList();
    },

    methods:{
      //获取商品列表
      getProList(cb){
        let params ={
          page:this.page,
          product_category_id:this.product_category_id,
          order_type:this.order_type
        }
        this.$api.activity.getProductList(params).then(res =>{
          if(res){
            this.proList =res.data.data.list;
            cb && cb(res);
            // if(res.data.data.totalCount==this.proList){
            //   this.$refs.scroller.disablePullup()
            // }
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
        console.log('点击获奖名单')
      },
      // 点击跳转礼品详情页面
      goInfo(id){
        this.$router.push('/productInfo?id='+id);
      },
      goPerson(){
        this.$router.push('/person');
      },
      //上拉加载
      upLoad(){
        console.log('上拉加载')
        // this.page +=1;
        this.page=1;

        let params ={
          page:this.page,
          product_category_id:this.product_category_id,
          order_type:this.order_type
        }
        this.$api.activity.getProductList(params).then(res =>{
          if(res){
            this.$refs.scroller.donePullup()
            this.proList =this.proList.concat(res.data.data.list);
              this.$nextTick(() => {
                this.$refs.scroller.reset()
              })
              console.log(this.proList)
          }
        })

        // this.getProList(res =>{
        //   if(res){
        //     let newArr =this.proList;
        //     this.$refs.scroller.donePullup()
        //     console.log('回调返回数据为')
        //     console.log(res)
        //     newArr =newArr.concat(res.data.data.list);
        //     console.log(newArr)
        //     this.proList =newArr;
        //     this.$nextTick(() => {
        //       this.$refs.scroller.reset()
        //     });
        //     console.log(this.proList)
        //   }
        // });
      },
      //下拉刷新
      downLoad(){
        console.log('下拉刷新')
        setTimeout(res =>{
          this.$refs.scroller.donePulldown()
        },1000)
      }
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
  }
  /* .dt{
    width:100px;
    height:100px;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .dt img{
    width:100%;
    max-height:100%;
  } */
  .dd{
    padding-left:10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between
  }
  .dd .p_name{
    /* min-height: 55px; */
     text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .num{
    display: flex;
    font-size:12px;
    padding-top: 6px;
    justify-content: space-between;
    color:#666;
  }
  .num span{
    color:red;
  }
  .dd_box{
    display:flex;
    justify-content:space-between;
  }

  .dd_box .dd_box_div{
    padding-top: 12px;
    padding-right:10px;
    flex:1;
  }
</style>
<style>
    .home .weui-cell__ft{
      text-align:left;
    }
    .home .weui-cell:before{
      border:none;
    }
    .xs-plugin-pullup-container{
      font-size:12px !important;
      line-height: 40px !important;
    }
</style>

