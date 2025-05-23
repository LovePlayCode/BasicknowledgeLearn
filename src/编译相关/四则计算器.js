/**
 * Token
 *  Number 1 2 3 4 5 6 7 8 9 0 组合
 *  Operator: + 、- 、 * 、 / 之一
 * Whitespace: <sp>
 * LineTerminator: <LF> <CR>
 */

// 1. 第一个状态: 根据第一个输入字符来判断进入了哪种状态
var token = [];
var tokens = [
  {
    type: "Number",
    value: "1024",
  },
  {
    type: "+",
    value: "+",
  },
  {
    type: "Number",
    value: "2",
  },
  {
    type: "*",
    value: "*",
  },
  {
    type: "Number",
    value: "256",
  },
  {
    type: "EOF",
  },
];
const start = (char) => {
  if (
    char === "1" ||
    char === "2" ||
    char === "3" ||
    char === "4" ||
    char === "5" ||
    char === "6" ||
    char === "7" ||
    char === "8" ||
    char === "9" ||
    char === "0"
  ) {
    token.push(char);
    return inNumber;
  }
  if (char === "+" || char === "-" || char === "*" || char === "/") {
    emmitToken(char, char);
    return start;
  }
  if (char === " ") {
    return start;
  }
  if (char === "\r" || char === "\n") {
    return start;
  }
};
const inNumber = (char) => {
  if (
    char === "1" ||
    char === "2" ||
    char === "3" ||
    char === "4" ||
    char === "5" ||
    char === "6" ||
    char === "7" ||
    char === "8" ||
    char === "9" ||
    char === "0"
  ) {
    token.push(char);
    return inNumber;
  } else {
    emmitToken("Number", token.join(""));
    token = [];
    return start(char); // put back char
  }
};

function emmitToken(type, value) {
  console.log(value);
}

function AdditiveExpression(source) {
  if (source[0].type === "MultiplicativeExpression") {
    let node = {
      type: "AdditiveExpression",
      children: [source[0]],
    };
    source[0] = node;
    return AdditiveExpression(source);
  }
  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    source[1].type === "+"
  ) {
    let node = {
      type: "AdditiveExpression",
      operator: "+",
      children: [],
    };

    // 先乘除,后加减  这边先push出来操作符和+， 解析高优先级的右操作符。
    node.children.push(source.shift());
    node.children.push(source.shift());
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }
  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    source[1].type === "-"
  ) {
    let node = {
      type: "AdditiveExpression",
      operator: "-",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    MultiplicativeExpression(source);
    node.children.push(source.shift());
    source.unshift(node);
    return AdditiveExpression(source);
  }
  if (source[0].type === "AdditiveExpression") return source[0];
  MultiplicativeExpression(source);
  return AdditiveExpression(source);
}
function MultiplicativeExpression(source) {
  if (source[0].type === "Number") {
    let node = {
      type: "MultiplicativeExpression",
      children: [source[0]],
    };
    source[0] = node;
    return MultiplicativeExpression(source);
  }
  if (
    source[0].type === "MultiplicativeExpression" &&
    source[1] &&
    source[1].type === "*"
  ) {
    let node = {
      type: "MultiplicativeExpression",
      operator: "*",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    node.children.push(source.shift());
    source.unshift(node);
    return MultiplicativeExpression(source);
  }
  if (
    source[0].type === "MultiplicativeExpression" &&
    source[1] &&
    source[1].type === "/"
  ) {
    let node = {
      type: "MultiplicativeExpression",
      operator: "/",
      children: [],
    };
    node.children.push(source.shift());
    node.children.push(source.shift());
    node.children.push(source.shift());
    source.unshift(node);
    return MultiplicativeExpression(source);
  }
  if (source[0].type === "MultiplicativeExpression") return source[0];

  return MultiplicativeExpression(source);
}
function Expression(source) {
  if (
    source[0].type === "AdditiveExpression" &&
    source[1] &&
    source[1].type === "EOF"
  ) {
    let node = {
      type: "Expression",
      children: [source.shift(), source.shift()],
    };
    source.unshift(node);
    return node;
  }
  AdditiveExpression(source);
  return Expression(source);
}

function evaluate(node) {
  if (node.type === "Expression") {
    return evaluate(node.children[0]);
  }
  if (node.type === "AdditiveExpression") {
    if (node.operator === "-") {
      return evaluate(node.children[0]) - evaluate(node.children[2]);
    }
    if (node.operator === "+") {
      return evaluate(node.children[0]) + evaluate(node.children[2]);
    }
    return evaluate(node.children[0]);
  }
  if (node.type === "MultiplicativeExpression") {
    if (node.operator === "*") {
      return evaluate(node.children[0]) * evaluate(node.children[2]);
    }
    if (node.operator === "/") {
      return evaluate(node.children[0]) / evaluate(node.children[2]);
    }
    return evaluate(node.children[0]);
  }
  if (node.type === "Number") {
    return Number(node.value);
  }
}
var source = [
  {
    type: "Number",
    value: "3",
  },
  {
    type: "*",
    value: "*",
  },
  {
    type: "Number",
    value: "300",
  },
  {
    type: "+",
    value: "+",
  },
  {
    type: "Number",
    value: "2",
  },
  {
    type: "*",
    value: "*",
  },
  {
    type: "Number",
    value: "256",
  },
  {
    type: "EOF",
  },
];

var ast = Expression(source);

console.log(ast);
console.log(evaluate(ast));
