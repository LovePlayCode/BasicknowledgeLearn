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
function getInit(target){
    const Ctor = target.constructor
    return new Ctor()
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
 * 1. 判断是否是对象
 * 2. 判断是否是数组
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
    const cloneObj = Array.isArray(target) ? [] : {};
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

const aa1 = new Map();
aa1.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });

console.log(aa1);

const a = { name: "lhl", age: 20, ccc: aa1 };
a.target = a;
const newObj = deepClone(a);
const newObj2 = clone(a);
a.ccc.set("Jessie", 2);
a.age = 100;
console.log("newObj==", newObj, newObj2);
