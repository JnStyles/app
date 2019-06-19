<template>
  <div class="Accordion">
    <!-- Accordion Title -->
    <div class="AccordionTitle">
      <div class="AccordionTitleL LEFTTEXT"
           v-text="AccordionData"
           v-show="isSlotSecond != 2"></div>
      <div class="AccordionTitleL LEFTTEXT"
           v-show="isSlotSecond == 2">
        <slot name="Second"></slot>
      </div>
      <div class="ClickArea"
           @click="Shrink">
        <div class="AccordionTitleR LEFTTEXT"
             v-text="RightContent"></div>
      </div>
    </div>
    <!-- Accordion Body -->
    <div class="AccordionBody"
         ref="AccordionBody">
      <!-- 接受slot的容器 -->   
      <!-- 这里我才用slot的方法把手风琴内的内容插件里，以方便控制，达到灵活的效果 -->
      <div class="ContentA" >
        <slot name="First"></slot>
        <p class="isshrink" v-show="isShrink"></p>
      </div>
    </div>
  </div>
</template>
  <script>
/**
 * Accordionindex   控制某一个展开收缩
 * AccordionData    左上角标题的文字
 * isSlotSecond     决定显示那个插槽 first or second
 * 这样的好处可以实现多个共存
 */
export default {
  props: ["AccordionData", "Accordionindex", "isSlotSecond"],
  data() {
    return {
      RightContent: "收缩",
      isshow: this.Accordionindex,
      isShrink:false
    };
  },
  methods: {
    Shrink() {
      let AllHiden = this.$refs.AccordionBody;
      let eleMoreHeight = AllHiden.childNodes[0].offsetHeight;
      AllHiden.style.height = eleMoreHeight + "px";
      setTimeout(() => {
        if (this.isshow == 0) {
          AllHiden.style.height = "0px";
          this.isshow = 1;
          this.RightContent = "展开";
          this.isShrink = false;
        } else {
          AllHiden.style.height = eleMoreHeight + "px";
          this.isshow = 0;
          this.RightContent = "收缩";
          this.isShrink = true;
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
  height: 50px;
  background: #e4eaec;
  padding: 0px 20px 0px 20px;
  display: flex;
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
}
.AccordionTitleL {
  float: left;
  font-size: 14px;
  background: #e4eaec;
}
.AccordionTitleR {
  float: right;
  font-size: 12px;
  color: #518bdc;
}
.LEFTTEXT {
  height: 50px;
  line-height: 50px;
}
.ClickArea {
  flex: 1;
}
.isshrink{
  width: 100%;
  height: 20px;

}
/* 后期如果有修改样式的需求，直接在你的引用页面修改就好 */
</style>