<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="decreasecount">
      <transition  enter-active-class="zoomInRight" leave-active-class="zoomInLeft">
        <span class="inner animated icon-remove_circle_outline"></span>
      </transition>
    </div>
    <transition  enter-active-class="fadeIn" leave-active-class="fadeOut">
        <span class="animated cart-count" v-show="food.count>0">{{food.count}}</span>
    </transition>
    <div class="cart-add icon-add_circle" @click="addcount($event)">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
    export  default{
      props:{
        food:{
          type:Object
        }
      },
      methods:{
        addcount(event){
          if(!event._constructed){
            return
          }
          console.log(this.food.count)
          if(!this.food.count){
           /* this.food.count=1 //直接这样没效果要引入vue?*/
            Vue.set(this.food,'count',1)//这样才能有效果
          }else{
            this.food.count++
          }
          /*this.$emit("cart-add",event.target)小球的情况，这里需要深入考虑啊*/
        },
        decreasecount(event){
          if(!event._constructed){
            return
          }
          if(this.food.count){
            this.food.count--
          }
        }
      }
    }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .cartcontrol{
    display:flex;
    padding:6px;
    .cart-decrease{
      flex:1;
      .inner{
        height:24px;
        line-height:24px;
        color:rgb(0,160,220);
      }
    }
    .cart-count{
      vertical-align: middle;
      height:20px;
      line-height:24px;
      flex:0 0 24px;
      width:24px;
      color:rgb(147,153,159);
      text-align: center;
    }
    .cart-add{
      flex:1;
      height:24px;
      line-height:24px;
      color:rgb(0,160,220);
    }


  }
</style>
