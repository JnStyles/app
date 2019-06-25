<template>
  <div class="calculate">
    <x-header :left-options="{backText: ''}">计算详情</x-header>
        <div class="box1">
          <h3 class="red">幸运编码</h3>
          <p> = <span class="span1">数值 <span class="span_a">A</span> </span> % <span class="span2">礼品所需人数</span> 取余 +10000001</p>
          <p> = {{info && info.create_time_string_sum}} % {{info && info.price}}  +10000001</p>
          <p> = {{info && info.lucky_code}} </p>
        </div>

        <div class="box2">
          <h3 class="red">数值 <span class="span_a">A</span> </h3>
          <p>= 最后一个活动编码分配完毕时间点前本站全部礼品的最后50个参与时间之和（包含本礼品最后一人次的参与时间）</p>
        </div>

        <div>
          <p class="data_p">当前期结束前本站全部礼品的最后50个参与时间</p>

          <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
            <tr>
              <th>序号</th>
              <th>参与时间</th>
              <th>用户名</th>
            </tr>
            </thead>
            <tbody v-if="info && info.orderlist && info.orderlist.length>0">
            <tr v-for="(item,index) in info.orderlist" :key="index">
              <td>{{index}}</td>
              <td>{{item.create_msectime}} <span class="red">({{item.create_time_string}})</span></td>
              <td> {{item.user_nickname}}</td>
            </tr>
            </tbody>
          </x-table>
        </div>
  </div>
</template>

<script>
    export default {
        name: "calculate",
        data:function(){
            return {
              info:null,
            }
        },
        created() {
          let id =this.$route.query.id;
          let params ={id:id};
            this.$api.activity.getCalculateInfo(params).then(res =>{
              if(res){
                this.info =res.data.data
              }
            })
        },
    }
</script>

<style scoped>
  .box1{
    background: #fff;
    margin-bottom: 10px;
    padding-left: 20px;
    padding-top: 20px;
    color: #666;
  }
  .box1 h3{
    padding: 6px 0;
    font-size: 20px;
  }
  .box1 .span1{
    padding: 4px 4px;
    border: 1px solid #E64340;
    border-radius: 5px;
    color: #E64340;
  }
  .box1 .span2{
    padding: 4px 4px;
    border: 1px solid #4b8bf4;
    border-radius: 5px;
    color: #4b8bf4;
  }
  .box1 p,.box2 p{
    padding: 6px 0;
  }

  .box2{
    background: #fff;
    margin-bottom: 10px;
    color: #666;
    padding-left: 20px;
    padding-top: 20px;
  }
  .data_p{
    background: #fff;
    border-bottom: 1px solid #eee;
    line-height: 30px;
    text-align: center;
  }
  .span_a{
    display: inline-block;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    background: #E64340;
    color: #fff;
    border-radius: 50%;
  }
</style>
