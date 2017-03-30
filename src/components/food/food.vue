<template>
<transition  enter-active-class="fadeIn" leave-active-class="fadeOut">
<div class="food animated"  v-show="showflag"   ref="headerFood">
  <div class="food-content">
    <div class="headerfood">
        <div class="img-header">
          <img :src="food.image">
          <div class="iconimg" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="detaile-food">
          <h4 class="detailname">{{food.name}}</h4>
          <p class="detail_info"><span>月售{{food.sellCount}}份</span><span class="ratings">好评率{{food.rating}}%</span></p>
          <div class="price">
            <span class="now-price">￥{{food.price}}</span>
            <span class="old-price" v-show="food.oldPrice">{{food.oldPrice}}</span>
          </div>
          <div class="addTocart" @click="addgood($event)" v-show="!food.count || food.count===0">加入购物车</div>
          <div class="cartcontrol-wrapper" v-show="food.count>0">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
  </div>
    <div class="info"  v-show="food.info">
        <h3 class="info-title">商品介绍</h3>
        <div class="info-text">{{food.info}}</div>
      </div>
    <div class="info">
        <h3 class="info-title">商品评价</h3>
            <rating :selectedType="selectedType"  v-on:ratingtypeSelect="ratingtypeselect" v-on:toggleContent="togglecontent"  :onlyContent="onlyContent" :destype="destype" :rating="food.ratings"></rating>
        <ul>
          <li  v-show="needshow(item.rateType,item.text)" v-for="item in food.ratings">
            <div class="info-wrapper">
              <div class="user">
                <span>{{item.username}}</span>
                <img :src="item.avatar" width="16" height="16">
              </div>
              <div class="time">
                <span>{{item.rateTime | formatDate}}</span>
              </div>
            </div>
            <div class="text">
              <i  :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':selectedType===1}"></i>
              <span class="text-info">{{item.text}}</span>
            </div>
          </li>
        </ul>
      <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
      </div>
  </div>
</div>
</transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date';
  //调用js 花括号 是export function 这个里面可以写多个    //没有花括号是export default
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import rating from '../rating/rating.vue';
  const all = 2;
  const good = 0;
  const bad = 1;
  export default{
      props:{
        food:{
          type:Object
        }
      },
    data(){
      return{
        showflag:false,
        selectedType:all,
        onlyContent:false,
        destype:{
          all: `全部`,
          good: `推荐`,
          bad: `吐槽`
        }
      }
    },
    methods:{
    ratingtypeselect(type){
      this.selectedType = type;
      console.log("method-type: "+type)
/*      console.log("type: "+type);
      console.log("this.selectedType: "+this.selectedType);*/
      //这里不报错，但是也不显示
      this.$nextTick(() =>{
        this.scroll.refresh();
      })
    },
    togglecontent(onlyContent){
      this.onlyContent = onlyContent;
      console.log(this.onlyContent);
      console.log(onlyContent);
      this.$nextTick(() =>{
        this.scroll.refresh();
      })
    },
      show(){
        this.showflag=true;
        this.selectedType=all;
        this.onlyContent=false;//保持初始状态
          this.$nextTick(() =>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.headerFood,{
              click:true
            });
          }else{
            this.scroll.refresh();
          }
        })
      },//这个方法让goods调用，在goods里面加一个ref=''
      hide(){
        this.showflag=false
      },
      addgood(event){
        if(!event._constructed){
          return;//设置他的原生事件不触发
        }
       // this.$emit("caradd",event.target);
        Vue.set(this.food,'count',1);//如果不存在就先设置为1
      },
      needshow(type , text){
        //判断是否显示内容

          if(this.onlyContent && !text){
            //如果这个显示内容存在，并且text为空就不显示
            return false;
          }
        //判断选择类型
          if(this.selectedType === all){
            return true;
          }else{//如果相等则为true
             return type === this.selectedType;
            //这里一定要加return判断，不然不对直接就全是false了
          }
      }
    },

    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,"yyyy-MM-dd hh:mm");
        //完成格式的转换  可作为通用的模块使用
      }
    },
    components:{
      cartcontrol,
      rating
    }
  }
</script>

<style lang="less"  rel="stylesheet/less">
  .food{
    position:fixed;
    top:0;
    bottom:48px;
    left:0;
    width:100%;
    background: #f3f5f7;
    z-index:7;
    .headerfood{
      .img-header{
        position:relative;
        width:100%;
        height:0;
        padding-top:100%;/*保证width和height都为100%*/
        img{
          position:absolute;;
          width:100%;
          height:100%;
          top:0;
          left:0;
        }
        .iconimg{
          position:absolute;
          top:10px;
          left:0px;
          .icon-arrow_lift{
            display:block;
            width:20px;
            height:20px;
            font-size:20px;
            padding:10px;
            color:#fff;
          }
        }
      }
      .detaile-food{
        padding-left:18px;
        padding-top:18px;
        position:relative;
        border-bottom:1px solid rgba(7,17,27,0.1);
        background: #fff;
        .detailname{
          font-size:14px;
          color:rgb(7,17,27);
          line-height: 14px;
          font-weight:700;
          margin:0px 0 8px;
        }
        .detail_info{
          font-size:10px;
          color:rgb(147,153,159);
          line-height: 10px;
          margin-bottom:18px;
          .ratings{
            margin-left:12px;
          }
        }
        .price{
          margin-bottom:18px;
          .now-price{
            font-size:20px/28px;
            color:red;
            font-weight:normal/700;
            line-height: 24px;
          }
          .old-price{
            font-size:10px;
            color:rgb(147,153,159);
            font-weight:normal/700;
            line-height: 24px;
            text-decoration: line-through;
            margin-left:8px;
          }
        }
        .addTocart{
          position:absolute;
          border-radius: 12px;
          height:12px;
          line-height: 12px;
          font-size:10px;
          padding:6px 12px;
          color:#fff;
          bottom:18px;
          right:18px;
          z-index:10;
          background: rgb(0,160,220);
        }
        .cartcontrol-wrapper{
          position:absolute;
          bottom:18px;
          right:18px;
        }
      }

    }
    .info{
      padding:18px 8px 18px 18px;
      margin-top:16px;
      background: #fff;
      border-top:1px solid rgba(7,17,27,0.1);
      border-bottom:1px solid rgba(7,17,27,0.1);
      .info-title{
        font-weight: 700;
        font-size:14px;
      }
      .info-text{
        padding-left:8px;
        margin-top:6px;
        font-size:12px;
        font-weight:200;
        color:rgb(77,85,93);
        line-height: 24px;
      }
      .info-wrapper{
        font-size:12px;
        color:rgb(147,153,159);
        overflow: hidden;
        line-height: 12px;
        padding:16px 0 6px ;
        .time{
          float:left;
        }
        .user{
          float:right;
        }
      }
      .text{
        i{
          font-size:12px;
          line-height: 24px;
          &.icon-thumb_up{
            color:rgb(0,160,220);
          }
          &.icon-thumb_down{
            color:rgb(147,153,159);
          }
        }
        .text-info{
        font-size:12px;
        padding-left:4px;
        color:rgb(7,17,27);
        line-height: 16px;
        }
      }
      .no-rating{
        color:rgb(147,153,159);
        padding:16px 0;
        font-size:12px;
      }
    }

  }
</style>
