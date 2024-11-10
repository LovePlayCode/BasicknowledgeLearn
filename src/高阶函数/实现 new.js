
// 实现一个 new
// 1. 让实例可以访问到私有属性
// 2. 实例可以访问到构造原型所在原型链上的属性。
// 3. 如果构造函数返回的结果不是引用数据类型，就返回这个对象

function newOperator(ctor,...args){
    if(typeof ctor !=='function'){
        throw new TypeError('Type Error')
    }
    // 继承原型链
    const obj = Object.create({},ctor.prototype)
    const res = ctor.call(obj,...args)
    const isObject = typeof res === 'object' && res !== null
    const isFn = typeof res === 'function'
    return isObject || isFn ? res : obj
}

function Person(name){
    this.name = name
}
const person = newOperator(Person,'123')
console.log(person)