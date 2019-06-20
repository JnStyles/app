<template>
  <div class="Accordion">
    <div class="AccordionTitle" @click="Shrink">
      <div class="AccordionTitleL LEFTTEXT"
           v-text="AccordionData"
           v-show="isSlotSecond != 2"></div>
      <div class="AccordionTitleL LEFTTEXT"
           v-show="isSlotSecond == 2">
        <slot name="Second"></slot>
      </div>

      <div v-if="AccordionData2" style="width: 50%;text-align: right;">
          啦啦啦
      </div>

      <div class="ClickArea">
        <div v-if="isshow==0" class="AccordionTitleR LEFTTEXT">
          <x-icon type="ios-arrow-up" size="16"></x-icon>
        </div>
        <div v-else class="AccordionTitleR LEFTTEXT">
          <x-icon type="ios-arrow-down" size="16"></x-icon>
        </div>
      </div>
    </div>
    <!-- Accordion Body -->
    <div class="AccordionBody"
         ref="AccordionBody">
      <div class="ContentA" v-if="isshow=='0'">
        <slot name="First"></slot>
        <p class="isshrink"></p>
      </div>
    </div>
  </div>
</template>
  <script>

export default {
  props: ["AccordionData", "Accordionindex", "isSlotSecond","AccordionData2"],
  data() {
    return {
      RightContent: "展开",
      isshow: 1,
      isShrink:true
    };
  },
  created(){
    console.log(this.Accordionindex)
  },
  methods: {
    Shrink() {
      let AllHiden = this.$refs.AccordionBody;
      console.log(AllHiden.childNodes[0].offsetHeight)
      let eleMoreHeight = AllHiden.childNodes[0].offsetHeight;
      // AllHiden.style.height = eleMoreHeight + "px";
      setTimeout(() => {
        if (this.isshow == 0) {
          this.isshow = 1;
          this.RightContent = "展开";
          this.isShrink = true;
        } else {
          this.isshow = 0;
          this.RightContent = "收缩";
          this.isShrink = false;
        }
      }, 1);
    }
  }
};
</script>
<style scoped>
.Accordion {
  width: 100%;
  height: auto;
}
.AccordionTitle {
  width: 100%;
  height: 40px;
  background: #fff;
  display: flex;
  border-bottom: 1px solid #eee;
}
/* 动画效果采用css3来实现 */
.AccordionBody {
  position: relative;
  height: auto;
  overflow: hidden;
  -webkit-transition: height 0.6s;
  -moz-transition: height 0.6s;
  -o-transition: height 0.6s;
  transition: height 0.6s;
  padding: 0 20px;
}
.AccordionTitleL {
  float: left;
  font-size: 14px;
}
.AccordionTitleR {
  float: right;
  font-size: 12px;
  color: #518bdc;
}
.LEFTTEXT {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}
.ClickArea {
  flex: 1;
  padding-right: 20px;
}
.isshrink{
  width: 100%;
  height: 20px;
}
.ContentA{
  padding-top: 10px;
}
/* 后期如果有修改样式的需求，直接在你的引用页面修改就好 */
</style>
