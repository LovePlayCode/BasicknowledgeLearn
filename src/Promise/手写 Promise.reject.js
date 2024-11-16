/**
 * Promise.reject中传入的参数作为一个 reason 原封不动往下传
 */

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
Promise.reject(Promise.reject("1239999")).catch((res) => {
  console.log(res);
});
