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
 * 1. map 中是否有值，有值就返回target
 * 2. 判断是否是对象，如果不是对象直接返回 target
 * 3. 如果是对象，set 到 map 中
 * 4. 判断是否为数组 用于初始化
 * 5. 循环遍历，只 clone 自身属性。
 */
function deepClone(target, map = new Map()) {
  if (map.get(target)) {
    return target;
  }
  if (isObject(target)) {
    let obj = Array.isArray(target) ? [] : {};
    map.set(target, true);
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
const a = { name: "lhl", age: 20 };
a.target = a;
const newObj = deepClone(a);
a.age = 100
console.log(newObj);
