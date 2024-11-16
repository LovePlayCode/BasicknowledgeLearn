/**
 *
 * @param {Promise[]} promises
 * @returns 如果所有 promise 都成功，返回成功的数组，只要有一个失败，就返回失败的原因。 只返回一个即可。
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let index = 0;
    let len = promises.length;
    if (len === 0) {
      return result;
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then((data) => {
          result[i] = data;
          // 为了判断是否走到数组最后， 走到数组最后需要resolve出去
          index++;
          if (index === len) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
