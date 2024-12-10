require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routers/router_index.js');
const usersRouter = require('./routers/router_users.js');
const commentsRouter = require('./routers/router_comments.js');
const connect = require('./models/index.js');

const app = express();
app.set('port',process.env.PORT || 3000);
connect(); //몽고디비 연결


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
    optionsSuccessStatus: 200
}));



//routers
app.use('/',indexRouter);
app.use('/user',usersRouter);
app.use('/comment',commentsRouter);


//error handling
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || 500).json({error:err.message});
});


app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 포트에서 서버 실행`);
});