<template>
  <div class="activeRecord">
    <x-header :left-options="{backText: ''}">活动记录</x-header>
    <tab>
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">进行中</tab-item>
      <tab-item @on-item-click="onItemClick">已抢到</tab-item>
      <tab-item @on-item-click="onItemClick">未领取</tab-item>
    </tab>
    <div class="timeline-demo">

      <timeline>
        <timeline-item v-for="(item,index) in list" :key ="index">
          <p v-if="item.month">{{item.month}}月{{item.day}}号</p>
          <template v-if="item.son && item.son.length>0">
            <panel style="margin:10px;border-radius:10px;" v-for="son in item.son" :key="son.id">
              <div slot="body">
                <div class="dl">
                  <div class="dt">
                    <img src="../../assets/logo.png" alt="">
                    <!-- <img :src="son.photo_urls" alt=""> -->
                  </div>
                  <div class="dd">
                    <p>{{son.name}}</p>
                    <div class="dd_box"><p>我已参与 <span>{{son.pay_count}}</span>人次</p>
                      <badge :text="son.status==1?'已抢到':son.status==2?'进行中':son.status==3?'未中奖':''"></badge>
                    </div>
                  </div>
                </div>
                <div class="btn_box" v-if="son.status==1">
                  <x-button  mini v-if="son.all_get_type==0" @click.native="goGetproduct" style="margin-right:10px;" type="warn">立即领取</x-button>
                  <x-button mini v-else type="warn" :link="'/getInfo?id='+son.id" style="margin-right:10px;">领取详情</x-button>
                  <x-button mini type="warn" :link="'/comments?id='+son.id">晒单</x-button>
                </div>
              </div>
            </panel>
          </template>
        </timeline-item>
      </timeline>
    </div>

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


  export default {
    data: function () {
      return {
        list:[
            {
                "month_day": "0531",
                "month": "05",
                "day": "31",
                "son": [
                    {
                        "id": 14,
                        "name": "还不够就能看",//商品名
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",//照片
                        "all_get_type": 0,//0用户还没有领取，剩下的都是领取
                        "get_type": 1,//领取方式（1-邮寄 ，2-话费充值，3-京东卡，4-石油卡）--跳转到领取页使用
                        "pay_count": "160",//我参与的人次
                        "month": "05",
                        "day": "31",
                        "month_day": "0531",
                        "status": 1//1中奖，2进行中，3未中奖
                    },
                    {
                        "id": 13,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "11",
                        "month": "05",
                        "day": "31",
                        "month_day": "0531",
                        "status": 1
                    }
                ]
            },
            {
                "month_day": "0530",
                "month": "05",
                "day": "30",
                "son": [
                    {
                        "id": 12,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "12",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 1
                    },
                    {
                        "id": 11,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "12",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 1
                    },
                    {
                        "id": 10,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "12",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 1
                    },
                    {
                        "id": 9,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "12",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 1
                    },
                    {
                        "id": 8,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "13",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 1
                    },
                    {
                        "id": 7,
                        "name": "商品2",
                        "photo_urls": "http://prize.xin/upload/default/20190522/2564731412983f3354ebba5db6b48482.jpg",
                        "all_get_type": 5,
                        "get_type": 1,
                        "pay_count": "15",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 1
                    }
                ]
            },
            {
             
            }
        ],
        menuList: ['全部', '进行中', '已抢到', '未领取'],
        activeValue: '全部',
        isAlert: false,
        status:0,
        page:1
      }
    },

    created(){
      this.getList();
    },
    methods: {
      getList(){
        let params ={
          page:this.page,
          status:this.status
        }
        this.$api.activity.getProductPeriodsLog(params).then(res =>{
          if(res){
            if(res.data.data.list.length>0){
              this.list =res.data.data.list
            }
          }
        })
      },
      onItemClick(index) {
        console.log(index)
        this.status =index;
        this.getList();
      },

      //点击领取礼品页
      goGetproduct() {
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
            this.$router.push('/getProduct')
          }
        })
      },
      onShow() {

      }, onHide() {

      }
    }
  }
</script>

<style scoped>
  .dl {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0;
  }

  .dt img {
    width: 100px;
    height: 100px;
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
  }

  .btn_box {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
  }

  /*.btn_box button {*/
    /*width: 90px;*/
    /*height: 40px;*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*font-size: 14px;*/
    /*margin-right:10px;*/
  /*}*/
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
</style>
