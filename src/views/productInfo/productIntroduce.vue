<template>
  <div class="productIntroduce">
    <x-header :left-options="{backText: ''}">礼品简介</x-header>
    <scroller lock-x height="-48" ref="scroller">
      <div v-html="content" class="content"></div>
    </scroller>
  </div>
</template>

<script>
    export default {
        name: "productIntroduce",
      data:function(){
          return {
            content:''
          }
      },
      created() {
        let params= {
          id:this.$route.query.id
        }
        this.$api.activity.getProductInfo(params).then(res =>{
          if(res){
              this.content =res.data.data.content;
              setTimeout(res =>{
                this.$nextTick(() => {
                  this.$refs.scroller.reset()
                })
              },300)

          }
        })
        }
    }
</script>

<style scoped>
  /*.content{*/
    /*padding: 20px;*/
  /*}*/
  .content a{
    width: 100% !important;
  }
  .productIntroduce img{
    width: 100% !important;
  }
</style>
<style>
  .content img,.content table{
    max-width: 375px !important;
  }

</style>
