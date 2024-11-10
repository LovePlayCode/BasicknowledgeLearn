/**
 * 
 * @param {*} target 
 * @param {WeakMap} map 
 * @returns 
 * 1. 这一版的深拷贝比较简单， 可以解决循环引用的问题，但是不能拷贝 map，set 以及正则函数等对象。
 * 2. 可以通过 Object.prototype.toString(obj) 来获取真实的 type，最后进行拷贝。相当于单独判断一次吧。
 */
function clone(target,map = new WeakMap()){
    if(typeof target === 'object' && target !== null){
        if(map.has(target)){
            return map.get(target)
        }
        let obj = Array.isArray(target) ? [] : {}
        map.set(target,obj)
        for(let index in target){
            if(Object.hasOwn(target,index)){
                obj[index] = clone(target[index],map)
            }
        }
        return obj
    }else{
        return target
    }
}