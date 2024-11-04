/**
 * eval(args)
 * args: string  如果字符串是一个表达式，会对表达式求值。如果是一个或多个 js 语句，会执行语句。
 * eval 危险的函数，使用与调用者相同的权限执行代码。
 * 运行速度比较慢，因为必须调用 JS 解释器
 * 现代JS 解释器基本上都会将 JS转换为机器代码，意味着任何变量命名的概念都会被删除。
 * 任何一个 eval的使用都会强制浏览器进行冗长的变量名称查找，以确定变量在机器代码中的位置并设置其值。
 * 另外，新内容将会通过 eval() 引进给变量，比如更改该变量的类型，因此会强制浏览器重新执行所有已经生成的机器代码以进行补偿。
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval
 * 
 */

// 设置context作为调用的对象， 会自动指向 this
// 使用Symbol设置一个值
// 获得函数对象
// 通过 eval 运行
// 删除fn
// 返回 result

Function.prototype.call = function (context,...args){
    let con = context || window
    const fn = Symbol('fn')
    con.fn = this
    const result = eval('con.fn(...args)')
    delete con.fn
    return result
}

function main(){
    console.log('当前 this===',this)
}
const res = main.call({a:2},3)
console.log('res==',res)