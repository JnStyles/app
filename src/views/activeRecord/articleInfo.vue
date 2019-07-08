<template>
  <div class="comments">
    <x-header :left-options="{backText: ''}">文章详情</x-header>
    <div class="top_box">
      <h3>{{post_title}}</h3>
      <div v-html="post_content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "articleInfo",
    data:function () {
        return {
          post_title:'',
          post_content:''
        }
    },
    created() {
      let id;
      id =this.$route.query.id;
      console.log(id)
      this.$api.activity.getPortalInfo({id:id}).then(res =>{
        if(res){
          this.post_title =res.data.data.post_title
          this.post_content =res.data.data.post_content
        }
      })
    }
  }
</script>

<style scoped>
  .top_box{
    text-align: center;
    padding: 10px;
  }
  .top_box h3{
    padding: 20px 0;
  }
  .top_box img{
    max-width: 100% !important;
  }
</style>
