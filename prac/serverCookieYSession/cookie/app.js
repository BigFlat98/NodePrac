const http = require('http');

http.createServer((req,res)=>{
    console.log(req.headers.cookie);
    res.writeHead(200,{'Set-Cookie':'mycookie=test'});
    res.end('<h1>Cookie</h1>');
}).listen(8080,()=>{
    console.log('8080번 포트에서 서버 실행중...');
});