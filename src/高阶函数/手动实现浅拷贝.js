/**
 * 实现浅拷贝
 * 1. 判断是否是对象且不是 null
 * 2. 判断是否为数组，如果是数组，赋值为[] : {}
 * 3. 遍历taget 依次赋值即可。
 */
function shallowClone(target){
    if(typeof target === 'object' && target !== null){
        const obj = Array.isArray(target) ? [] : {}
        for(let i in target){
            if(Object.hasOwn(target,i)){
                obj[i] = target[i]
            }
        }
        return obj
    }else{
        return target
    }
}
const arr = [1,2,{a:1}]
const arr1 = shallowClone(arr)
arr[2].a = 3
console.log(arr,arr1)


// Object.assign
let obj = { name: 'sy', age: 18 };
const obj2 = Object.assign({}, obj, {name: 'sss'});
console.log(obj2);//{ name: 'sss', age: 18 }

// concat 浅拷贝数组
let arr = [1,2,3]
let newArr = arr.concat()
newArr[1] = 2

// slice
// ...展开