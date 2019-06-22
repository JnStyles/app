<template>
    <div class="no_data">
      <svg slot="icon" class="icon" aria-hidden="true" style="width: 130px;height: 130px;">
        <use xlink:href="#iconwushuju"></use>
      </svg>
      <p class="no_data_p">没有您要找的数据</p>
    </div>
</template>

<script>
    export default {
        name: "NoData"
    }
</script>

<style scoped>
  .no_data{
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .no_data_p{
    color: #666;
    padding-top: 10px;
  }
</style>
