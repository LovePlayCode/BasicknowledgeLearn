// 定义三种状态
const fs = require("fs");

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 这是一个手写的Promise
 * 1. 有一个参数executor
 * 2. 有两个状态函数 resolve,reject。
 * 3. 当调用resolve时， 需要先判断当前状态是否是 pending， 如果不是 pending 直接 return  如果是pending,改变 status，调用onFulfilled。
 * 4. 拒绝状态下也同理。
 */
function MyPromise(executor) {
  let self = this;
  self.value = null;
  self.error = null;
  self.status = PENDING;
  self.onFulfilled = null;
  self.onRejected = null;
  const resolve = (value) => {
    if (self.status !== PENDING) {
      return;
    }
    setTimeout(() => {
      self.value = value;
      self.status = FULFILLED;
      if (typeof self.onFulfilled === "function") {
        self.onFulfilled(self.value);
      }
    }, 0);
  };

  const reject = (error) => {
    if (self.status !== PENDING) {
      return;
    }
    setTimeout(() => {
      self.error = error;
      self.status = REJECTED;
      if (typeof self.onRejected === "function") {
        self.onRejected(self.error);
      }
    }, 0);
  };
  executor(resolve, reject);
}

// 在一个函数的 prototype 上绑定一个 then 方法，通过 then 进行链式调用
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 如果是pending状态，先给回调赋值
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
  // 如果是fulfilled 直接调用成功回调，并将成功值返回
  if (this.status === FULFILLED) {
    onFulfilled(this.value);
  }
  // 如果是rejected，直接执行失败回调，并将失败值返回。
  if (this.status === REJECTED) {
    onRejected(this.value);
  }
};

let promise1 = new MyPromise((resolve, reject) => {
  fs.readFile("./001.txt", (err, data) => {
    if (!err) {
      resolve(data);
    } else {
      reject(err);
    }
  });
});
let x1 = promise1.then((data) => {
  console.log("第一次展示", data.toString());
});

let x2 = promise1.then((data) => {
  console.log("第二次展示", data.toString());
});

let x3 = promise1.then((data) => {
  console.log("第三次展示", data.toString());
});
