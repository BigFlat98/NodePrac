const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{//서버 만드는 코드.
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //응답 헤더 설정.
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>this is 8080 port</p>'); //응답 종료.
}).listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중입니다.');
});

http.createServer((req,res)=>{//서버 만드는 코드.
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>this is 8081 port</p>'); //응답 종료.
}).listen(8081, ()=>{
    console.log('8081번 포트에서 서버 대기 중입니다.');
});

