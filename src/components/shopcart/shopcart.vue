<template>
<div>
  <div class="shopcart">
    <div class="content" @click="togglelist">
      <div class="content-left">
        <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="des">另需配送费￥{{sendmoney}}元</div>
      </div>
      <!-- 阻止事件冒泡-->
      <div class="content-right" @click.stop.prevent="computmoney">
        <div class="pay" :class="payClass">
        {{Paydes}}
        </div>
      </div>
  <!--    <div class="ball-wrapper">
          <transition  name="drop" v-for="ball in balls" v-show="ball.show" class="ball"></transition>
          <div class="inner"></div>
      </div>-->
  </div>
  <transition  enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="alert-wrapper" v-show="listShow">
        <div class="top">
          <h3 class="title">购物车</h3>
          <span class="clear" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price*food.count}}</span>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
        </div>
      </div>
  </transition>
    </div>
  <div class="commalert" v-show="listShow" @click="hidelist"></div>
</div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default{
      props:{
        selectFoods:{
          type:Array,
          default(){
            return [
              {
                price:10,
                count:1
              }
            ]
          }
        },
        sendmoney:{
         type:Number,
          default:0//默认值
          },
        minprice:{
          type:Number,
          default:0
        }
      },
    data(){
      return{
        //折叠
        fold:true
      }
    },
    methods:{
      togglelist(){
        if(!this.totalCount){
          return;
        }//如果什么都没有点击没反应
        this.fold=!this.fold;
        console.log(0)
      },
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count=0;
        })
      },
      hidelist(){
        this.fold = true;
      },
      computmoney(){
        if(this.totalPrice<this.minprice){
          return;
        }
        window.alert(`去支付${this.totalPrice}`)
      }
  },
    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food)=> {
          total += food.price * food.count
        })
        return total;
      },
      totalCount(){
        let totalcount = 0;
        this.selectFoods.forEach((food)=> {
          totalcount += food.count
        });
        return totalcount;
      },
      Paydes(){
        if (this.totalPrice === 0) {
          return `￥${this.minprice}起送`
        }
        else if (this.totalPrice < this.minprice) {
          return `还差￥${this.minprice - this.totalPrice}起送`
        } else {
          return `去结算`
        }
      },
      payClass(){
        if (this.totalPrice < this.minprice) {
          return `no-enough`
        } else {
          return `enough`
        }
      },
      listShow(){
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if(show){
          this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.listContent,{
                //better-scroll默认是touch设置click要声明
                click:true
              });
              console.log(0)
            }else{
              this.scroll.refresh();
            }
          })
        }
        return show;
      }
    },
    components:{
      cartcontrol
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    .shopcart{
      position:fixed;
      bottom:0px;
      left:0;
      width:100%;
      z-index:150;
      height:48px;
      .content{
        font-size:0;
        display:flex;
        flex-direction: row;
        color:rgba(255,255,255,0.4);
        .content-left{
          flex:1;
          background: #141d27;
          padding-left:12px;
          padding-bottom:8px;
          color:rgba(255,255,255,0.4);
          .logo-wrapper{
            display:inline-block;
            position:relative;
            margin-top:-10px;
            width:50px;
            height:50px;
            background: #141d27;
            border-radius: 50%;
            .logo{
              position:absolute;
              top:6px;
              left:3px;
              width:44px;
              height:44px;
              background: rgba(255,255,255,0.2);
              border-radius: 50%;
              text-align: center;
              &.highlight{
                background: rgb(0,160,220);
              }
              .icon-shopping_cart{
                line-height:44px;
                font-size:24px;
                &.highlight{
                  color:#fff;
                }
              }
            }
            .num{
              position:absolute;
              top:0;
              right:0;
              height:16px;
              width:24px;
              line-height: 16px;
              font-size:9px;
              font-weight: 700;
              box-shadow:0 4px 8px 0 rgba(0,0,0,0.4) ;
              background: rgb(240,20,20);
              text-align: center;
              border-radius: 16px;;


            }
          }
          .price{
            display: inline-block;
            margin:12px 12px 12px 6px;
            padding-right:12px;
            vertical-align: top;
            line-height:24px;
            font-weight:700;
            font-size:16px;
            border-right:1px solid rgba(255,255,255,0.1);
            &.highlight{
              color:#fff;
            }
          }
          .des{
            display: inline-block;
            padding-right:12px;
            padding-top:12px;
            vertical-align: top;
            line-height:24px;
            font-weight:700;
            font-size:16px;
          }
        }
        .content-right{
          text-align: center;
          flex:0 0 105px;
          width:105px;
          .pay{
            height:48px;
            line-height: 48px;;
            font-weight:700;
            text-align: center;
            font-size:12px;
            &.no-enough{
              background: #2b333b;
            }
            &.enough{
              background: #00b43c;
              color:#fff;
            }
          }
        }
      }
    /*  .ball-wrapper{
        .ball{
          position:fixed;
          left:32px;
          bottom:22px;
          z-index:200;
          .inner{
            width:16px;
            height:16px;
            border-radius: 50%;
            background:rbg(0,160,220);
            transition:all 0.4s linear;
          }
        }
      }*/
      .alert-wrapper{
        position:absolute;
        width:100%;
        bottom:50px;left:0;
        background:#fff;
        z-index:-1;
        .top{
          overflow: hidden;
          width:100%;
          height:40px;
          padding:0 18px;
          box-sizing: border-box;
          background: #f3f5f7;
          border-bottom:1px solid rgba(7,17,27,0.1);
          .title{
            float:left;
            line-height:40px;
            font-size:14px;
            font-weight: 200;
            color:rgb(7,17,27);
          }
          .clear{
            float:right;
            line-height:40px;
            font-size:12px;
            color:rgb(0,160,220);
          }
        }
        .list-content{
          max-height:217px;
          overflow: hidden;
          ul{
            background: #fff;
            padding:0 4px;
            .food{
              position:relative;
              border-bottom:1px solid rgba(7,17,27,0.1);
              padding:12px;
              .name{
                font-size:14px;
                color:rgb(7,17,27) ;
                line-height: 24px;
              }
              .price{
                position:absolute;
                font-size:20/28px;
                color:rgb(240,20,20) ;
                font-weight: normal/700;
                line-height: 24px;
                right:90px;
                bottom:12px;
                margin-right:12px;
              }
              .cartcontrol-wrapper{
                position:absolute;
                right:18px;
                bottom:5px;
              }
            }
          }

        }
      }
    }
  .commalert{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background: rgba(7,17,27,0.6);
    filter:blur(10px);
    z-index:40;
  }
</style>
