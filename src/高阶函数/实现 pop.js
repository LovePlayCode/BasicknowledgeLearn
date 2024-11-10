Array.prototype.pop = function(){
    let O = Object(this)
    let len = this.length >>> 0

    // 判断是否为 0，如果为 0，返回undefined
    if(len === 0){
        O.length = 0
        return undefined
    }
    len--
    let value = O[len]
    delete O[len]
    O.length = len
    return value
}
const length = [1,2,30].pop()
console.log('length==',length)