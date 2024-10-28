

/**
 * 
 * @param {Array} arr 
 */
function main(arr){
    return arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur) ? main(cur): cur)
    },[])
}
let ary = [1, [2, [3, [4, 5]]], 6];
const resData = main(ary)
console.log('resData==',resData)