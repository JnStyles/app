<template>
  <div class="activeShare">
    <x-header :left-options="{backText: ''}">活动分享</x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-50" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div>
        <panel style="margin-top:0">
          <div slot="body">
            <div class="dl" v-for="(item,index) in list" :key="index">
              <div class="dt">
                <!--<img src="../../assets/logo.png" alt="">-->
                 <img :src="item.avatar" alt="">
              </div>
              <div class="dd">
                <p class="one"><span>{{item.user_nickname}} <i>地区</i></span><span class="span">{{item.create_time}}</span> </p>
                <p  class="two">{{item.name}}</p>
                <div class="info">
                  <p>{{item.content}}</p>
                  <template v-if="item.photo_urls && item.photo_urls.length>0">
                    <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="cols">
                      <grid-item link="/component/cell" v-for="(son,index) in item.photo_urls" :key="index">
                        <!--<img slot="icon" src="../../assets/logo.png">-->
                         <img slot="icon" :src="son">
                      </grid-item>
                    </grid>
                  </template>
                </div>
                <div class="zan">
                  <div @click="handZan(item.id,index)" v-if="item.is_like==0">
                    <svg  slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                      <use xlink:href="#iconlike"></use>
                    </svg>
                  </div>

                  <svg v-else-if="item.is_like==1" slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                    <use xlink:href="#iconlike-copy"></use>
                  </svg>
                  {{item.like_count}}
                </div>
              </div>
            </div>
          </div>
        </panel>
      </div>
    </scroller>
    
  </div>
   
</template>

<script>


  export default {
    data:function(){
      return {
        list:[],
        type:'1',
        cols:3,
        page:1,
        id:'',
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
    created(){
      if(this.$route.query.id){
        this.id =this.$route.query.id;
      }
      this.getList();
    },
    methods:{
      getList(cb){
        let params ={
          page:1,
          id:this.id
        };
        this.$api.activity.getShareList(params).then(res =>{
          if(res){
            this.list =res.data.data.list;
             if(res.data.data.totalCount<=10){
               console.log('禁用')
               this.$refs.scroller.disablePullup();
            }
            cb && cb(res)
          }
        })
      },

      handZan(id,index){
        console.log(id)
        console.log(index)
        
        let params ={
          id:id,
        }
        this.$api.activity.shareLike(params).then(res =>{
          if(res){
            this.list[index].like_count=1;
            this.list[index].is_like=1;
          }
        })
      },

      //上拉加载
      upLoad(){
        this.page +=1;
        let params ={
          page:this.page,
          id:this.id
        }
        this.$api.activity.getShareList(params).then(res =>{
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
          this.$refs.scroller.enablePullup() //启用上拉加载
        });
      }
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
  }
  .dt{
    width:30px;
    height:30px;
  }
  .dt img{
    width:100%;
  }
  .dd{
    padding-left:10px;
    flex:1;
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
  .one{
      color:bule;
      font-size: 14px;
  }
  .one span{
      color:#ccc;
  }
  .one .span{
      float: right;
      font-size: 12px;
  }
  .one i{
      font-style: normal;
  }
  .info{
      color:#ccc;
  }
  .zan{
      float: right;
      display:flex;
      align-items: center;
  }
 
</style>

<style>
    .activeShare .weui-grids::before{
        border:none;
    }
   .activeShare .weui-grid:after{
       border:none;
   }
   .activeShare .weui-grid__icon{
        width:80px;
        height: 80px;
   }
</style>

