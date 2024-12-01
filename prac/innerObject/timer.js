setTimeout(()=>{
    console.log('1초 후 실행');
},1000);

const interval = setInterval(()=>{
    console.log('1초마다 실행');
},1000);

setTimeout(()=>{
    clearInterval(interval);
},5000);

setImmediate(()=>{
    console.log('바로 실행');
});

const timeout = setTimeout(()=>{
    console.log('1분 후 실행');
},1000 * 60 );

clearTimeout(timeout);
//clearImmediate();

