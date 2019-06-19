<template>
  <div>
    <msg title="购买成功" description="" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>


<script>
  import { Msg, Divider, XButton } from 'vux'

  export default {
    components: {
      Msg,
      Divider,
      XButton
    },
    methods: {
      changeIcon () {
        this.$router.go('-1');
      }
    },
    data () {
      return {
        description: 'msg description',
        icon: '',
        buttons: [{
          type: 'warn',
          text: '继续购买',
          onClick: this.changeIcon.bind(this)
        }, {
          type: 'default',
          text: '返回首页',
          link: '/'
        }]
      }
    }
  }
</script>
