Array.prototype.filter = function (callBack,thisArg){
    if(this === null || this === undefined){
        throw new TypeError('Cannot read prototype "map" or undefined')
    }
    if(Object.prototype.toString.call(callBack) !== '[object Function]'){
        throw new TypeError(`${callBack} is not a function`)
    }
    let O = Object(this)
    let T = thisArg
    let len = O.length >>> 0
    let A = new Array(A)
    for(let k=0;k<len;k++){
        if(k in O){
            let value = O[k]
            const resValue = callBack.call(T,value,k,O)
            if(resValue){
                A.push(O[k])
            }
        }
    }
    return A
}