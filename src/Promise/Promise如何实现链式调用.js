// 定义三种状态
const fs = require("fs");

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function resolvePromise(bridgePromise,x,resolve,reject){
    if(x instanceof MyPromise) {
        if(x.status === PENDING){
            x.then(y=>{
                resolvePromise(bridgePromise,y,resolve,reject)
            },error=>reject(error))
        }else{
            x.then(resolve)
        }
    }else{
       resolve(x)
    }
}


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
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (self.status !== PENDING) {
      return;
    }
    setTimeout(() => {
      self.value = value;
      console.log('测试 123kljdsajl ')
      self.status = FULFILLED;
      if (Array.isArray(self.onFulfilledCallbacks)) {
        // self.onFulfilled(self.value);
        self.onFulfilledCallbacks.forEach((fn) => {
          fn(self.value);
        });
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
      if (Array.isArray(self.onRejectedCallbacks)) {
        // self.onRejected(self.error);
        self.onRejectedCallbacks.forEach((efn) => {
          efn(self.error);
        });
      }
    }, 0);
  };
  executor(resolve, reject);
}

// 在一个函数的 prototype 上绑定一个 then 方法，通过 then 进行链式调用
MyPromise.prototype.then = function (onFulfilled, onRejected) {

  // 成功回调不传给它一个默认函数
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  // 对于失败回调直接抛错
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (error) => {
          throw error;
        };
  let bridgePromise
  const self = this;
  // 如果是pending状态，先给回调赋值
  if (this.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
        // 这个是注册到 Promise 异步调用的方法
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
        //   resolve(x);
        resolvePromise(bridgePromise,x,resolve,reject)
        } catch (error) {
          reject(x);
        }
      });
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  // 如果是fulfilled 直接调用成功回调，并将成功值返回
  if (this.status === FULFILLED) {
    onFulfilled(this.value);
  }
  // 如果是rejected，直接执行失败回调，并将失败值返回。
  if (this.status === REJECTED) {
    onRejected(this.value);
  }
  return this;
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
// let x1 = promise1.then((data) => {
//   console.log("第一次展示", data.toString());
// });

// let x2 = promise1.then((data) => {
//   console.log("第二次展示", data.toString());
// });

// let x3 = promise1.then((data) => {
//   console.log("第三次展示", data.toString());
// });

let readFilePromise = (filename) => {
    console.log('李浩龙真帅')
  return new MyPromise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};
let a = readFilePromise("./001.txt").then(res=>console.log(res))
// 猜猜这个是多少 ，因为闭包了，根据事件循环来说，这个获取到的是旧的，但是MyPromise 里面注册的宏任务是后面执行，所以当我们设置一个定时器在MyPromise 后面执行的话，就可以获取到最新的了。
setTimeout(() => {
    console.log(a)
}, 0);


setTimeout(()=>{
    console.log('a==',a)
    a.then(data=>{
        console.log('setTimeOutData==',data.toString())
    })
},500)
