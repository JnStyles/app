<template>
  <div class="home">
    <x-header :left-options="{showBack: false}">会员活动<a slot="right" @click="goPerson" style="display: flex;align-items: center;">
      <svg slot="icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
        <use xlink:href="#icongerenzhongxin"></use>
      </svg>
      我的活动</a></x-header>
    <div style="height:44px;" v-if="isTap" class='index_fixed'>
      <tab :line-width=2 active-color='#fc378c' v-model="activeValue">
        <tab-item class="vux-center" :selected="activeValue == 0" @on-item-click="handTab">
          {{product_category_name}} <x-icon type="ios-arrow-down" size="12"></x-icon>
        </tab-item>
        <tab-item class="vux-center" :selected="activeValue == 1" @on-item-click="handTab">人气</tab-item>
        <tab-item class="vux-center" :selected="activeValue == 2" @on-item-click="handTab">最新</tab-item>
        <tab-item class="vux-center" :selected="activeValue == 3" @on-item-click="handTab">进度</tab-item>
      </tab>
    </div>

    <scroller id="vux_view_box_body" lock-x use-pullup use-pulldown :pullup-config="pullupConfig"
              :pulldown-config="pulldownConfig" ref="scroller" height="-48"
              @on-pullup-loading="upLoad"
              @on-pulldown-loading="downLoad"
              @on-scroll ="handScroll"
    >
      <view-box>
        <swiper :list="swipeList" auto loop v-model="swipe" :show-desc-mask="false"></swiper>
        <group gutter='0'>
          <grid :show-vertical-dividers="false">
            <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id" style="position: relative;" @click.native="handGrid(item.id)">
              <div v-if="item.id==4 && unclaimed_count>0" slot="label">
                <p>{{item.name}}</p>
                <badge :text="unclaimed_count" style="position: absolute;top: 15px;right: 22px;"></badge>
              </div>
              <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                <use :xlink:href="item.icon"></use>
              </svg>
            </grid-item>
          </grid>
          <cell title="公告" v-if="jiangList && jiangList.length>0" is-link>
            <marquee :item-height="24">
              <marquee-item v-for="item in jiangList" :key="item.id" direction="down" @click.native="onClick(item.id)">恭喜{{item.user_nickname}}在活动中抽中{{item.name}}</marquee-item>
            </marquee>
          </cell>
        </group>
        <group>

          <div style="height: 44px;" v-if="isTap"></div>
          <div style="height:44px;" v-if="!isTap">
              <tab :line-width=2 active-color='#fc378c' v-model="activeValue">
                <tab-item class="vux-center" :selected="activeValue == 0" @on-item-click="handTab">
                  {{product_category_name}} <x-icon type="ios-arrow-down" size="12"></x-icon>
                </tab-item>
                <tab-item class="vux-center" :selected="activeValue == 1" @on-item-click="handTab">人气</tab-item>
                <tab-item class="vux-center" :selected="activeValue == 2" @on-item-click="handTab">最新</tab-item>
                <tab-item class="vux-center" :selected="activeValue == 3" @on-item-click="handTab">进度</tab-item>
              </tab>
          </div>

            <panel style="margin-top:0;" @click.native="goInfo(item.id)" v-for="(item,index) in proList" :key="index">
              <div slot="body">
                <div class="dl product">
                  <div class="dt">
                    <img :src=item.thumbnail alt="">
                  </div>
                  <div class="dd">
                    <p class="p_name">{{item.name}}</p>
                    <div class="dd_box">
                      <div class="dd_box_div">
                        <x-progress :percent="(item.sold_price)/(Number(item.surplus_price)+Number(item.sold_price))*100" :show-cancel="false"></x-progress>
                        <div class="num"><p>总需 &nbsp;{{Number(item.surplus_price)+Number(item.sold_price)}}</p><p>剩余&nbsp;<span>{{item.surplus_price}}</span></p></div>
                      </div>
                      <x-button mini type="warn">立即参与</x-button>
                    </div>
                  </div>
                </div>
              </div>
            </panel>
          <!--</div>-->
        </group>
      </view-box>
    </scroller>

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
          <cell :title="item.name" v-for="item in goryList" :key="item.id" @click.native="handGory(item.id,item.name)">
          </cell>
        </group>
      </popup>
    </div>

    <!--登录后参与-->
    <div v-transfer-dom>
      <confirm v-model="showLogin"
               title="请登录后查看"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">是否立即登录？</p>
      </confirm>
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
        isTap:false,
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
        unclaimed_count:'',
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
          name:'全部分类v'
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
        goryList:[ {
          id:0,
          name:'全部分类'
        }],
        showLogin:false,
        scroll:0,
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
        product_category_name:'全部分类'
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
    activated(){
      if (!this.$route.meta.isUserCache) {
        // 获取banner图和中奖纪录
        this.$api.activity.getBannerList({}).then(res =>{
          if(res){
            let bannerList =[];
            if(res.data.data.banner_list && res.data.data.banner_list.length>0){
              for(let i=0;i<res.data.data.banner_list.length;i++){
                bannerList.push({
                  img:res.data.data.banner_list[i].image,
                  title:res.data.data.banner_list[i].title,
                  url:res.data.data.banner_list[i].url,
                })
              }
            }

            this.swipeList =bannerList;
            this.jiangList =res.data.data.product_periods_list;
            this.unclaimed_count =res.data.data.unclaimed_count
          }
        });
        this.getProList();
        this.$route.meta.isUserCache = false;
      }
    },

    beforeRouteLeave(to, from, next) {
      if (to.path=="/productInfo") {
        console.log('开启缓存');
        from.meta.isUserCache = true; //开启缓存
      }
      next();
    },

    methods:{
      //获取商品列表
      getProList(cb){
        let params ={
          page:1,
          product_category_id:this.product_category_id,
          order_type:this.order_type
        }
        this.$api.activity.getProductList(params).then(res =>{
          if(res){
            this.proList =res.data.data.list;
            this.$refs.scroller.enablePullup();  //启用上拉加载组件
             if(res.data.data.totalCount<=10){
               console.log('禁用')
              this.$refs.scroller.disablePullup();
              }
            cb && cb(res);
          }
        })
      },

      //点击tab切换
      handTab(index){
        console.log(index)
        if(index!=0){
          this.order_type =index;
          this.getProList(res=>{
            this.$nextTick(() => {
              if(this.scroll>342){
                this.$refs.scroller.reset({top: 302})
              }else{
                this.$refs.scroller.reset({top: this.scroll})
              }
              this.isTap =false;

            })
          });
        }else{
          //点击全部分类
          this.show =true;
          if(this.goryList.length==1){
            this.getCategoryList();
          }
        }
      },

      //点击全部分类的子分类
      handGory(id,name){
        console.log(name)
        this.order_type =0;
        this.product_category_name =name;
        this.product_category_id =id;

        this.getProList(res =>{
          this.$nextTick(() => {
            if(this.scroll>342){
              this.$refs.scroller.reset({top: 302})
            }else{
              this.$refs.scroller.reset({top: this.scroll})
            }
            this.isTap =false;

          })
        });


        this.show =false;
      },

      //获取全部分类列表
      getCategoryList(){
        this.$api.activity.getCategoryList({}).then(res =>{
          if(res){
            this.goryList =this.goryList.concat(res.data.data);
          }
        })
      },

      //点击获奖名单
      onClick(id){
        console.log(id)
        console.log('点击获奖名单')
        this.$router.push('/productInfo?id='+id)
      },

      // 点击跳转礼品详情页面
      goInfo(id){
        this.$router.push('/productInfo?id='+id);
      },

      goPerson(){
         if(localStorage.getItem('token')){
            this.$router.push('/person');
          }else{
            this.$router.push('/login');
          }

      },

      //点击信息 服务
      handGrid(id){
        if(id==1){
          if (localStorage.getItem('token')) {
            //获取用户信息
            this.$api.activity.getUserInfo({}).then(res =>{
              if(res){
                this.$vux.alert.show({
                  title: '提示',
                  content: '信息服务'+res.data.data.total_recharge+'次',
                  onShow () {
                    console.log('Plugin: I\'m showing')
                  },
                  onHide () {
                    console.log('Plugin: I\'m hiding')
                  }
                })
              }
            })
          } else {
            // this.showLogin =true;
            sessionStorage.setItem('goUrl', this.$route.fullPath);
            this.$router.push('/login')
          }

        }
      },

      onConfirm() {
        sessionStorage.setItem('goUrl', this.$route.fullPath);
        this.$router.push('/login')
      },

      onCancel() {
        this.showLogin = false;
      },

      //上拉加载
      upLoad(){
        console.log('上拉加载')
        this.page +=1;

        let params ={
          page:this.page,
          product_category_id:this.product_category_id,
          order_type:this.order_type
        }
        this.$api.activity.getProductList(params).then(res =>{
          if(res){
            if(res.data.data.list.length>0){
              this.proList =this.proList.concat(res.data.data.list);
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
        this.getProList(res =>{
          if(res.data.data.totalCount>10){
            this.$refs.scroller.enablePullup() //启用上拉加载
          }
          this.$refs.scroller.donePulldown()
        });
      },

      // 分类悬浮
      handScroll(e){
        this.scroll =e.top;
        if(e.top>342){
            this.isTap =true;
        }else{
          this.isTap =false;
        }
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

    .home .weui-cells{
      margin-top: 10px !important;
    }
    .home .vux-label{
      width:56px;
    }
    .index_fixed{
      width: 100%;
      position: fixed;
      top: 46px;
      z-index: 999;
    }
  .home .weui-tab__panel{
    padding-bottom: 0 !important;
  }
</style>

