<template>
  <div class="productInfo">
    <x-header :left-options="{backText: ''}">参与详情</x-header>
        <div style="background:#fff;" class="box">
            <p>
                {{name}}
            </p>
            <p>我已参与{{pay_count}}人次</p>
        </div>
        
        <card>
            <div slot="content">
                <!--<cell-->
                    <!--title="参与详情"-->
                    <!--is-link-->
                    <!--:border-intent="false"-->
                    <!--:arrow-direction="showContent001 ? 'up' : 'down'"-->
                    <!--@click.native="showContent001 = !showContent001"></cell>-->


                <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                  <thead>
                  <tr style="background-color: #F7F7F7">
                      <th>参与时间</th>
                      <th>人次</th>
                      <th>编码</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr></tr>
                  </tbody>

                  <Collapse class="rightFixed0"
                            :Accordionindex="0"
                            :isSlotSecond="0"
                            :AccordionData="baseInformation"
                            :AccordionData2="baseInformation">
                    <div class="baseInformation"
                         slot="First">
                      <!-- 放入你要插入到内容 -->
                      123
                    </div>
                  </Collapse>
                  <!--<tbody>-->
                  <!--<tr>-->
                      <!--<td>Apple</td>-->
                      <!--<td>$1.25</td>-->
                      <!--<td> x 1</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                      <!--<td>Banana</td>-->
                      <!--<td>$1.20</td>-->
                      <!--<td> x 2</td>-->
                  <!--</tr>-->
                  <!--</tbody>-->
                </x-table>



            </div>   
        </card>  

        
 
</div>
    
</template>

<script>
  import Collapse from "@/components/Collapse";

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
      Collapse,
    },
    created(){
        let id =this.$route.query.id
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
</style>

