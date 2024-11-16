/**
 * finally 没有接收入参，所以获取不到返回值，
 */
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    },
    (error) => {
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
    console.log("res==", res);
  });
