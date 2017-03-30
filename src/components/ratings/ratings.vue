<template>
<div class='ratings-wrapper' ref="ratingsWrapper">
  <div class="ratings-content">
    <div class="ratings">
      <div class="rating-header">
            <div class="rating-hleft">
              <p class="score">3.9</p>
              <p class="avarage_score">综合评分</p>
              <p class="rating_cc">高于周边商家69.2%</p>
            </div>
            <div class="rating-hright">
                 <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <stars :size="36" :score="seller.serviceScore"></stars>
                    <span class="score">{{seller.serviceScore}}</span>
                 </div>
                <div class="score-wrapper">
                  <span class="title">商品评分</span>
                  <stars :size="36" :score="seller.foodScore"></stars>
                  <span class="score">{{seller.foodScore}}</span>
                </div>
                <div class="score-wrapper">
                  <span class="title">送达时间</span>
                  <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
         </div>
      <div class="info">
        <rating :selectedType="selectedType"  v-on:ratingtypeSelect="ratingtypeselect" v-on:toggleContent="togglecontent"  :onlyContent="onlyContent" :destype="destype" :rating="ratings"></rating>
      </div>
      <div class="ratinglist">
        <ul>
          <li class="rating-item" v-for="item in ratings"  v-show="needshow(item.rateType,item.text)">
              <div class="avatar">
                <img :src="item.avatar" class="avatarimg" width="28" height="28">
              </div>
              <div class="rating-info">
                  <div class="username">{{item.username}}</div>
                  <div class="user-send">
                    <stars :size="24" :score="item.score"></stars>
                    <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送到</span>
                  </div>
                  <div class="itemtext" v-show="item.text">{{item.text}}</div>
                  <div class="user-like">
                    <i  class="icon-thumb_up"></i>
                    <p  class="like" v-for="like in item.recommend"><span>{{like}}</span></p>
                  </div>
                  <div class="time">
                    <span>{{item.rateTime | formatDate}}</span>
                  </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date';
  import stars from '../../components/stars/stars.vue'
  import rating from '../../components/rating/rating.vue'
  import BScroll from 'better-scroll';
  const all = 2;
  const good = 0;
  const bad = 1;
  const ERR_OK = 0;
  export  default{
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        ratings:[],
        selectedType:all,
        onlyContent:true,
        destype:{
          all: `全部`,
          good: `推荐`,
          bad: `吐槽`
        }
      }
    },
    created(){
      //这里导入API 和引入组件进来的时候的rating里面的ratings相呼应 :rating="ratings">  rating后后面rating.vue中的相呼应，然后ratings和这个里面的值想呼应
        this.$http.get("/api/ratings").then(response => {
          response = response.body;//转化为json  https://github.com/pagekit/vue-resource/blob/develop/docs/api.md
          if (response.errno === ERR_OK) {
            this.ratings = response.data;
            this.$nextTick(() =>{
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.ratingsWrapper,{
                  click:true
                });
              }
            })
        }
      });
    },
   methods:{
      ratingtypeselect(type){
        this.selectedType = type;
        //这里不报错，但是也不显示
        this.$nextTick(() =>{
          this.scroll.refresh();
        })
      },
      togglecontent(onlyContent){
        this.onlyContent = onlyContent;
        this.$nextTick(() =>{
          this.scroll.refresh();
        })
      },
     needshow(type,text){
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
      stars,
      rating
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .ratings-wrapper {
    position: absolute;
    top: 178px;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: #f3f5f7;
    overflow: hidden;
    .rating-header {
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding: 18px 0;
      display: flex;
      background: #fff;
      .rating-hleft {
        left: 10px;
        flex: 0 0 137px;
        text-align: center;
        @media only screen and(max-width: 320px){
          flex: 0 0 120px;
          width:120px;
        }
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        .score {
          font-size: 24px;
          color: rgb(255, 153, 0);
          line-height: 28px;
        }
        .avarage_score {
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 12px;
          padding-top: 6px;
        }
        .rating_cc {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          padding: 8px 0 6px;
        }
      }
      .rating-hright {
        flex: 1;
        padding:6px 0 6px 24px;
        @media only screen and(max-width: 320px){
          padding:6px 0 6px 10px;
        }
        .score-wrapper{
          padding-bottom:8px;
          font-size:0;
          color:rgb(7,17,27);
          .title{
            display:inline-block;;
            line-height: 18px;
            font-size:12px;
            vertical-align: top;
          }
            .star36{
              display:inline-block;
              vertical-align: top;
              margin-left:12px;
              font-size:12px;
              @media only screen and(max-width: 320px){
                margin-left:6px;
              }
              .imgItem{
                margin-right:4px;
              }
            }
          .score{
            vertical-align: top;
            font-size:12px;
            color:rgb(255,153,0);
            line-height: 18px;
          }
          .deliveryTime{
            margin-left:12px;
            @media only screen and(max-width: 320px){
              margin-left:6px;
            }
            color:rgb(147,153,159);
            line-height: 18px;
            font-size:12px;
          }
        }

      }
    }
    .info{
      background: #fff;
      margin-top:20px;
      padding:0 18px;
    }
    .ratinglist{
      background: #fff;
      .rating-item{
        display: flex;
        padding:17px 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .avatar{
          flex:0 0 28px;
          width:28px;
          img{
            border-radius: 50%;
          }
        }
        .rating-info{
          position:relative;
          flex:1;
          padding-left:12px;
          .username{
            font-size:10px;
            color:rgb(7,17,27);
            line-height: 12px;
          }
          .user-send{
            font-size: 0;
            margin:4px 0 6px;
            .star24{
              display:inline-block;
              padding-right:6px;
              .imgItem{
                margin-right:4px;
              }
            }
            .deliveryTime{
              display: inline-block;
              font-size:10px;
              font-weight: 200;
              color:rgb(147,153,159);
              line-height: 12px;
            }
          }
          .user-like{
            font-size: 0;
            height:18px;
            overflow: hidden;
            .like{
                display: inline-block;
                vertical-align: top;
                font-size:9px;
                color:rgb(147,153,159);
              white-space:nowrap;
              line-height: 16px;
              padding:0 6px;
              margin-left:8px;
              overflow: hidden;
              text-overflow: ellipsis;
              border: 1px solid rgba(7, 17, 27, 0.1);
            }
            .icon-thumb_up{
              width:16px;
              height:16px;
              font-size:16px;
              vertical-align: top;
              color:rgb(0,160,220);
            }
          }
          .itemtext{
            padding:6px 0 8px;
            font-size:12px;
            color:rgb(7,17,27);
            line-height: 18px;
          }
          .time{
            position:absolute;
            top:0;
            right:0;
            font-size:10px;
            font-weight: 200;
            color:rgb(147,153,159);
            line-height: 12px;
          }
      }
      }
    }
  }
</style>
