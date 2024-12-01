const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

let primes = [];
function findPrime(start, range){
    let isPrime = true;
    const end = start + range;
    for (let i = start; i<end; i++){
        for (let j = 2; j<Math.sqrt(end); j++){
            if (i !== j && i % j === 0){
                isPrime = false;
                break;
            }
        }
        if (isPrime){
            primes.push(i);
        }
        isPrime = true;
    }
}

if (isMainThread){
    const max = 2000000;
    const min = 2;
    const threadCount = 6;
    const threads = new Set();
    const range = Math.floor((max-min)/threadCount);
    let start = min;

    console.time('prime');

    for(let i = 0; i < threadCount; i+=1){
        const wStart = start;
        threads.add(new Worker(__filename,{workerData: {start:wStart,range}}));
        start += range;
    }

    for(let worker of threads){
        worker.on('error',(err)=>{
            throw err;
        });
        worker.on('exit',()=>{
            threads.delete(worker);
            if(threads.size === 0){
                console.timeEnd('prime');
                console.log(primes.length);
            }
        });
        worker.on('message',(msg)=>{
            primes = primes.concat(msg);
        });
    }
}
else{
    findPrime(workerData.start,workerData.range);
    parentPort.postMessage(primes);
}

