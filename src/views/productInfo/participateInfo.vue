<template>
  <div class="productInfo">
    <x-header :left-options="{backText: ''}">参与详情</x-header>
    <!--<scroller lock-x height="-48" ref="scroller">-->
      <div>
        <div style="background:#fff;" class="box">
          <p>
            {{name}}
          </p>
          <p>我已参与{{pay_count}}人次</p>
        </div>
        <card>
          <div slot="content">


            <div style="width: 100%;" class="tab_head">
              <span style="width: 53%;padding-left: 20px;">参与时间</span>
              <span style="width: 10%;">人次</span>
              <span style="width: 20%;">活动编码</span>
            </div>


            <Collapse2 v-for="(item,index) in list" :key="index"
                       class="rightFixed0"
                       :Accordionindex="0"
                       :isSlotSecond="0"
                       :AccordionData="item.create_msectime"
                       :AccordionData2="item.pay_count"

            >
              <div class="baseInformation"
                   slot="First">
                <!-- 放入你要插入到内容 -->
                <span v-for="son in item.lucky_code_list">
                          {{son.lucky_code}}
                        </span>
              </div>
            </Collapse2>

          </div>
        </card>
      </div>
    <!--</scroller>-->

 
</div>
    
</template>

<script>
  import Collapse2 from "@/components/Collapse2";

  export default {
    data:function(){
      return {
        name:'',
        pay_count:'',
        list:[],
        showContent001:false,
        baseInformation:'基本资料'
      }
    },
    components: {
      Collapse2,
    },
    created(){
        let id =this.$route.query.id;
        this.$api.activity.getProductParticipationInfo({id:id}).then(res =>{
            if(res){
                this.name =res.data.data.name;
                this.pay_count =res.data.data.pay_count;
                this.list =res.data.data.list;
            }
        })
    },
    methods:{
      
    }
  }
</script>

<style scoped>
  .box{
      padding:10px;
  }
  .tab_head{
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #eee;
    line-height: 30px;
  }
  .tab_head span{
    display: inline-block;
    text-align: left;
    font-size: 14px;
    color: #666;
  }
  .baseInformation span{
      display: inline-block;
      width: 24%;
      text-align: center;
  }
</style>

