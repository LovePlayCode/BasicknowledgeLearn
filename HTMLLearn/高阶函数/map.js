const arr = [1, 2, 3];
const mapArr = arr.map(
  function (item, index, arr) {
    console.log("item===", item, index, arr, this);
    return {
        name: this.name
    }
  },
  { name: 2 }
);
console.log('mapArr==',mapArr)