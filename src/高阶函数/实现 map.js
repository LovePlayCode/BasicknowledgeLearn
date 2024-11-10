Array.prototype.map = function(callback,thisArg){
    // 如果当前 this为 null | this 为undefined, 抛出错误
    if(this === null || this == undefined){
        throw new TypeError('Cannot read prototype "map" of null or undefined')
    }
    if(Object.prototype.toString.call(callback) !== '[object Function]'){
        throw new TypeError(`${callback}is not a function`)
    }
    // 先转成对象？？
    let O = Object(this)
    let T = thisArg
    let len = O.length >>> 0
    let A = new Array(len)
    for(let k=0;k<len;k++){
        if(k in O){
            let value = O[k]
            A[k] = callback.call(T,value,k,O)
             
        }
    }
    return A
    // console.log(O)
}
const arr = [1,2,3]
const resArr = arr.map(item=>{
    return {
        name : item
    }
})
console.log('resArr==',resArr)