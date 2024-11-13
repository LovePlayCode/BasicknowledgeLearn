function EventEmitter() {
  this.events = new Map();
}

const wrapCallback = (fn, once = false) => ({ callback: fn, once });

/**
 * 这个方法可以根据传入的 type 注册对应的事件
 * @param {string} type
 * @param {Function} fn
 * @param {boolean} once
 */
EventEmitter.prototype.addListener = function (type, fn, once = false) {
  let handler = this.events.get(type);

  if (!handler) {
    this.events.set(type, wrapCallback(fn, once));
  } else if (handler && typeof handler.callback === "function") {
    this.events.set(type, [handler, wrapCallback(fn, once)]);
  } else {
    handler.push(wrapCallback(fn, once));
  }
};

/**
 *
 * @param {string} type
 * @param {Function} listener
 * 1. 判断是不是数组，如果不是数组，代表其中就一个注册函数，直接判断两个 callback 是否相等即可， 相等删除。
 * 2. 如果是数组的话，遍历这个数组，然后判断是否相等。 如果相等就删除，但是使用splice会有数组塌陷问题，所以需要处理一下索引的指向
 * 3. 要注意如果数组还剩下最后一个元素的话，就不需要数组存储回调了。
 */
EventEmitter.prototype.removeListener = function (type, listener) {
  const handle = this.events.get(type);
  if (!handle) {
    return;
  }
  if (!Array.isArray(handle)) {
    if (handle.callback === listener.callback) {
      this.events.delete(type);
    }
  }
  for (let i = 0; i < handle.length; i++) {
    if (handle[i].callback === listener.callback) {
      handle.splice(i, 1);
      i--;
    }
  }
  if (handle.length === 1) {
    this.events.set(type, handle[0]);
  } else if(handle.length === 0) {
    this.events.delete(type);
  }
};

EventEmitter.prototype.once = function (type, fn) {
  this.addListener(type, fn, true);
};

EventEmitter.prototype.emit = function (type, ...args) {
  let handle = this.events.get(type);
  if (!handle) {
    return;
  }

  if (Array.isArray(handle)) {
    handle.map((item) => {
      item.callback.apply(this.args);
      if (item.once) {
        this.removeListener(type, item);
      }
    });
  } else {
    handle.callback.apply(this.args);
  }
  return true;
};

EventEmitter.prototype.removeAllListener = function (type) {
  let handler = this.events.get(type);
  if (!handler) return;
  else this.events.delete(type);
};

let e = new EventEmitter();
e.addListener("type", () => {
  console.log("type事件触发！");
});
e.addListener("type", () => {
  console.log("WOW!type事件又触发了！");
});

function f() {
  console.log("type事件我只触发一次");
}
e.once("type", f);
e.emit("type");
e.emit("type");
e.removeAllListener("type");
e.emit("type");

// type事件触发！
// WOW!type事件又触发了！
// type事件我只触发一次
// type事件触发！
// WOW!type事件又触发了！
