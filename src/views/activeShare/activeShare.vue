<template>
  <div class="activeShare">
    <x-header :left-options="{backText: ''}">活动分享</x-header>

    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-51" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div>
        <panel style="margin-top:0" v-if="list && list.length>0">
          <div slot="body">
            <template>
              <div class="dl" v-for="(item,index) in list" :key="index">
                <div class="dt">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="dd">
                  <p class="one"><span>{{item.user_nickname}} <i>{{item.address}}</i></span><span class="span">{{item.create_time}}</span> </p>
                  <p  class="two">{{item.name}}</p>
                  <div class="info">
                    <p>{{item.content}}</p>
                    <template v-if="item.photo_urls && item.photo_urls.length>0">
                      <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="cols">
                        <!--<grid-item v-for="(son,index) in item.photo_urls" :key="index" @click.native="lookImg(item.photo_urls)">-->
                        <grid-item v-for="(son,index) in item.photo_urls" :key="index">
                          <img slot="icon" :src="son" class="previewer-demo-img" @click="show(index,item.photo_urls)">
                        </grid-item>
                      </grid>
                    </template>
                  </div>



                  <div class="zan">

                    <div @click="handZan(item.id,index)" v-if="item.is_like==0" class="fa">
                      <vue-star animate="yourAnimateCssClass" color="rgb(152, 138, 222)">
                        <svg  slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;" @click="handZan(item.id,index)">
                          <use xlink:href="#iconlike"></use>
                        </svg>
                      </vue-star>
                    </div>

                    <div v-else-if="item.is_like==1" class="fa">
                      <svg slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
                        <use xlink:href="#iconlike-copy"></use>
                      </svg>
                      <!--<span>{{item.like_count}}</span>-->
                    </div>
                    <span>{{item.like_count}}</span>


                    <!--<div @click="handZan(item.id,index)" v-if="item.is_like==0">-->
                      <!--<svg  slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">-->
                        <!--<use xlink:href="#iconlike"></use>-->
                      <!--</svg>-->
                    <!--</div>-->

                    <!--<svg v-else-if="item.is_like==1" slot="icon" class="icon" aria-hidden="true" style="width: 30px;height: 30px;">-->
                      <!--<use xlink:href="#iconlike-copy"></use>-->
                    <!--</svg>-->

                  </div>
                </div>
              </div>
            </template>
          </div>
        </panel>
        <div v-else-if="list && list.length==0 && isAxios">
          <NoData></NoData>
        </div>
      </div>
    </scroller>

    <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
          <!--<x-img :src="src" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>-->
          <swiper height="500px" style="width: 70%;margin: 0 auto;" :list="img_list" v-model="img_index"></swiper>
          <br>
          <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
        </p>
      </x-dialog>
    </div>

    <!--<div v-transfer-dom>-->
      <previewer :list="img_list" ref="previewer" :options="options" @on-index-change="logIndexChange" @on-close="handClose"></previewer>
    <!--</div>-->

  </div>
   
</template>

<script>

  import NoData from "@/components/NoData";
  import VueStar from 'vue-star'

  export default {
    data:function(){
      return {
        list:[],
        type:'1',
        cols:3,
        page:1,
        id:'',
        img_index:0,
        isAxios:false,//是否执行完axios
        src:'',
        showDialogStyle:false,//查看图片弹窗
        img_list:[{
          src: 'https://placekitten.com/800/400',

        },
          {
            src: 'https://placekitten.com/1200/900',

          }],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
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
    components: {
      NoData,
      VueStar
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
            this.isAxios =true;
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
            setTimeout(res =>{
              this.list[index].like_count=1;
              this.list[index].is_like=1;
            },800)
          }
        })
      },

      //查看大图
      lookImg(srcArr){
        this.showDialogStyle =true;
        let img_list =[];
        if(srcArr && srcArr.length>0){
          for(let i=0;i<srcArr.length;i++){
            img_list.push({
              url:'javascript:',
              img: srcArr[i],
              // img: 'http://act.test.fableedu.com/public/product/5ce4f9e05eaa58RwrC4.png',
              title: ''
            })
          }
        }
        this.img_list =img_list;
        // this.src =src;
      },

      show (index,srcArr) {
        console.log(index)
        let img_list =[];
        if(srcArr && srcArr.length>0) {
          for (let i = 0; i < srcArr.length; i++) {
            img_list.push({
              msrc: srcArr[i],
              src: srcArr[i],
            })
          }
        }
        console.log(img_list)
        this.img_list =img_list;

        setTimeout(res =>{
          this.$refs.previewer.show(index)
        },300)

      },

      handClose(){
        this.img_list =[];
      },

      logIndexChange(){

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
      },
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
  }
  .dt{
    width:40px;
    height:40px;
  }
  .dt img{
    width:100%;
    max-height:40px;
    border-radius: 50%;
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
      color:blue;
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
      padding-right: 20px;
  }
  .fa{
    width: 30px;
    height: 30px;
    display: flex;
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
    .VueStar__ground{
      width: 30px;
      height: 30px;
    }
    .VueStar__decoration{
      top: -30px;
      left: -30px;
    }

</style>

