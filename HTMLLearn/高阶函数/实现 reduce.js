Array.prototype.reduce = function(callback,initValue){
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'reduce' of null or undefined");
      }
      // 处理回调类型异常
      if (Object.prototype.toString.call(callback) != "[object Function]") {
        throw new TypeError(callback + ' is not a function')
      }
      let O = Object(this);
      let len = O.length >>> 0;
      let k = 0;
      let accumulator = initValue;
      
      // 找初始值的过程
      if(accumulator === undefined){
        for(;k<len;k++){
            if(k in O){
                accumulator = O[k]
                k++
                break
            }
        }
      }
    
      if(k === len && accumulator === undefined){
        throw new Error('Each element of the array is empty')
      }
      for(;k<len;k++){
        if(k in O){
            accumulator = callback.call(undefined,accumulator,O[k],k,O)
        }
      }
      return accumulator
}
const getMax = (a, b) => Math.max(a, b);

// 从索引 0 开始为数组中的每个元素调用回调函数
const res1 = [1, 100].reduce(getMax, 50); // 100
console.log('res1==',res1)
const arrLike = { 0: 'a', 1: 'b', length: '5.5' };  // length 是字符串 '5.5'
const res2 = Array.prototype.reduce.call(arrLike, (acc, val) => acc + val, ''); 
console.log('res2==',res2)
// [50].reduce(getMax, 10); // 50

// // 仅为索引 1 处的元素调用回调函数
// [1, 100].reduce(getMax); // 100

// // 不调用回调函数
// [50].reduce(getMax); // 50
// [].reduce(getMax, 1); // 1

// [].reduce(getMax); // TypeError
