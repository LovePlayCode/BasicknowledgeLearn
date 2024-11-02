Function.prototype.bind = function(context,...args){
    if(typeof this !== 'function'){
        throw new TypeError('this is not function')
    }
    const self = this
    var fNOP = function () {};
    const found = function (){
        self.call(this instanceof self ? this : context,args.concat(Array.from(arguments)))
    }
    found.prototype = this.prototype
    fNOP.prototype = this.prototype;
    found.prototype = new fNOP();
    return found
}
function main(){
    console.log(this);
    
}
const fn = main.bind({a: 1})
fn()