
<template>
 <div id="app">
   <vheader :seller="seller">

   </vheader>
   <div class="tab">
     <div class="tab-item">
       <router-link to="/goods">商品</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/ratings">评价</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/seller">商家</router-link>
     </div>
   </div>
   <div>
     <keep-alive><router-view :seller="seller">content</router-view></keep-alive>
   </div>
 </div>
</template>
<!--这里要写这个 type="text/ecmascript-6"-->
<script type="text/ecmascript-6">
  import vheader from './components/header/header.vue';
  import {urlparse} from './common/js/util';
  const ERR_OK = 0;
  export default {
    name: 'app',
    data(){
      return {
        seller:{
          id:(()=>{
            let  queryParam = urlParse();
            return queryParam.id;
            console.log(queryParam)
          })
        }
      }
    },
    created(){
      // GET /someUrl
      this.$http.get('/api/seller').then(response => {
          response = response.body;//转化为json  https://github.com/pagekit/vue-resource/blob/develop/docs/api.md
        if(response.errno === ERR_OK){
          this.seller = response.data;
        }
    });
    },
    components:{
      vheader
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./common/css/base";
    #app .tab{
      width:100%;
      display:flex;
      flex-direction: row;
      height:40px;
      line-height: 40px;
      border-bottom:1px solid rgba(7,17,27,0.1);
    };
      .tab-item {
        flex: 1;
        text-align: center;
      };
  a.router-link-active{
    color:red;
  };

</style>
