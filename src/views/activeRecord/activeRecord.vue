<template>
  <div class="activeRecord">
    <x-header :left-options="{backText: ''}">活动记录</x-header>
      <tab>
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">进行中</tab-item>
      <tab-item @on-item-click="onItemClick">已抢到</tab-item>
      <tab-item @on-item-click="onItemClick">未领取</tab-item>
    </tab>
   <div  class="timeline-demo">

    <timeline>
			<timeline-item>
                <p>4月11号</p>
				<panel style="margin:10px;border-radius:10px;">
                    <div slot="body">
                        <div class="dl">
                            <div class="dt">
                                <img src="../../assets/logo.png" alt="">
                            </div>
                            <div class="dd">
                                <p>中国石化200元加油卡哇哈哈哈哈哈哈</p>
                                <div class="dd_box"><p>我已参与 <span>5</span>人次</p> <badge text="已抢到"></badge> </div>
                            </div>
                        </div>
                        <div class="btn_box">
                             <x-button type="default" link="/getInfo" style="margin-right:10px;">领取详情</x-button>
                             <x-button type="default" link="/comments">晒单</x-button>
                        </div>
                    </div>
                </panel>

                <panel style="margin:10px;border-radius:10px;">
                    <div slot="body">
                        <div class="dl">
                            <div class="dt">
                                <img src="../../assets/logo.png" alt="">
                            </div>
                            <div class="dd">
                                <p>中国石化200元加油卡哇哈哈哈哈哈哈</p>
                                <div class="dd_box"><p>我已参与 <span>5</span>人次</p> <badge text="已抢到"></badge> </div>
                            </div>
                        </div>
                        <div class="btn_box">
                             <x-button type="default" @click.native="goGetproduct" style="margin-right:10px;">立即领取</x-button>
                             <x-button type="default" link="/comments">晒单</x-button>
                        </div>
                    </div>
                </panel>
			</timeline-item>
			<timeline-item>
                <p>4月11号</p>
				<panel style="margin:10px;border-radius:10px;">
                    <div slot="body">
                        <div class="dl">
                            <div class="dt">
                                <img src="../../assets/logo.png" alt="">
                            </div>
                            <div class="dd">
                                <p>中国石化200元加油卡哇哈哈哈哈哈哈</p>
                                <p>幸运编码：<span>213123</span>   </p>
                            </div>
                        </div>
                    </div>
                </panel>
			</timeline-item>
            <timeline-item>
				123
			</timeline-item>
		</timeline>
   </div>

    <!-- 二次确认弹框 -->
    <div v-transfer-dom>
      <confirm v-model="isAlert"
      show-input
      title="请输入登录密码"
      content="为保护您的账户安全"
      :input-attrs="{type: 'text'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      </confirm>
    </div>

  </div>
   
</template>

<script>


  export default {
    data:function(){
      return {
       menuList:['全部', '进行中', '已抢到', '未领取'],
        activeValue:'全部',
        isAlert:false
      }
    },
    methods:{
     onItemClick(){

     },

     //点击领取礼品页
     goGetproduct(){
         this.isAlert =true;
     },

     //点击取消按钮触发
     onCancel(){
         console.log('取消')
     },

     //点击确定按钮触发
     onConfirm(value){
         console.log('确定')
         console.log(value)
         if(value){
            this.$router.push('/getProduct') 
         }
     },
     onShow(){
         
     },onHide(){
         
     }
    }
  }
</script>

<style scoped>
  .dl{
    display:flex;
    padding:10px;
    border-bottom:1px solid #ccc;
    padding-bottom:0;
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
    align-items: center;
  }
  .btn_box{
      display:flex;
      justify-content:flex-end;
      padding:10px 0;
  }
  .btn_box button{
      width:90px;
      height:40px;
      margin:0;
      padding:0;
      font-size: 14px;
  }
</style>
<style>
.activeRecord .vux-timeline-item-checked.weui-icon-success-no-circle::before{
    font-size:0;
}
.activeRecord .vux-timeline-item-head-first{
    width:10px;
    height:10px;
    left:1px;
}
</style>
