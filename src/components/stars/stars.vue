<template>
    <div class="stars" :class="starType">
        <span v-for="imgItem in imgItems" class="imgItem" :class="imgItem"></span>
    </div>
</template>
<script type="text/ecmascript-6">
  const len = 5;
  const class_on = 'on';
  const class_off = 'off';
  const class_half = 'half';
 export  default{
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },//这里通过设置star24 36等设置不同的图片尺寸
   computed:{
     starType(){
       return "star"+this.size
     },
     imgItems(){
       //结果
       let result = [];
       //获取的分数
       let score = Math.floor(this.score*2)/2;
       //半颗星
       let hasDecimal = score%1 !==0;
       //整颗星
       let interger = Math.floor(score);
       //第三个
       for(let i=0;i<interger;i++){
         result.push(class_on)//2
       }//第一个计算完
       if(hasDecimal){
         result.push(class_half)//.5
       }//第二个
       while(result.length<len){
         result.push(class_off)
       }
       return result;
     }
   }
 }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/css/mixin.less";
  .stars{
    font-size:0;
    .imgItem{
      display: inline-block;
      background-repeat: no-repeat;
      }
    &.star48{
      .imgItem{
        width:22px;
        height:22px;
        margin-right:22px;
        background-size: 20px 20px;
        &.on{
          .bg-image1('star48_on')
        }
        &.off{
          .bg-image1('star48_off')
        }
        &.half{
          .bg-image1('star48_half')
        }
      }
    }
    &.star36{
      .imgItem{
        width:15px;
        height:15px;
        font-size:12px;
        margin-right:16px;
        background-size: 14px 14px;
        &.on{
          .bg-image1('star36_on')
        }
        &.off{
          .bg-image1('star36_off')
        }
        &.half{
          .bg-image1('star36_half')
        }
      }
    }
    &.star24{
      .imgItem{
        width:10px;
        height:10px;
        margin-right:13px;
        background-size: 10px 10px;
        &.on{
          .bg-image1('star24_on')
        }
        &.off{
          .bg-image1('star24_off')
        }
        &.half{
          .bg-image1('star24_half')
        }
      }
    }
  }
</style>
