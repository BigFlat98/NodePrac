const express = require("express");
const path = require("path");
const morgan = require('morgan');
const fs = require('fs');


const app = express(); //express로 서버 생성.
const PORT = process.env.PORT || 3000; //포트번호 설정
//app.set('PORT', process.env.PORT || 3000); 포트 설정은 이렇게도 가능


//미들웨어는 모든 요청에 대해 실행되는 코드. 즉 보통 모든 라우터에 대해 공통적으로 수행돼야 하는 작업이 미들웨어로 수행됨.
//morgan 미들웨어 추가
const logStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
app.use(morgan('combined',{stream: logStream}));//미들웨어 사용시 use 메서드 사용. 보통 라우터 위에 작성.(요상하게 라우터 아래 적으면 결과가 안나옴.) / stream 옵션을 추가해서 사용자 요청 내용을 로그로 파일에 저장할 수 있음.


//이전에 서버 만들 때 했던것 처럼 method에 따라 요청을 나눔.
app.get('/',(req,res)=>{ //get요청 중 들어오는 라우터에 따른 리스폰스 작성.
    res.send('Hello Express');
});
app.get('/html',(req,res)=>{
    //res.sendFile('./index.html');//브라우저와 코드 내에서 구분자가 달라 타입 에러가 발생할 수 있음.
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
});

