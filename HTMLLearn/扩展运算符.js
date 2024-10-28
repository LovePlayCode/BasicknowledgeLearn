/**
 * 
 * @param {Array} arr 
 */
function main(arr){
    while(arr.some(Array.isArray)){
        arr = [].concat(...arr)
    }
    return arr
}

let ary = [1, [2, [3, [4, 5]]], 6];
const resData = main(ary)
console.log('resData===',resData)