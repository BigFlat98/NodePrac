
//명령줄 인수 출력
process.argv.forEach((val,index)=>{
    console.log(`${index} : ${val}`);
});

//환경변수 출력
process.env.testEnv = 'test';
console.log(process.env.testEnv);

//특정 조건의 프로세스 종료
if(process.argv.includes('--exit')){
    console.log('프로세스 종료');
    process.exit();
};

//현재 작업 디렉토리 변경 및 출력
console.log('current directory : ',process.cwd());
process.chdir('..');
console.log('changed directory : ',process.cwd());

//메모리 사용량 출력
console.log('memory usage : ',process.memoryUsage());


//nextTick
// 비동기 작업을 시뮬레이션하는 함수
function asyncOperation(callback) {
    console.log('Starting async operation...');
    setTimeout(() => {
      console.log('Async operation complete.');
      callback();
    }, 100);
  }
  // nextTick을 사용하여 콜백을 예약
  asyncOperation(() => {
    console.log('Callback from async operation.');
  });
  // nextTick을 사용하여 즉시 실행할 작업 예약(nexTick Queue공간이 Task Queue와 따로 존재하며 우선순위가 높음)
  process.nextTick(() => {
    console.log('This will run before the async operation callback.');
  });
  // setImmediate를 사용하여 즉시 실행할 작업 예약
  setImmediate(() => {
    console.log('This will run after the nextTick but before the async operation callback.');
  });
  console.log('This will run first.');



//특정 이벤트 사용
process.on('exit',(code)=>{
    console.log(`About to exit with code: ${code}`);
});
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    process.exit(1); // 비정상 종료
  });

// 예외를 발생시켜 uncaughtException 이벤트를 트리거합니다.
//throw new Error('This is an uncaught exception!');
