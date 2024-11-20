const fs = require("fs");

const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then((res) => res);
};

const gen = function* () {
  const data1 = yield readFilePromise("001.txt");
  console.log(data1.toString());
  const data2 = yield readFilePromise("002.txt");
  console.log(data2.toString());
};

let g = gen();
function getGenPromise(gen, data) {
  return gen.next(data).value;
}
getGenPromise(g)
  .then((data1) => {
    return getGenPromise(g, data1);
  })
  .then((data2) => {
    return getGenPromise(g, data2);
  });
