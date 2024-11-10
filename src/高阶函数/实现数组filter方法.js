Array.prototype.filter = function (callbackfn, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('Cannot read property "filter" of null or undefined');
  }
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + " is not a function");
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let resLen = 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    if (i in O) {
      let element = O[i];
      if (callbackfn.call(thisArg, O[i], i, O)) {
        res[resLen++] = element;
      }
    }
  }
};

const arr = [1, 2, 3];
arr.filter((item) => {
  console.log("item==", item);
});
