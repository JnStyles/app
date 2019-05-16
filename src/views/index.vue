<template>
  <div>
    <x-header :left-options="{showBack: false}">do not show Back</x-header>
    <group>
      <cell title="title" value="value"></cell>
      <cell title="title" value="121233"></cell>
      <cell title="title" value="234"></cell>
      <cell title="title" value="345"></cell>
    </group>
    <tabbar></tabbar>
  </div>
</template>

<script>

  import { Group, Cell,XHeader} from 'vux'
  import tabbar from '../components/Tabbar'

  export default {
    data:function(){
      return {

      }
    },
    components: {
      Group,
      Cell,
      tabbar,
      XHeader
    }
  }
</script>

<style scoped>

</style>
