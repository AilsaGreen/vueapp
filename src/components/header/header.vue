<template>
  <div class="header">
    <div class="content-wrapper">
        <div class="avatar">
          <img  width='64' height="64" :src="seller.avatar"/>
        </div>
        <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="discription">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
           <span class="count">{{seller.supports.length}}个</span>
           <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper"  @click="showDetail">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
         <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
           <div class="star-wrapper">
             <Stars :score="seller.score" :size="48"></Stars>
           </div>
           <div class="title">
             <div class="line"></div>
             <div class="text">优惠信息</div>
             <div class="line"></div>
           </div>
            <ul v-if="seller.supports" class="show_support">
                <li class="support-item" v-for="(item,val) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[val].type]"></span>
                  <span class="description">{{seller.supports[val].description}}</span>
                </li>
            </ul>
           <div class="title">
             <div class="line"></div>
             <div class="text">商家公告</div>
             <div class="line"></div>
           </div>
           <div class="info">{{seller.bulletin}}</div>
         </div>
      </div>
      <div class="detail-close" @click="showbox">
        <i class="icon-close"></i>
      </div>
    </div>
 <!--   <div class="cart-wrapper">
      <div class="cart">

      </div>
    </div>
    <div class="footer-wrapper">
      <div class="footer">
        <ul class="footer-list">
          <li>
            <img class="cart-bg" src="" alt="">
            <span class="cart-number">99</span>
            <p>￥40</p>
          </li>
          <li>另需配送费4元</li>
          <li>还差10元起送</li>
        </ul>
      </div>
    </div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import Stars from "../stars/stars.vue";
    export default{
      props:{//对象的形式
       seller:{
        type:Object
        }
      },
      data(){
        return{
          detailShow:false
        }
      },
      methods:{
        showDetail(){
          this.detailShow = !this.detailShow;
        },
        showbox(){
          this.detailShow = false;
        }
      },
      created(){
        this.classMap=['decrease','discount','special',"invoice",'guarantee']
      },
      components:{
        Stars
      }
    };
</script>

<style  lang="less" scoped rel="stylesheet/less">
@import "../../common/css/mixin.less";
  .header{
    background: rgba(7,17,27,0.5);
    color:#fff;
    position:relative;
    .content-wrapper{padding:24px 12px 18px 24px;display: flex;flex-direction: row;position:relative;
      .avatar{
        display:inline-block;
        img{border-radius: 2px;}
      }
      .content{margin-left:16px;font-size:14px;
        .title{margin:2px 0px 8px 0;
          .brand{display: inline-block;vertical-align:top;width:30px;height:18px;.bg-image('brand');background-size:30px 18px;background-repeat: no-repeat;}
          .name{line-height: 18px;font-weight: bold;margin-right:6px;}
        }
        .discription{line-height:12px;margin-bottom:10px;}
        .support{
          .icon{
            display: inline-block;
            width:12px;height:12px;
            margin-right:4px;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size:100%;
            &.decrease{
              .bg-image("decrease_1")
            }
            &.discount{
              .bg-image("discount_1")
            }
            &.guarantee{
              .bg-image("guarantee_1")
            }
            &.invoice{
              .bg-image("invoice_1")
            }
            &.special{
              .bg-image("special_1")
            }
          }
          .text{
            font-size:10px;
            line-height: 12px;
          }
        }
      }
      .support-count{
        position:absolute;
        bottom:18px;right:12px;
        padding:7px 8px;
        background: rgba(0,0,0,.2);
        border-radius: 14px;
        .count{
          font-size:10px;
          line-height: 12px;
        }
      }
    }
    .bulletin-wrapper{
      height:28px;
      line-height: 28px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size:10px;
      padding:0 22px 0 12px;
      background: rgba(7,17,27,0.2);
      position:relative;
      .bulletin-title{
        display: inline-block;
        width:22px;
        height:12px;
        border-radius: 2px;
        .bg-image('bulletin');
        background-repeat: no-repeat;
        background-size: 100%;
        vertical-align: middle;

      }
      .bulletin-text{
        font-size:10px;
        margin:0 4px;
      }
      .icon-keyboard_arrow_right{
        position:absolute;
        right:12px;
        bottom:8px;
      }
    }
    .background{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:-1;
      filter:blur(10px);
      overflow: hidden;
    }
    .detail{
      width:100%;
      height:100%;
      position:fixed;
      top:0;
      left:0;
      z-index:100;
      background: rgba(7,17,27,.8);
      overflow:auto;
      .detail-wrapper{
        min-height:100%;
        width:100%;
        .detail-main{
          margin-top:64px;
          padding:0 36px 64px;
          .name{
            font-size:16px;
            font-weight:700;
            line-height: 16px;
            text-align: center;
          }
          .star-wrapper{
            padding:16px 0 10px;
            height:24px;
            text-align: center;
          }
          .title{
            width:80%;
            display:flex;
            margin:0 auto 24px auto;
            flex-direction: row;
            .line{
              display:inline-block;
              flex:1;
              position:relative;
              top:-16px;
              border-bottom:1px solid rgba(255,255,255,.2)
            }
            .text{
              padding:12px;
              font-size:14px;
              font-weight:700;
            }
          }
          .show_support{
            width:80%;
            margin:0 auto 28px;
            .support-item{
              margin-bottom:12px;
              font-size:12px;
              .icon{
                display: inline-block;
                margin-right:6px;
                width:16px;height:16px;
                vertical-align: middle;
                background-repeat: no-repeat;
                background-size:100%;
                &.decrease{
                  .bg-image("decrease_2")
                }
                &.discount{
                  .bg-image("discount_2")
                }
                &.guarantee{
                  .bg-image("guarantee_2")
                }
                &.invoice{
                  .bg-image("invoice_2")
                }
                &.special{
                  .bg-image("special_2")
                }
              }
            }
          }
          .info{
            width:80%;
            margin:0 auto;
            line-height: 2;
            margin-top:24px;
            font-size:12px;
          }
        }
      }
      .detail-close{
        width:32px;
        height:32px;
        position:relative;
        margin:-64px auto 0 auto;
        font-size:32px;
        clear:both;
      }
    }
    /*.cart-wrapper{
      width:100%;
      height:100%;
      position:fixed;
      top:0;
      left:0;
      z-index:100;
      background: rgba(7,17,27,.6);
      filter:blur(10px);
      .cart{

      }
    }
    .footer-wraper{
      .footer{
        .footer-list{
          display:flex;
          .footer-list li{
            flex:1;
            .cart-bg{
            position:absolute;
            width:100px;
            height:100px;
            border-radius: 50%;
            border:8px solid #666;
            bottom:10px;
            left:30px;
          }
          }

        }

      }
    }*/
  }
</style>
