Array.prototype.map = function (callback, thisArg) {
  // 判断数据类型 callback
  // 判断索引
  // 返回值
  if(this === null || this === undefined){
    throw new TypeError('Cannot read prototype "map" of null or undefined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(`callback is Error type`);
  }
  let arr = Object(this);
  // 兼容异常情况
  let len = arr.length >>> 0;
  const resArr = [];
  // 遍历
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      const res = callback.call(thisArg, arr[i], i, arr);
      resArr.push(res);
    }
  }
  return resArr;
};
const res = [1,2,3].map(item=>({a: item}))
console.log(res);
