// 手写 bind
// 入参： 接受一个 this 以及一些参数， 返回一个函数  如果是正常调用，那么 this 是传入的this  如果new调用 this 是函数本身 this
// 1. 判断当前this 是否是函数，如果不是函数，抛出一个 TypeError
// 2. 返回一个函数，在调用的过程中判断，如果 instanceof this  说明new 的 直接返回即可 否则改变this 的指向
// 3. prototype相关处理。 将新函数的prototype 赋值为 Object.create(prototype)
Function.prototype.mybind = function (context,...args){
    if(Object.prototype.toString.call(this) !== '[object Function]'){
        throw new TypeError('Type Error')
    }
    const self = this
    const fn = function (){
        return self.call(this instanceof self ? this : context,...args.concat(Array.from(arguments)))
    }
    fn.prototype = Object.create(self.prototype)
    return fn
}
function Person(){
    this.name = 'lhl'
}
const newPerson = Person.mybind({a: 2})
const per = new newPerson()
console.log(per)