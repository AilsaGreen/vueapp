/**
 * Created by Administrator on 2017/3/22 0022.
 */
/*
* 解析url参数
* @examle ?id=123456&a=b
* @return Object {id:123456,a:b}
* */
export function urlParse() {
  let url = window.location.search;//获取localhost:8080/?id=123344444#/seller里面的id
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if(arr){
    arr.forEach((item)=>{
      //{?id=123456,&a=b}  item
      let str = item.substr(1).split("=");
      let key = decodeURIComponent(str[0]);
      let val = decodeURIComponent(str[1]);
      obj[key] = val;
    })
  }
  return obj;
}
