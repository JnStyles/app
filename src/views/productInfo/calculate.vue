<template>
  <div class="calculate">
    <x-header :left-options="{backText: ''}">计算详情</x-header>

    <div class="box1">
        <h3>幸运编码</h3>
        <p> = <span>数值A</span> % <span>礼品所需人数</span>  +10000001</p>
        <p> = 123123 % 123123123  +10000001</p>
        <p> = 1000986 </p>
    </div>

    <div class="box2">
        <p>数值A</p>
        <p>= 最后一个活动编码分配完毕时间点前本站全部礼品的最后50个参与时间之和（包含本礼品最后一人次的参与时间）</p>
        <p>当前期结束前本站全部礼品的最后59个参与时间</p>
    </div>

    <div>
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "calculate",
        data:function(){
            return {

            }
        },
        created() {
          let id =this.$route.query.id;
          let params ={id:id};
            this.$api.activity.getCalculateInfo(params).then(res =>{
              if(res){

              }
            })
        },
    }
</script>

<style scoped>
  .box1{
    background: #fff;
    margin-bottom: 10px;
  }
  .box2{
    background: #fff;
    margin-bottom: 10px;
  }
</style>
