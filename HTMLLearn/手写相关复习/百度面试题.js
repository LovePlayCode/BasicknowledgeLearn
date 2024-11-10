/**
 * 异步任务 Promise resolve
 * 并发限制 
 */
class Scheduler {
    constructor() {
      this.count = 2;
      // 等待队列
      this.queue = [];
      this.run = [];
    }
    /**
     * 看题目要求，调用了scheduler.add 后，可以跟 then 那么必然是返回了一个期约对象的。
     * 需要控制并发，需要把每个期约的resolve妥善保管，不然会出现货不对版的情况。
     * @param {*} task 
     */
    add(task) {
        return new Promise((resolve,reject)=>{
            const runTask = ()=>{
                task().then((res)=>{
                    resolve(res)
                    this.run = this.run.filter(item => item!== task)
                    if(!!this.queue.length){
                        const first = this.queue.shift()
                        this.run.push(first)
                        first()
                    }
                    // add(first)
                })
            }
            if(this.run.length < this.count){
                this.run.push(task)
                runTask()
            }else{
                this.queue.push(runTask)
            }
        })

    }
  }
  
  const timeout = (time) =>
    new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  
  const scheduler = new Scheduler();
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order));
  };
  
  addTask(1000, "1");
  addTask(500, "2");
  addTask(300, "3");
  addTask(400, "4");
  // output: 2 3 1 4
  
  // 前两次 立即执行  后面等待 ,等到执行完成空出来，依次塞进去。
  