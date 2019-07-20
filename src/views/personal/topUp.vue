<template>
  <div class="agreement">
    <x-header :left-options="{backText: ''}">充值</x-header>
    <div class="top_box2">
        <h3>{{post_title}}</h3>
        <div v-html="info">
        </div>
      </div>
  </div>

</template>

<script>
  export default {
    name: "topUp",
    data:function(){
      return {
        info:'',
        post_title:''
      }
    },
    created() {
      this.$api.activity.getPayPortalInfo({}).then(res =>{
        if(res){
          this.info =res.data.data.post_content
          this.post_title =res.data.data.post_title
        }
      })
    }
  }
</script>

<style scoped>
  .top_box2{
    text-align: center;
    padding: 20px;
  }
  .top_box2 h3{
    padding: 20px 0;
  }
</style>
