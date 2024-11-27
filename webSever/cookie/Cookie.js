const http = require('http');

http.createServer((req,res)=>{
    console.log(req.headers.cookie);//쿠키 확인
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'}); //쿠키 설정. 확인 해 보면, key에 mycookie / value에 test가 있음.
    res.end('<h1>Cookie</h1>');
}).listen(8080,()=>{
    console.log('8080번 포트에서 서버 실행중...');
});