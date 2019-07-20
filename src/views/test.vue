<template>
  <div>
    <div v-for="src in list">
      <span style="font-size:20px;">Loading</span>
      <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
    </div>
  </div>
</template>

<script>
  import { XImg } from 'vux'
  export default {
    components: {
      XImg
    },
    methods: {
      success (src, ele) {
        console.log('success load', src)
        const span = ele.parentNode.querySelector('span')
        ele.parentNode.removeChild(span)
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
        const span = ele.parentNode.querySelector('span')
        span.innerText = 'load error'
      }
    },
    data () {
      return {
        list: [
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
          'https://api.6bo.pw/upload/product/20190708/4e5655b99f5f4745d68defbd2f1201f4.png',
        ]
      }
    }
  }
</script>

<style>
  .ximg-demo {
    width: 100%;
    height: auto;
  }
  .ximg-error {
    background-color: yellow;
  }
  .ximg-error:after {
    content: '加载失败';
    color: red;
  }
</style>
