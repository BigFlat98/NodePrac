const express = require('express');
const path = require('path');
const { sequelize } = require('./models/index.js');
const indexRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');
const commentRouter = require('./routes/comment.js');

const app = express();
app.set('port',process.env.PORT || 3000);

//데이터베이스 연결 코드 필요
sequelize.sync({ force: false })
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((error)=>{
        console.log('데이터베이스 연결 실패');
        console.error(error);
    })


//middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//라우터 설정
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/comment',commentRouter);


//404 에러 처리 미들웨어
app.use((req,res,next)=>{
    res.status(404).send(`${req.method} ${req.url} 라우터 없음`);
});

//에러 처리 미들웨어
app.use((err,req,res,next)=>{
    console.log('에러 처리 미들웨어 실행');
    const statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).send(err.message);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});