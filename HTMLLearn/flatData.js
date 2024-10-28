
/**
 * 
 * @param {} arr 
 */
function main(arr){
    const res = []
    let fn = (resArr)=>{
        for(let itemArr of resArr){
            if(Array.isArray(itemArr)){
                fn(itemArr)
            }else{
                res.push(itemArr)
            }
        }
    }
    fn(arr)
    return res
}


let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]

const resData = main(ary)
console.log(resData)