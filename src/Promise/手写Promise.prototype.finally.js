/**
 * finally 没有接收入参，所以获取不到返回值，
 * 当finally返回了一个错误，会覆盖原来 Pormise 的错误。
 */
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      console.log("error==");
      return Promise.resolve(callback()).then(() => {
        console.log("error2==");
        return value;
      });
    },
    (error) => {
      console.log("error==", error);
      return Promise.resolve(callback()).then(() => {
        throw error;
      });
    }
  );
};
Promise.resolve("success")
  .finally((res) => {
    console.log(res);
    throw "123";
  })
  .then((res) => {
    console.log("res==", res);
  })
  .catch((res) => {
    console.log("resError==", res);
  });
