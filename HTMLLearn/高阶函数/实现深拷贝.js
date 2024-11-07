/**
 * 简易版， 使用JSON.stringify
 */

// const a = {name: 'lhl',age:20}
// a.target = a
// const b = a
// a.age = 3
// console.log(b);
// const str = JSON.stringify(a)
// const b1 = JSON.parse(str)
// a.age = 100
// console.log(b1)

// 写一个可以解决循环引用的

const isObject = (target) =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

/**
 * 定义一个可以判断所有数据类型的方法
 */
function getType(target) {
  return Object.prototype.toString.call(target);
}

/**
 * 保留实例的属性
 */
function getInit(target) {

  const Ctor = target.constructor;
  return new Ctor();
}

/**
 * 对 Symbol 的克隆
 */
function cloneSymbol(targe){
    return Object(Symbol.prototype.valueOf.call(targe))
}

/**
 * 克隆正则
 */
function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

/**
 * 克隆函数
 * 1. 预定义一些正则表达式，分别可取出函数体和函数参数中的内容
 * 2. 定义参数表达式
 * 3. 通过 toString 取到函数的字符串定义
 * 4. 箭头函数没有prototype,可以通过这个判断是普通函数还是箭头函数
 * 5. 先处理body，然后判断有没有params 由的话由 Function 创建
 */
function cloneFunction(func){
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcToString = func.toString()
    if(func.prototype){
        const body = bodyReg.exec(funcToString)
        const params = paramReg.exec(funcToString)
        if(body){
            if(params){
                return new Function(...params[0].split(','),body[0])
            }else{
                return new Function(body[0])
            }
        }else{
            return null
        }
    }else{
        return eval(func)
    }
}




//   const getType = Object.prototype.toString.call(obj);
const canTraverse = {
  "[object Map]": true,
  "[object Set]": true,
  "[object Array]": true,
  "[object Object]": true,
  "[object Arguments]": true,
};

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

/**
 * 记录一些能被 toString.call 出来的数据类型
 */
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const numberTag = "[object Number]";
const regexpTag = "[object RegExp]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const funcTag = '[object Function]'
// 可以遍历的数据类型
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


/**
 * 根据不同的类型创建不同的实例
 */
function cloneOtherType(targe,type){
    const Ctor = targe.constructor
    switch(type){
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe)
        case regexpTag:
            return cloneReg(targe)
        case symbolTag:
            return cloneSymbol(targe)
        case funcTag:
            return cloneFunction(targe)
        default: 
            return null                            
    }
}



/**
 * 1. map 中是否有值，有值就返回target
 * 2. 判断是否是对象，如果不是对象直接返回 target
 * 3. 如果是对象，set 到 map 中
 * 4. 判断是否为数组 用于初始化
 * 5. 循环遍历，只 clone 自身属性。
 * 6. 可遍历对象的处理
 * 7. while 性能最好
 */
function deepClone(target, map = new WeakMap()) {
  if (map.get(target)) {
    return map.get(target);
  }
  if (isObject(target)) {
    let obj = Array.isArray(target) ? [] : {};
    map.set(target, obj);
    for (let index in target) {
      if (Object.hasOwn(target, index)) {
        obj[index] = deepClone(target[index], map);
      }
    }
    return obj;
  } else {
    return target;
  }
}

/**
 *
 * @param {Record<string,any>} target
 * @param {WeakMap} map
 * 1. 拿到原始类型，通过Object.prototype.toString.call
 * 2. 判断是否为可迭代的数据类型
 *    a. 判断是否为 set
 *    b. 判断是否为map
 * 3. 初始化值
 * 4. 判断是否有循环引用
 * 5. map.set
 * 6. 拿出所有 keys，用封装好的while进行遍历
 * 7.
 */
function clone(target, map = new WeakMap()) {
  if (isObject(target)) {
    if (map.get(target)) {
      return map.get(target);
    }
    let cloneObj = {};
    const type = getType(target);
  
    if (deepTag.includes(type)) {
      cloneObj = getInit(target);
    }else{
        return cloneOtherType(target,type)
    }
    
  

    map.set(target, cloneObj);
    // 处理set
    if (type === setTag) {
      target.forEach((item) => {
        cloneObj.add(clone(item, map));
      });
      return cloneObj;
    }
    // 处理 map
    if (type === mapTag) {
      target.forEach((value, key) => {
        cloneObj.set(key, clone(value, map));
      });
      return cloneObj;
    }
    const keys = Object.keys(target);
    map.set(target, cloneObj);
    forEach(keys, (value, index) => {
      cloneObj[value] = clone(target[value], map);
    });
    return cloneObj;
  } else {
    return target;
  }
}

// const aa1 = new Map();
// aa1.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });

// console.log(aa1);

// const a = { name: "lhl", age: 20, ccc: aa1 };
// a.target = a;
// const newObj = deepClone(a);
// const newObj2 = clone(a);
// a.ccc.set("Jessie", 2);
// a.age = 100;
// console.log("newObj==", newObj, newObj2);
const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};
const cloneObj = clone(target)
target.reg = /1231/
console.log(cloneObj)