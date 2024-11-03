/**
 * 处理 startIndex 的各种情况
 */
const computeStartIndex = (startIndex, len) => {
  // 如果 startIndex 负数
  if (startIndex < 0) {
    return startIndex + len > 0 ? startIndex + len : 0;
  }
  return startIndex >= len ? len : startIndex;
};

/**
 * 处理 deleteCount
 */
const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
  if (argumentsLen === 1) return len - startIndex;
  if (deleteCount < 0) {
    return 0;
  }
  if (deleteCount > len - startIndex) {
    return len - startIndex;
  }
  return deleteCount;
};

/**
 * 拷贝删除的元素
 */
const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
  for (let i = 0; i < deleteCount; i++) {
    const currentIndex = startIndex + i;
    if (currentIndex in array) {
      deleteArr[i] = array[currentIndex];
    }
  }
};

/**
 * 移动要删除的元素
 */
const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
  // 删除的元素和新增的元素一致，不需要移动
  const addElementLen = addElements.length;
  if (deleteCount === addElementLen) {
    return;
  }
  // 小于
  if (addElementLen < deleteCount) {
    // 向前运动
    for (let i = startIndex + deleteCount; i < len; i++) {
      array[i - (deleteCount - addElementLen)] = array[i];
    }
    // 纠正 length 的长度，
    for (let i = len - 1; i > len + (addElementLen - deleteCount); i--) {
      delete array[i];
    }
    return;
  }

  // 大于
  if (addElementLen > deleteCount) {
    for (let i = len - 1; i >= startIndex + deleteCount; i--) {
      let formIndex = i;
      let toIndex = i + (addElementLen - deleteCount);
      // 有可能是稀疏数组，所以需要用 in 判断一下
      if (formIndex in array) {
        array[toIndex] = array[formIndex];
      } else {
        delete array[toIndex];
      }
    }
  }
};

/**
 *
 * @param {number} start
 * @param {number} deleteCount
 * @param  {...any} itemArg
 */
Array.prototype.splice = function (start, deleteCount, ...itemArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  const argumentsLen = arguments.length;
  let array = Object(this);
  let len = array.length >>> 0;
  let deleteArr = new Array(deleteCount);
  start = computeStartIndex(start, len);
  deleteCount = computeDeleteCount(start, len, deleteCount, argumentsLen);
  // 处理密封对象
  if (Object.isSealed(array) && deleteCount !== itemArg.length) {
    throw new TypeError("the object is a sealed object!");
    // 处理冻结对象
  } else if (
    Object.isFrozen(array) &&
    (deleteCount > 0 || addElements.length > 0)
  ) {
    throw new TypeError("the object is a frozen object!");
  }
  // 拷贝删除的元素
  sliceDeleteElements(array, start, deleteCount, deleteArr);
  // 移动删除元素后面的元素
  movePostElements(array, start, len, deleteCount, itemArg);
  // 插入新元素
  for (let i = 0; i < itemArg.length; i++) {
    array[start + i] = itemArg[i];
  }
  // 更新array 的length 值
  array.length = len - deleteCount + itemArg.length;

  return deleteArr;
};
const arr = [1, 3, 4, 6, 8];
arr.splice(0, 2, 88, 99, 100, 33);
console.log(arr);
