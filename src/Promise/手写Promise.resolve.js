/**
 * 实现resolve静态方法有三个要点
 * 1. 传参为一个Promise,则直接返回它。
 * 2. 传参为一个thenable,返回的Promise会跟随这个对象，采用它的最终状态作为自己的状态。
 * 3. 其他情况，直接返回以该值为成功状态的 promise 对象
 *
 */

Promise.resolve = (param) => {
  if (param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    // 判断是否传入的是一个thenable对象，需要采用它的最终状态作为自己的状态
    if (param && param.then && typeof param.then === "function") {
      param.then(resolve, reject);
    }
    return resolve(param);
  });
};

Promise.resolve(Promise.resolve("dj")).then((res) => {
  console.log(res);
});
