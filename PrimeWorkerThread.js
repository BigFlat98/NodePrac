const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
let { findPrime,primes } = require('./Prime');
// Worker : 새로운 서브 스레드 생성. 
//isMianThread : 현재 우리가 사용하는 스레드가 메인 스레드인지 확인. 
//parentPort : mainthread와 다른 서브 스레드들 간의 통신을 위한 통로.
//workerData : 메인 스레드에서 서브 스레드로 데이터를 보내는 방법.

// findPrime(2,1000);
// console.log(primes.length);

//worker threads 사용 방법
if(isMainThread){//main thread 가 처리하는 작업 여기에 
   const max = 20000000; //우리가 찾는 소수의 범위 최댓값
   const min = 2; //우리가 찾는 소수의 범위 최솟값
   const threadCount = 6; //서브 스레드 수.(메인 스레드는 따로 지정할 필요 없음. 이미 우리가 사용하고 있는게 메인 스레드)
   const threads = new Set(); //서브 스레드를 관리하고 추적하기 위한 객체 Set, 파이썬의 Set과 같은 자료구조라 생각하면 됨. 중복은 허용하지 않음.하지만 순서는 있음.(그냥 중복 허용을 안하는 배열 느낌.)
   const range = Math.floor((max-min) / threadCount);//각 스레드가 처리할 범위 계산. 
   let start = min;

   console.time('prime');
   //서브 스레드 생성.
   for(let i = 0; i < threadCount; i+=1){
        const wStart = start;
        threads.add(new Worker(__filename,{workerData: {start:wStart,range}}));
        //워커 생성 코드. 
        //__filename은 현재 파일의 경로를 나타냄. 사용하지 않는 스레드가 어디에서 사용되는지 정해주기 위해서 현재 파일 경로를 붙여주는 것. 이래야 메인 스레드의 처리 요청을 받음.
        //workerData는 메인 스레드에서 서브 스레드로 데이터를 보내는 방법.

        start += range;//시작 범위 갱신.
   }

   //이벤트 핸들러
   for(let worker of threads){
    worker.on('error',(err)=>{ // on 메서드 -> 워커의 이벤트 처리.
        throw err;

    })
    worker.on('exit',()=>{
        threads.delete(worker);
        if(threads.size === 0){
            console.timeEnd('prime');
            console.log(primes.length);
        }
    });
    worker.on('message',(msg)=>{
        primes = primes.concat(msg); //워커가 전달한 소수 배열을 메인 스레드 배열에 합산. 서브 스레드들은 msg에 연산이 끝난 소수 배열을 넣어서 전달.
    });
   }
}
else{
    findPrime(workerData.start,workerData.range);
    parentPort.postMessage(primes);
}

//스레드를 6배 더 사용했지만, 스레드 생성 연산 할당, 스레드의 결과 메인으로 전달 등등 여러 작업 처리에 시간이 소요됨.