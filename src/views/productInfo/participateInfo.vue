<template>
  <div class="productInfo">
    <x-header :left-options="{backText: ''}">参与详情</x-header>
        <div style="background:#fff;" class="box">
            <p>
                [第2期]移动联通快乐健康了
            </p>
            <p>我已参与9人次</p>
        </div>
        
        <card>
            <div slot="content">
                <!-- <cell
                    title="参与详情"
                    is-link
                    :border-intent="false"
                    :arrow-direction="showContent001 ? 'up' : 'down'"
                    @click.native="showContent001 = !showContent001"></cell>

                <div class="slide" :class="showContent001?'animate':''">
                  <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>参与时间</th>
                        <th>人次</th>
                        <th>编码</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Apple</td>
                        <td>$1.25</td>
                        <td> x 1</td>
                    </tr>
                    <tr>
                        <td>Banana</td>
                        <td>$1.20</td>
                        <td> x 2</td>
                    </tr>
                    </tbody>
                </x-table>
 
                </div> -->

                <Collapse class="rightFixed0"
                 :Accordionindex="0"
                 :isSlotSecond="0"
                 :AccordionData="baseInformation">
                  <div class="baseInformation"
                      slot="First">
                      <!-- 放入你要插入到内容 -->
                   123
                  </div>
                </Collapse>
            </div>   
        </card>  

        
 
</div>
    
</template>

<script>
  // import Accordion from "@/components/Collapse";
  import Collapse from "@/components/Collapse";


  export default {
    data:function(){
      return {
        list:[],
        showContent001:false,
        baseInformation:'基本资料'
      }
    },
    components: {
      Collapse,
    },
    created(){
        let id =this.$route.query.id
        this.$api.activity.getProductParticipationInfo({id:id}).then(res =>{
            if(res){
              
            }
        })
    },
    methods:{
      
    }
  }
</script>

<style scoped>
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
  .box{
      padding:10px;
  }
</style>

