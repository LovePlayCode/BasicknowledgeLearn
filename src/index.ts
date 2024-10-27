
// 装饰器函数
function sealed(target: any) {
  console.log('target===',target)
  // do something with 'target' ...
}
@sealed()
function main(a:any,b:any){
  return a + b
}
console.log(main(10,20))
addEventListener