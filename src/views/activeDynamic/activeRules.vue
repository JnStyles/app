<template>
  <div class="activeRules">
    <x-header :left-options="{backText: ''}"><a slot="left" style="padding-left:20px;font-size:20px;" @click="goIndex">×</a>活动规则</x-header>
  
    <group gutter='0'>
      <grid :show-vertical-dividers="false">
        <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
          <span slot="icon">
              <div :style="{'background':item.bg}" class="icon_fa">
                <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                      <use :xlink:href="item.icon"></use>
                </svg>
              </div>
          </span>
        </grid-item>
      </grid>
    </group>

    <div style="line-height:50px;padding-left:15px;">常见问题</div>
    <group style="margin-top:0;">
         <cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.post_title"
          is-link
          :border-intent="false"
          :arrow-direction="'showContent'+index ? 'up' : 'down'"
          @click.native="handClick(index)"></cell>
      <p class="slide" :class="'showContent'+index?'animate':''">123</p>
      </group>
  </div>
</template>

<script>
  export default {
    data:function(){
      return {
        tabList:[{
          name:'新手指南',
          icon:'#iconcompass',
          url:'',
          id:1,
          bg:'#E64340'
        },
        {
          name:'关于配送',
          icon:'#iconrocket',
          url:'',
          id:2,
          bg:'#3385ff'
        },
        {
          name:'参与保障',
          icon:'#iconanquan',
          url:'',
          id:3,
          bg:'#ff5000'
        },
        {
          name:'服务协议',
          icon:'#iconread',
          url:'',
          id:4,
          bg:'#42b983'
        }],
         showContent0: false,
         showContent1: false,
         showContent2: false,
         showContent3: false,
         showContent4: false,
         showContent5: false,
         showContent6: false,
         type:1,
         list:[]
      }
    },

    created(){
      let params ={
        type:this.type
      }
      this.$api.activity.getArticlesList(params).then(res =>{
        if(res){
          this.list =res.data.data.list
        }
      })
    },
   
    methods:{
      handClick(index){
          console.log(index)
      },
      //回首页
      goIndex(){
        console.log('回首页')
        this.$router.push('/')
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
  .icon_fa{
    width:36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<style>
.activeRules .weui-cells{
  margin-top:0;
}
</style>

