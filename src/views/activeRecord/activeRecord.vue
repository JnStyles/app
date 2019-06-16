<template>
  <div class="activeRecord">
    <x-header :left-options="{backText: ''}">活动记录</x-header>
    <tab v-model="status">
      <tab-item @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">进行中</tab-item>
      <tab-item @on-item-click="onItemClick">已抢到</tab-item>
      <tab-item @on-item-click="onItemClick">未领取</tab-item>
    </tab>
    <div class="timeline-demo">

      <timeline>
        <timeline-item v-for="(item,index) in list" :key ="index">
          <p class="time" v-if="item.month">{{item.month}}月{{item.day}}号</p>
          <template v-if="item.son && item.son.length>0">
            <panel style="margin:6px;" v-for="son in item.son" :key="son.id">
              <div slot="body">
                <div class="dl product">
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                      
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "11",
                        "month": "05",
                        "day": "31",
                        "month_day": "0531",
                        "status": 2
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                        "all_get_type": 0,
                        "get_type": 1,
                        "pay_count": "12",
                        "month": "05",
                        "day": "30",
                        "month_day": "0530",
                        "status": 3
                    },
                    {
                        "id": 11,
                        "name": "商品2",
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                        
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                        
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                        
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                        
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
                        "photo_urls": "http://39.105.173.183/upload/product/20190609/89578116288ab0076df05dd9cced8d0b.jpg",//照片
                        
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
            {}
        ],
        menuList: ['全部', '进行中', '已抢到', '未领取'],
        activeValue: '全部',
        isAlert: false,
        status:0,
        page:1,
        id:'',
        name:'',
        get_type:'',//领取方式
      }
    },

    created(){
      console.log(this.$route.query)
      if(this.$route.query.status){
        this.status =2
      }
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
              this.list.push({})
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

      }, onHide() {

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
</style>
<style>
  .activeRecord .weui-btn + .weui-btn{
      margin:0;
  }
</style>

