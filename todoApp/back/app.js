require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const router = require('./routes/todo');
const imgUploadRouter = require('./routes/imgUpload');
const path = require('path');
const app = express();

//미들웨어
const corsOptions = {
    origin: 'http://localhost:8080', // Vue.js 개발 서버의 기본 포트
    credentials: true, // 필요한 경우 쿠키/인증 헤더 허용
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions)); //cors는 서로 다른 포트끼리 통신할 수 있도록 허용해주는 미들웨어(없으면 Vue에서 요청을 보낼 때 오류가 발생함.)
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

//라우터
app.use('/',router);
app.use('/image',imgUploadRouter);


app.listen(3000,()=>{
    console.log(`server is running on port 3000`);
});

