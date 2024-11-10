Array.prototype.reduce = function (callBack, initValue) {
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'filter' of null or undefined");
  }
  if (Object.prototype.toString.call(callBack) !== "[object Function]") {
    throw new TypeError(callBack + "is not a function");
  }
  let O = Object(this);
  let len = O.length >>> 0;
  // if(initValue){}
  let pre = "";
  let start = 0;
  if (arguments.length === 1) {
    // 给 pre赋值，如果就传递了一个值，说明没传第二个参数
    for (; start < len; start++) {
      if (start in O) {
        pre = O[start++];
        break;
      }
    }
  } else {
    pre = initValue;
  }
  if (start === len && pre === undefined) {
    throw new Error("Each element of the array is empty");
  }
  for (; start < len; start++) {
    pre = callBack(pre, O[start], start, O);
  }
  return pre;
};
const res = [1,2,3].reduce((pre,cur)=>{
    return pre+cur
})
console.log(res);
