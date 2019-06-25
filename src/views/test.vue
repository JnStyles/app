<template>
  <div>
    <div v-for="(i,index) in mydata" :key="index">{{countDownList[index].day}}天{{countDownList[index].hou}}时{{countDownList[index].min}}分{{countDownList[index].sec}}秒{{countDownList[index].ms}}毫秒</div>

  </div>

</template>

<script>
  // import { Tab, TabItem, Sticky } from 'vux'
  export default {

    data: function () {
      return {
        mydata: [{
          actEndTime: '2019-06-26 18:50:00'
        }, {
            actEndTime: '2018-11-20 01:00:00'
          }, {
            actEndTime: '2018-12-20 02:00:00'
          }],
          actEndTimeList: [],
            countDownList: []
        };
    },
    created () {
      this.dataName();
    },
    methods: {

      dataName() {
        let endTimeList = [];
        // 将活动的结束时间参数提成一个单独的数组，方便操作
        this.mydata.forEach(o => {
          endTimeList.push(o.actEndTime);
        });
        this.actEndTimeList = endTimeList;
        this.countDown();
      },

      timeFormat(param) {

        return param < 10 ? '0' + param : param;
      },

      countDown(it) {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTimeList = this.actEndTimeList;
        let countDownArr = [];
        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
          let endTime = new Date(o).getTime();
          let obj = null;
          // 如果活动未结束，对时间进行处理
          if (endTime - newTime > 0) {
            let time = (endTime - newTime)/1000;  //毫秒
            // console.log(time)
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);

            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

            let ms = parseInt(time *1000 % 1000);

            // let day = parseInt(time / 1000 / 60 / 60 / 24);
            // let hou = parseInt(time / 1000 / 60 / 60 % 24);
            //
            // let min = parseInt(time / 1000 / 60 % 60);
            // let sec = parseInt(time / 1000 % 60);
            //
            // let ms = parseInt(time % 1000);

            // console.log(ms)
            obj = {
              day: this.timeFormat(day),
              hou: this.timeFormat(hou),
              min: this.timeFormat(min),
              sec: this.timeFormat(sec),
              ms: this.timeFormat(ms)
            };
          } else { // 活动已结束，全部设置为‘00‘
            obj = {
              day: '00',
              hou: '00',
              min: '00',
              sec: '00',
              ms: '00'
          };
          }
          countDownArr.push(obj);
        });
        this.countDownList = countDownArr;
        setTimeout(this.countDown, 100);
      }

    }
  }
</script>
<style scoped>
  .space-btn {
    padding: 5px 0;
    margin: 10px;
    text-align: center;
    border: 1px red solid;
  }
  .space {
    padding: 30px 0;
    margin: 10px;
    text-align: center;
    border: 1px green solid;
  }
</style>
