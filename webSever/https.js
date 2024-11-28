const https = require('https'); //https 모듈은 http모듈과 따로 존재
const fs = require('fs');

https.createServer({
    cert: fs.readFileSync('도메인 인증서 경로'), 
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [fs.readFileSync('상위 안증서 경로')],},(req,res) => { //처음 서버가 실행될 때 인증은 한번만 실행됨. 굳이 비동기 처리를 할 필요가 없음. 그리고 인증 과정에서 인증 순서에 맞춰서 진행하는 경우가 있을 수 있기 때문에 종합적으로 동기적 처리가 유리함.
    
})