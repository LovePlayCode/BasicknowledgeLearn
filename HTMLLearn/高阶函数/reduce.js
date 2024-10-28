const num = [1,2,3]
let newNums = num.reduce(function (preSum,curVal,currentIndex,array){
    return preSum + curVal; 
},0)
console.log(newNums)