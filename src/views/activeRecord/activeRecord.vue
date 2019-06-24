<template>
  <div class="activeRecord">
    <x-header :left-options="{backText: ''}">活动记录</x-header>
    <tab v-model="status">
      <tab-item @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">进行中</tab-item>
      <tab-item @on-item-click="onItemClick">已抢到</tab-item>
      <tab-item @on-item-click="onItemClick">未领取</tab-item>
    </tab>
    <scroller lock-x use-pullup use-pulldown :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" ref="scroller" height="-100" @on-pullup-loading="upLoad" @on-pulldown-loading="downLoad">
      <div class="timeline-demo">
        <timeline>
          <template v-if="list &&list.length>0">
            <timeline-item v-for="(item,index) in list" :key ="index">
              <p class="time" v-if="item.month">{{item.month}}月{{item.day}}号</p>
              <template v-if="item.son && item.son.length>0">
                <panel style="margin:6px;" v-for="son in item.son" :key="son.id">
                  <div slot="body">
                    <div class="dl product" @click="goProInfo(son.id)">
                      <div class="dt">
                        <img :src="son.photo_urls" alt="">
                      </div>
                      <div class="dd">
                        <p class="p_name">{{son.name}}</p>
                        <div class="dd_box"><p>我已参与 <span class="red">{{son.pay_count}}</span>人次</p>
                          <template v-if="son.status==1">
                              <svg slot="icon" class="icon" aria-hidden="true" style="width: 50px;height: 50px;">
                                <use xlink:href="#iconzhongjiangliao"></use>
                              </svg>
                          </template>
                          <template v-if="son.status==2">
                              <svg slot="icon" class="icon" aria-hidden="true" style="width: 50px;height: 50px;">
                                <use xlink:href="#iconjinhangzhong2"></use>
                              </svg>
                          </template>
                          <template v-if="son.status==3">
                              <svg slot="icon" class="icon" aria-hidden="true" style="width: 50px;height: 50px;">
                                <use xlink:href="#iconweizhongjiang"></use>
                              </svg>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="btn_box" v-if="son.status==1">
                      <x-button  mini v-if="son.all_get_type==0" @click.native="goGetproduct(son.id,son.name,son.get_type)" style="margin-right:10px;" type="warn">立即领取</x-button>
                      <x-button mini v-else plain :link="'/getInfo?id='+son.id" style="margin-right:10px;">领取详情</x-button>
                      <x-button mini plain :link="'/comments?id='+son.id">晒单</x-button>
                    </div>
                  </div>
                </panel>
              </template>
            </timeline-item>
            <!--zu最后添加一个空的-->
            <timeline-item></timeline-item>
          </template>
          <div v-else-if="list && list.length==0 && isAxios">
            <NoData></NoData>
          </div>
        </timeline>
      </div>
    </scroller>

    <!-- 二次确认弹框 -->
    <div v-transfer-dom>
      <confirm v-model="isAlert"
               show-input
               title="请输入登录密码"
               content="为保护您的账户安全"
               :input-attrs="{type: 'password'}"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
      </confirm>
    </div>

  </div>

</template>

<script>

  import NoData from "@/components/NoData";

  export default {
    data: function () {
      return {
        list:[],
        menuList: ['全部', '进行中', '已抢到', '未领取'],
        activeValue: '全部',
        isAlert: false,
        status:0,
        isAxios:false,
        page:1,
        id:'',
        name:'',
        get_type:'',//领取方式
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
    },

    created(){
      console.log(this.$route.query)
      if(this.$route.query.status){
        this.status =2
      }
      this.getList();
    },
    methods: {
      getList(cb){
        let params ={
          page:1,
          status:this.status
        }
        this.$api.activity.getProductPeriodsLog(params).then(res =>{
          if(res){
            this.isAxios =true;
            this.list =res.data.data.list
            if(res.data.data.list.length>0){
              this.$refs.scroller.enablePullup();  //启用上拉加载组件
            }
            if(res.data.data.totalCount<=10){
               console.log('禁用')
               this.$refs.scroller.disablePullup();
            }
            cb && cb(res);
          }
        })
      },
      onItemClick(index) {
        console.log(index)
        this.status =index;
        this.getList();
      },

      //点击领取礼品页
      goGetproduct(id,name,get_type) {
        this.id =id;
        this.name =name;
        this.get_type =get_type;
        this.isAlert = true;
      },

      //点击取消按钮触发
      onCancel() {
        console.log('取消')
      },

      //点击确定按钮触发
      onConfirm(value) {
        console.log('确定')
        console.log(value)
        let params ={
          password:value
        }
        this.$api.activity.verificationPassword(params).then(res =>{
          if(res){
            this.$router.push('/getProduct?id='+this.id+'&name='+this.name+'&get_type='+this.get_type)
          }
        })
      },
      onShow() {

      },
      onHide() {

      },

      goProInfo(id){
          this.$router.push('/productInfo?id='+id)
      },

      //上拉加载
      upLoad(){
        this.page +=1;
        let params ={
          page:this.page,
          status:this.status
        }
        this.$api.activity.getProductPeriodsLog(params).then(res =>{
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
          if(res.data.data.totalCount>10){
            this.$refs.scroller.enablePullup() //启用上拉加载
          }
          this.$refs.scroller.donePulldown();
        });
      }
    }
  }
</script>

<style scoped>
  .dl {
    display: flex;
    padding: 10px;
    padding-bottom: 0;
    padding-left:0;
  }

  .dd {
    padding-left: 10px;
  }

  .num {
    display: flex;
    font-size: 12px;
    padding-top: 6px;
  }

  .num span {
    color: red;
  }

  .dd_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top:10px;
    color: #666;
  }

  .btn_box {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
  .p_name{
    min-height:50px;
  }
  .time{
    font-size:16px;
    font-weight: 600;
  }

  /* .btn_box button {
    height:40px;
  } */
</style>
<style>
  .activeRecord .vux-timeline-item-checked.weui-icon-success-no-circle::before {
    font-size: 0;
  }

  .activeRecord .vux-timeline-item-head-first {
    width: 10px;
    height: 10px;
    left: 1px;
  }
  .activeRecord .vux-timeline{
    padding: 20px;
  }
  .activeRecord .vux-timeline-item-content{
    padding-left: 16px;
    padding-bottom: 1px;
  }
  .activeRecord .weui-btn + .weui-btn{
      margin:0;
  }
</style>
<style>
  
</style>

