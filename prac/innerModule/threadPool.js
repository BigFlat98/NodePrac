const crypto = require('crypto');
const os = require('os');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('1:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('2:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('3:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('4:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('5:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('6:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('7:',Date.now()-start);
})

crypto.pbkdf2(pass,salt,1000000,128,'sha512',()=>{
    console.log('8:',Date.now()-start);
})


//노드는 기본적으로 4개의 스레드를 사용함.
//if you want to change the number of threads which are used on task Queue, 
//you can set the environment variable UV_THREADPOOL_SIZE=N
console.log(os.cpus().length);

