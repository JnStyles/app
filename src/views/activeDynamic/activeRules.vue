<template>
  <div class="activeRules">
    <x-header :left-options="{backText: ''}">
      <a slot="left" class="close_icon" @click="goIndex">
        <svg slot="icon" class="icon" aria-hidden="true" style="width: 20px;height: 20px;">
          <use xlink:href="#iconclose"></use>
        </svg>
      </a>
      活动规则</x-header>

    <scroller lock-x ref="scroller" height="-51">
      <div>
        <group gutter='0'>
          <grid :show-vertical-dividers="false">
            <grid-item :label="item.name" :link="item.url" v-for="item in tabList" :key="item.id">
          <span slot="icon">
              <div :style="{'background':item.bg}" class="icon_fa" @click="handTab(item.id)">
                <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;color: #666">
                      <use :xlink:href="item.icon"></use>
                </svg>
              </div>
          </span>
            </grid-item>
          </grid>
        </group>

        <div style="line-height:50px;padding-left:15px;">{{type==1?'常见问题':type==2?'新手指南':type==3?'关于配送':type==4?'参与保障':type==5?'服务协议':''}}</div>
          <Collapse
            v-for="(item,index) in list"
            :key="index"
            class="rightFixed0"
            :Accordionindex="0"
            :isSlotSecond="0"
            :AccordionData="item.post_title"
            @click.native="handClick">
            <div class="baseInformation"
                 slot="First">
              {{item.post_title}}
            </div>
          </Collapse>
        </div>
    </scroller>
  </div>


</template>

<script>

  import Collapse from "@/components/Collapse";
  export default {
    data:function(){
      return {
        tabList:[{
          name:'新手指南',
          icon:'#iconcompass',
          url:'',
          id:2,
          bg:'#E64340'
        },
        {
          name:'关于配送',
          icon:'#iconrocket',
          url:'',
          id:3,
          bg:'#3385ff'
        },
        {
          name:'参与保障',
          icon:'#iconanquan',
          url:'',
          id:4,
          bg:'#ff5000'
        },
        {
          name:'服务协议',
          icon:'#iconread',
          url:'',
          id:5,
          bg:'#42b983'
        }],
         showContent0: false,
         type:1,
         list:[],
         baseInformation:'基本'
      }
    },
    components: {
      Collapse,
    },

    created(){
        this.getList();
    },
   
    methods:{
      getList(){
        let params ={
          type:this.type
        }
        this.$api.activity.getArticlesList(params).then(res =>{
          if(res){
            this.list =res.data.data.list
          }
        })
      },
      handClick(index){
        setTimeout(res =>{
          console.log(index)
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        },100)

      },
      //回首页
      goIndex(){
        console.log('回首页')
        this.$router.push('/')
      },
      handTab(index){
        this.type =index;
        this.getList();

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
  .close_icon{
    margin-left:30px;
    font-size:22px
  }
</style>
<style>
.activeRules .weui-cells{
  margin-top:0;
}
</style>

