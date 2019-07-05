<template>
  <div class="agreement">
    <x-header :left-options="{backText: ''}">用户协议</x-header>
    <scroller lock-x ref="scroller" height="-48">
      <div class="box">
        <div v-html="info">

        </div>
      </div>
    </scroller>

  </div>
</template>

<script>
  export default {
    name: "agreement",
    data:function(){
      return {
        info:''
      }
    },
    created() {
      let params ={
        type:5
      }
      this.$api.activity.getArticlesList(params).then(res =>{
        if(res){
          this.info =res.data.data.list[0].post_content
        }
      })
    }
  }
</script>

<style scoped>
  .box{
    padding: 10px;
  }
</style>
