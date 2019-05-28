<template>
  <div>
    <x-header :left-options="{showBack: false}">会员活动<a slot="right">我的活动</a></x-header>
    <swiper :list="swipeList" v-model="swipe"></swiper>
    

    <group gutter='0'>
      <grid :show-vertical-dividers="false">
      <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
        <!-- <img slot="icon" src="../assets/grid_icon.png"> -->
        <icon slot="icon" type="success"></icon>
      </grid-item>
    </grid>
      <cell title="公告">
        <marquee>
          <marquee-item v-for="i in 5" :key="i" direction="down" @click.native="onClick(i)">恭喜张先生在抽奖活动中获得了一等奖</marquee-item>
        </marquee>
      </cell>
    </group>

    <group>
       <tab :line-width=2 active-color='#fc378c' v-model="activeValue">
        <tab-item class="vux-center" :selected="activeValue == item" v-for="(item, index) in menuList" @click="activeValue = item" :key="index">{{item}}</tab-item>
      </tab>
          <panel style="margin-top:0;" @click="goInfo">
            <div slot="body">
              <div class="dl">
                <div class="dt">
                  <img src="../assets/logo.png" alt="">
                </div>
                <div class="dd">
                  <p>中国石化200元加油卡哇哈哈哈哈哈哈</p>
                  <div class="dd_box">
                    <div style="padding-top:16px;">
                      <x-progress :percent="60" :show-cancel="false"></x-progress>
                      <div class="num"><p>总需：256</p><p>剩余：<span>29</span></p></div>
                    </div>
                    <x-button type="warn" style="width:100px;padding:0;margin:0;">立即参与</x-button>
                  </div>
                </div>
              </div>
            </div>
          </panel>
    </group>
  </div>
</template>

<script>

  import { Group, Cell,XHeader,Swiper,Grid,Icon, GridItem,Marquee, MarqueeItem,SwiperItem } from 'vux'
  import tabbar from '../components/Tabbar'

  export default {
    data:function(){
      return {
        swipe:0,
        swipeList: [{
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg', // 404
          title: '送你一次旅行',
          fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
        }],
        tabList:[{
          name:'信息服务',
          icon:'',
          url:'',
          id:1
        },
        {
          name:'活动动态',
          icon:'',
          url:'/activeDynamic',
          id:2
        },
        {
          name:'活动分享',
          icon:'',
          url:'/activeShare',
          id:3
        },
        {
          name:'活动记录',
          icon:'',
          url:'/activeRecord',
          id:4
        }],
        menuList:['全部分类', '人气', '最新', '进度'],
        activeValue:'全部分类',
        type: '1',
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell'
      }, {
        src: 'http://somedomain.somdomain/x.jpg',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        }
      }],
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
    methods:{
      onClick(){
        console.log(123)
      },
      // 点击跳转礼品详情页面
      goInfo(){
        this.$router.push('/productInfo');
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
