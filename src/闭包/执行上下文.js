const console = require("console");

var b;
void (function () {
  var env = { b: 1 };
  b = 2;
  console.log("In function b:", b);
  with (env) {
    var b = 3;
    console.log("in with b:", b);
  }
})();
console.log("全局 B::", b);
