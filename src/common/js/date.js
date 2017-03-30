/**
 * Created by Administrator on 2017/3/20 0020.
 */

export function formatDate(date,fms){
  if(/(y+)/.test(fms)){//表示获取yyyy的那个  substr里面4个y?所以4-  RegExp.$1  4个y表示
        fms = fms.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))
  }
  let o = {
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fms)){
        let str = o[k]+"";
      fms = fms.replace(RegExp.$1,(RegExp.$1.length === 1) ? str: addleft(str))

    }
  }
  return fms;
}

function addleft(str){
  return ("00"+str).substr(str.length)//return ("00"+str).substr(str)???？然后就去掉了第一个0 如果是4 str.length =1 那么这里去掉第一0  变成了04  如果是10 str.length=2 去掉前面两个0 最后就是10
}
