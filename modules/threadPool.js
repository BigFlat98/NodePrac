const crypto = require('crypto');
const os = require('os');

//스레드 사용 예제.
const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('8:', Date.now() - start);
});

//결과를 보면 4개가 먼저 나오고 나머지 4개가 뒤에 나옴. 
//백그라운드에서 처리하는 연산들도 당연히 스레드를 사용하는데 노드는 이 환경 변수를 지정하지 않으면 기본적으로 4개가 기본임. 그래서 이런 결과가 나옴.
//실행시키려는 프로세스 앞에 UV_THREADPOOL_SIZE=N 이라고 써주면 사용하는 스레드 개수를 지정할 수 있음.


console.log(os.cpus().length);