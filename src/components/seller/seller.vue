<template>
<div class="seller-wrapper" ref="sellerWrapper">
  <div class="seller-content">
    <div class="seller-header">
        <h3 class="shop_name">{{seller.name}}</h3>
        <div class="rating-text">
          <stars :size="36" :score="seller.foodScore"></stars>
          <span class="ratingcount">({{seller.ratingCount}})</span>
          <span class="sellcount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="collection" @click="changecol">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <span class="col-text">{{favoritetext}}</span>
        </div>
         <ul class="send_info">
           <li>
             <p class="stitle">起送价</p>
             <p class="minPrice"><span class="price-size">{{seller.minPrice}}</span>元</p>
           </li>
           <li>
             <p class="stitle">商家配送</p>
             <p class="deliveryPrice"><span class="price-size">{{seller.deliveryPrice}}</span>元</p>
           </li>
           <li>
             <p class="stitle">平均配送时间</p>
             <p class="deliveryTime"><span class="price-size">{{seller.deliveryTime}}</span>元</p>
           </li>
         </ul>
    </div>
    <div class="hr"></div>
    <div class="seller-tip">
        <h4 class="tip-title">公告和活动</h4>
        <p class="tip-content">{{seller.bulletin}}</p>
    </div>
    <!-- 展示活动 -->
     <ul v-if="seller.supports" class="show_support">
      <li class="support-item" v-for="(item,val) in seller.supports">
        <span class="icon" :class="classMap[seller.supports[val].type]"></span>
        <span class="description">{{seller.supports[val].description}}</span>
      </li>
    </ul>
    <div class="hr"></div>
    <div class="seller-img">
      <div class="seller-img-conten">
        <h4 class="seller-imgtext">商家实景</h4>
        <div class="images" ref="images">
          <ul class="imglist" ref="imglist">
          <li  v-for="(img,index) in seller.pics"><img :src="img" alt=""></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="seller-other-info">
      <h4 class="seller-imgtext">商家信息</h4>
      <ul class="info-list">
        <li class="info-item"  v-for="info in seller.infos">{{info}}</li>
      </ul>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import stars from '../stars/stars.vue';
  const ERR_OK =0;
  import BScroll from 'better-scroll';

  export default{
    props:{
      //这里router 路由的时候将这个传过来了所以可以直接使用
      seller:{
        type:Object
      }
    },
    data(){
      return{
        favorite:false
      }
    },
    computed:{
      favoritetext(){
        return this.favorite?'已收藏':'未收藏'
      }
    },
    watch:{
      'seller'(){
        this._intpic();
        this._intcont();//这个和宣布渲染好像没关系
      }
    },
    created(){
      //这里是从api中取获取并且在这里实现滚动条自适应的情况
   /*   this.$http.get("/api/seller").then(response => {
        response = response.body;//转化为json  https://github.com/pagekit/vue-resource/blob/develop/docs/api.md
        if (response.errno === ERR_OK) {
          this.sellernewdata = response.data;
        }
      });*/
      this.classMap=['decrease','discount','special',"invoice",'guarantee'];
      this._intpic();//在created 里面执行好像和seller切换页面后会被重新刷新然后刚开始没渲染完然后scroll不能实现，所以设置在渲染完后执行这个方法
      this._intcont();
    },
    methods:{
      _intpic(){
        //this.seller.pics  直接放created里面undifind 所以这里要写到methods后，再调用
        if(this.seller.pics){
          let picwidth = 120;
          let marginRight = 6;
          let width = (picwidth+marginRight)*this.seller.pics.length;
          this.$refs.imglist.style.width=width+'px';
          this.$nextTick(() =>{
            if(!this.imscroll){
              this.imscroll = new BScroll(this.$refs.images,{
                scrollX:true,
                eventPassthrough:'vertical'
               // click:true
              });
            }
          });
        }
      },
      _intcont(){
        console.log(this.seller)
        this.$nextTick(() =>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.sellerWrapper,{
              click:true
            });
          }else{
            this.scroll.refresh();
          }
        });
      },
      changecol(){
        this.favorite = !this.favorite;
      }
    },
    components:{
      stars
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/css/mixin.less";
  .seller-wrapper{
    position:absolute;
    top:178px;
    left:0;
    width:100%;
    bottom:0;
    overflow: hidden;
    .seller-header{
      position:relative;
      padding:18px;
      background: #fff;
      border-bottom:1px solid rgba(7,17,27,0.1);
      .shop_name{
          font-size:14px;
          color:rgb(7,17,27);
          line-height: 14px;
          margin-bottom:8px;
        }
      .rating-text{
        .star36{
          display:inline-block;
          vertical-align: top;
          margin-right:8px;
          .imgItem{
            margin-right:8px;
          }
        }
        .ratingcount,.sellcount{
          display: inline-block;
          vertical-align: top;
          font-size:10px;
          color:rgb(77,85,93);
          line-height: 18px;
        }
        .ratingcount{
          margin-right:12px;
        }
      }
      .send_info{
        margin-top:18px;
        padding-top:18px;
        border-top:1px solid rgba(7,17,27,0.1);
        display:flex;
         li{
           flex:1;
           text-align: center;
           border-right:1px solid rgba(7,17,27,0.1);
           .stitle{
              font-size:10px;
              color:rgb(147,153,159);
              line-height: 10px;
              padding-bottom:4px;
           }
           .deliveryPrice,.minPrice,.deliveryTime{
             font-size:48px/20px;
             font-weight: 200;
             color:rgb(7,17,27);
             line-height: 24px;
             .price-size{
               font-size:18px;
             }
           }
         }
         li:last-child{
          border-right:none;
        }
      }
      .collection{
        position:absolute;
        top:14px;right:18px;
        font-size: 0;
         span{
           display: block;
           text-align: center;
           &.col-text{
             padding-top:4px;
             font-size:10px;
             color:rgb(77,85,93);
             line-height: 10px;
           }
           &.icon-favorite{
             font-size:24px;
             line-height: 24px;
           }
           &.active{
             color:rgb(240,20,20);
           }
         }
      }
    }
    .hr{
      background: #f3f5f7;
      height:18px;
      width:100%;
      border-bottom:1px solid rgba(7,17,27,0.1);
    }
    .seller-tip{
      padding:18px 18px 16px;
      .tip-title{
        font-size:14px;
      }
      .tip-content{
        font-size:12px;
        font-weight: 200;
        color:rgb(240,20,20);
        line-height: 24px;
        padding:8px 12px 0;
      }

    }
    .show_support{
      width:100%;
      padding:0 18px;
      box-sizing: border-box;
      border-bottom:1px solid rgba(7,17,27,0.1);
      margin:0 auto 28px;
      .support-item{
        padding:12px 16px;
        font-size:12px;
        border-top:1px solid rgba(7,17,27,0.1);
        .icon{
          display: inline-block;
          margin-right:6px;
          width:16px;height:16px;
          vertical-align: middle;
          background-repeat: no-repeat;
          background-size:100%;
          &.decrease{
            .bg-image4("decrease_4")
          }
          &.discount{
            .bg-image4("discount_4")
          }
          &.guarantee{
            .bg-image4("guarantee_4")
          }
          &.invoice{
            .bg-image4("invoice_4")
          }
          &.special{
            .bg-image4("special_4")
          }
        }
        .description{
          font-size:12px;
          font-weight:200;
          color:rgb(7,17,27);
          line-height: 16px;
        }
      }
    }
    .seller-img{
      padding:18px;
      font-size: 0;
      overflow: hidden;
      height:90px;
      .seller-imgtext{
        font-size:14px;
      }
      .images{
        margin-top:12px;
        overflow: hidden;
        .imglist{
          font-size:0;
          li{
            display:inline-block;
            vertical-align: top;
            width:120px;
            height:90px;
            margin-right:6px;
            img{
              width:100%;
              height:100%;
            }
          }
        }

      }

    }
    .seller-other-info{
      padding:18px;
      .seller-imgtext{
        font-size:14px;
        margin-bottom:12px;
      }
      .info-list{
        .info-item{
          padding:16px 12px;
          border-top:1px solid rgba(7,17,27,0.1);
          font-size:12px;
          font-weight: 200;
          color:rgb(7,17,27);
          line-height: 16px;
        }
      }
    }
  }
</style>
