<template>
  <div class="calculation">
    <x-header :left-options="{backText: ''}">计算规则</x-header>
    <scroller lock-x height="-53">
      <div class="calculation_box">

      </div>
    </scroller>

  </div>
</template>

<script>
    export default {
        name: "calculationRules"
    }
</script>

<style scoped>
  .calculation_box{
    width: 100%;
    height: 1014px;
    background: url("../../assets/calculation.jpeg") no-repeat;
    background-size: 100% 100%;
  }
</style>
