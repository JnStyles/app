<template>
  <div class="activeRules">
    <x-header :left-options="{backText: ''}">礼品简介</x-header>
    <div v-html="content" class="content">

    </div>
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
              this.content =res.data.data.content
          }
        })
        }
    }
</script>

<style scoped>
  .content{
    padding: 20px;
  }
</style>
