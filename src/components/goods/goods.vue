<template>
<div class="goods-wrapper">
  <div class="menu-wrapper" ref="menuWrapper">
    <!-- ref="menuWrapper" 这里要和下面写得一样，下面必须是驼峰，这里也必须是？-->
      <ul class="menu-list">
        <!-- 这里的$event的$一定要写，不然报错找不到下面的方法 -->
        <li class="menu-item"  :class="{'current':currentIndex === index}" v-for="(item,index) in goods" @click="selectMenu(index,$event)">
          <span class="name">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}</span>
        </li>
      </ul>
  </div>
  <div class="content-wrapper" ref="contentWrapper">
    <div class="content-list">
      <!-- class后面加个hook便于jq使用？-->
      <div class="contentitem contentitemhook" v-for="(detail,index) in goods">
          <h3 class="foodname">{{detail.name}}</h3>
        <div class="foodsdetail" v-for="food in detail.foods">
             <div class="icon"   @click="showfood(food,$event)">
               <img width="57" height="57"  :src="food.icon">
             </div>
              <div class="detaile-food">
                <h4 class="detailname">{{food.name}}</h4>
                <p class="detaildes">{{food.description}}</p>
                <p class="detail_info"><span>月售{{food.sellCount}}份</span><span class="ratings">好评率{{food.rating}}%</span></p>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span>
                  <span class="old-price" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
  <!--sendmoney，minprice， selectFoods 传给shopcart的数据     -->
  <shopcart :selectFoods="selectFoods"  :sendmoney="seller.deliveryPrice" :minprice="seller.minPrice"></shopcart>
  <food :food="selectedFoods" ref="food"></food>
</div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';
  const ERR_OK = 0;
  export default{
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        goods:[],
        comHeight:[],
        scrollY:0,
        selectedFoods:{}//这里要设置空对象针对点击商品显示详情
      }
    },
    components:{
      shopcart,
      cartcontrol,
      food
    },
    computed:{
      //获取点击的index
      currentIndex(){
        for(let i=0;i<this.comHeight.length;i++){
          let height1 = this.comHeight[i];
          let height2 = this.comHeight[i+1];
          if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods =[];
        this.goods.forEach((good) =>{
          good.foods.forEach((food) =>{
            //这里和上面的food相对应 插件cartcontrol
            if(food.count){
              foods.push(food)
            }
          });
        });
        return foods;
      }
    },
    created(){
      this.classMap=['decrease','discount','special',"invoice",'guarantee'];
      this.$http.get("/api/goods").then(response => {
        response = response.body;//转化为json  https://github.com/pagekit/vue-resource/blob/develop/docs/api.md
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          //读取dom的相关东西
          this.$nextTick(() =>{
            //异步更新，使用一个接口，调用相关dom操作的时候一定要用到这个接口  dom发生变化实在nextTick后面
            this._initScroll();
            this._computedHeight();
          })
        }
      });
    },
    methods:{
      selectMenu(index, event){//pc的时候click要执行两次，所以这里引入event,
        if(!event._constructed){
          return;//设置他的原生事件不触发
        };
        let contentitem = this.$refs.contentWrapper.getElementsByClassName('contentitemhook');
        let el = contentitem[index];
        this.contentScroll.scrollToElement(el,300);//动画时间
       // console.log(index);//只写这里是没有作用的要在initScroll里面定义一下
      },
      showfood(food,event){
        if(!event._constructed){
          return;//设置他的原生事件不触发
        }
        this.selectedFoods = food;
        this.$refs.food.show();//拿到food.vue中的show方法
      },
    _initScroll(){
      //调用插件scroll
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        //better-scroll默认是touch设置click要声明
        click:true
      });
      //因为上面加了v-el this.$refs.contentWrapper相当于拿到一个原生的dom
      this.contentScroll = new BScroll(this.$refs.contentWrapper,{
        probeType:3,
        click:true
      });
      this.contentScroll.on("scroll",(pos)=>{
        //滚动的时候拿到y
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
      _computedHeight(){
         //let表示局部作用域  这里后去comHeight这个数组
        let contentitem = this.$refs.contentWrapper.getElementsByClassName('contentitemhook');
        let height=0;
        this.comHeight.push(height);
        for(let i=0;i<contentitem.length;i++){
            let item = contentitem[i];
            height+=item.clientHeight;//每个区间的高度
            this.comHeight.push(height);
        }
      }
    }
  }
</script>

<style  lang="less" scoped rel="stylesheet/less">
  @import "../../common/css/mixin.less";
    .goods-wrapper{
      width:100%;
      display:flex;
      position:absolute;
      top:178px;
      left:0;
      bottom:46px;
      overflow: hidden;

      background:rgba(7,17,27,0);
      .menu-wrapper{
          flex:0 0 80px;
          background: #f3f5f7;
          width:80px;
          min-height:100%;
          height:100%;
        .menu-list{
          overflow: hidden;
          .menu-item{
              display:table;
              width:56px;
              height:54px;
              line-height: 14px;
              padding:0 12px;
              &.current{
                background: #fff;
                font-weight:700;
                position:relative;
                z-index:10;
                margin-top:-1px;
                .name{
                  border:none;
                }
              }
            .name{
              border-bottom:1px solid rgba(7,17,27,0.1);
              display: table-cell;
              width:56px;
              font-size:12px;
              color:rbg(240,20,20);
              vertical-align: middle;
              .icon {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-right: 2px;
                vertical-align: top;
                background-repeat: no-repeat;
                background-size: 12px 12px;
                &.decrease {
                  .bg-image2("decrease_3")
                }
                &.discount {
                  .bg-image2("discount_3")
                }
                &.guarantee {
                  .bg-image2("guarantee_3")
                }
                &.invoice {
                  .bg-image2("invoice_3")
                }
                &.special {
                  .bg-image2("special_3")
                }
              }
            }
          }
        }
      }
      .content-wrapper{
        flex:1;
        background: #f3f5f7;
        .contentitem{
          .foodname{
            font-size:12px;
            line-height: 26px;
            color:rgb(147,153,159);
            border-left:2px solid #d9dde1;
            padding-left:18px;
          }
          .foodsdetail{
            position:relative;
            padding:18px;
            background: #fff;
            display:flex;
              .icon{
                flex: 0 0 57px;
                margin-right:10px;
              }
            .detaile-food{
              margin-left:10px;

              .detailname{
                font-size:14px;
                color:rgb(7,17,27);
                line-height: 14px;
                margin:2px 0 8px;
              }
              .detaildes{
                font-size:10px;
                color:rgb(147,153,159);
                line-height: 10px;
                margin-bottom:8px;
              }
              .detail_info{
                font-size:10px;
                color:rgb(147,153,159);
                line-height: 10px;
                .ratings{
                  margin-left:12px;
                }
              }
              .price{
                margin-top:8px;
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
            }
            .cartcontrol-wrapper{
              position:absolute;
              right:18px;
              bottom:18px;
              height:40px;
            }
          }
        }
      }
    }
</style>
