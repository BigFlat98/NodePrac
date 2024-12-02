//dotenv 호출은 그냥 무조건 최상위에 위치해야함.
require('dotenv').config(); //dotenv 패키지 호출

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const indexRouter = require('./route/index');
const userRouter = require('./route/user');

const app = express();
app.set('PORT', process.env.PORT || 3000); //.env에 PORT라는 키값이 있으면 그 값을 사용하고, 없으면 3000을 사용.


app.use(morgan('dev')); //보통 모듈로 가져다 쓰는 미들웨어는 next()가 포함돼있음. 때문에 써줄 필요가 없음. 하지만 일부는 포함돼있지 않을 수 있기 때문에 그런 상황에서는 직접 사용해 줘야함.



//라우터로 가는 코드
//1. 기본 url
app.use('/',indexRouter);


//2. /user/ 다음에 나오는 url
app.use('/user',userRouter);

//error 처리 라우터
app.use((req,res,next)=>{
    res.status(404).send('<h1>404 에러 페이지</h1>');
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send(err.message);
});



app.listen(app.get('PORT'),()=>{
    console.log(`${app.get('PORT')}번 포트에서 서버 실행중`);
});

