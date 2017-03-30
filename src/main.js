
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Goods from './components/goods/goods.vue';
import Seller from './components/seller/seller.vue';
import Ratings from './components/ratings/ratings.vue';

import "./common/css/index.less";
import animate from 'animate.css';
//可以像上面一样不用写./ 在webpack.base里面设置
/*import "common/css/index.less";*/
//全局注册安装vue-router
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  {path:'/goods',component:Goods},
  {path:'/seller',component:Seller},
  {path:'/ratings',component:Ratings}
]
var router = new VueRouter({routes});
new Vue({
  el: '#app',
  router,
  animate,
  template: '<App/>',
  components: { App }
});
