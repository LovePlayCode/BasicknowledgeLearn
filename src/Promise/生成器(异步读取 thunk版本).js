const fs = require("fs");

const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  };
};

const gen = function* () {
  const data1 = yield readFileThunk("001.txt");

  console.log(data1.toString());
  const data2 = yield readFileThunk("002.txt");
  console.log(data2.toString());
};
const g = gen();
// g.next().value((err, data1) => {
//   console.log("data1==", data1.toString());

//   // 往 next 传入入参，会同步映射到 yield前面的接收变量上。    如 const data1 = g.next(data1) 中的 data1 相当于把next中data1 取出来给了 data1
//   g.next(data1).value((err, data) => {
//     console.log("data2==", data.toString());
//   });
// });

/** 封装版本 */
function run(gen) {
  const next = (err, data) => {
    let res = gen.next(data);
    if (res.done) {
      return;
    }
    res.value(next);
  };
  next();
}
run(g);
