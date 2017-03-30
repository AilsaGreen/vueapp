<template>
  <div class="rating">
      <div class="selectedrating">
        <span class="all good" @click="select(2,$event)" :class="{'active':selectedType===2}">{{destype.all}}
          <span>{{rating.length}}</span>
        </span>
        <span class="good" @click="select(0,$event)" :class="{'active':selectedType===0}">{{destype.good}}
           <span>{{computgood.length}}</span>
        </span>
        <span class="bad" @click="select(1,$event)" :class="{'active':selectedType===1}">{{destype.bad}}
            <span>{{computBad.length}}</span>
        </span>
      </div>
    <div class="switch" @click='togglecontent($event)' :class="{'on':onlyContent}">
      <i class="icon-check_circle"></i>
      <span class="text">只看有评价的内容</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const all = 2;
  const good = 0;
  const bad = 1;
  export  default{
    props: {
      rating: {
        type: Array,
        default(){
          return [];
        }
      },
      selectedType: {
        type: Number,
        default: all
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      destype: {
        type: Object,
        defalut(){
          return {
            all: `全部`,
            good: `满意`,
            bad: `不满意`
          }
        }
      }
    },
    data(){
      return{
        selecttype:this.selectedType,
        onlycontent:this.onlyContent
        //这里一定要写这个不然报错， 子集向父级传东西的时候1、用创建点击事件等在里面$emit传值和绑定的值名 同时props里面定义的值不能直接更改，要在data里面再创建一个中间值等于props里面的值 ---2、父级@值名='方法' 将子集的值传给父级定义的值
      }
    },
  computed:{
    computgood(){
      return this.rating.filter((rating)=>{
        return rating.rateType === 0;
      })
    },
    computBad(){
      return this.rating.filter((rating)=>{
        return rating.rateType === 1
      })
    }
  },
    methods:{
      select(type,event){
        //这里通过传过来的type值和设置的值对比看是否相等来判断
        if(!event._constructed){
          return;//设置他的原生事件不触发
        }
        this.selecttype = type;
        this.$emit("ratingtypeSelect",type);
        //监听这个事件相当于将子集的值发给父级  ??? 这里找找ratingtype是个什么鬼
      },
      togglecontent(event){
        if(!event._constructed){
          return;//设置他的原生事件不触发
        }
        this.onlycontent = !this.onlycontent;
        this.$emit("toggleContent",this.onlycontent);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .selectedrating {
    font-size: 0;
    padding: 18px 0;
    .all, .good, .bad {
      display: inline-block;
      margin-right: 8px;
      padding: 8px 12px;
      border-radius: 2px;
      font-size: 24px/16px;
      color: rgb(77, 85, 93);
      line-height: 16px;
      &.good {
        /*这里有点不清楚，good是all和good的情况 默认type=0所以第一个是深蓝，后面通过type算selectedtype*/
        background: rgba(0, 160, 220, 0.2);
        &.active {
          background: rgb(0, 160, 220);
          color:#fff;
        }
      }
      &.bad {
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: rgb(77, 85, 93);
          color:#fff;
        }
      }
    }
  }
  .switch{
    font-size:0;
    color:rgb(147,153,159);
    padding:12px 0px;
    line-height: 24px;
    border-bottom:1px solid rgba(7,17,27,0.2);
    &.on{
      .icon-check_circle{color:#00c850;}
    }
    .icon-check_circle{
      display:inline-block;
      font-size:24px;
      vertical-align: top;
      line-height: 24px;
      padding-right:4px;
    }
    .text{
      display:inline-block;
      font-size:12px;
      vertical-align: top;
      line-height: 24px;
    }
  }
</style>
