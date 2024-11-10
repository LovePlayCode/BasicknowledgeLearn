Array.prototype.push = function (...items){
    let O = Object(this)
    let len = this.length >>> 0
    let argCount = items.length >>> 0
    // 判断添加的值和当前值是否超过最大值
    if(len + argCount > 2 ** 53-1){
        throw new TypeError('The number of array is over the max value restricted!')
    }
    for(let i=0;i<argCount;i++){
        O[len+i] = items[i]
    }
    let newLength = len + argCount
    O.length = newLength
    return newLength
}
const arr = []
const length = arr.push(1,2,3,4,5,6)
console.log(arr,length)