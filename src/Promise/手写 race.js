/**
 *
 * @param {Promise[]} promises
 * 传入一个数组，有一个成功或失败，就直接返回结果
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    if (len === 0) {
      return;
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

Promise.race([Promise.resolve("success"), Promise.reject("error")]).then(
  (res) => {
    console.log("data=", res);
  }
);
