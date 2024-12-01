//dotenv 호출은 그냥 무조건 최상위에 위치해야함.
require('dotenv').config(); //dotenv 패키지 호출

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');



const app = express();
const cookieSecret = process.env.COOKIE_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
app.set('PORT', process.env.PORT || 3000); //.env에 PORT라는 키값이 있으면 그 값을 사용하고, 없으면 3000을 사용.


//원래 미들웨어는 next()가 없으면 다음 미들웨어로 넘어가지 않고 하나 실행 후 거기서 멈춤, 라우터로 가지도 못함.
// app.use((req,res,next)=>{//원래 미들웨어의 파라미터는 next포함 3개
//     console.log('my midleware');
//     const error = new Error('에러 발생'); //에러 객체 생성
//     error.status = 503; //에러 상태 코드 지정
//     next(error); //next()를 사용하면 다음 미들웨어로 넘어감.  
// });

app.use(morgan('dev')); //보통 모듈로 가져다 쓰는 미들웨어는 next()가 포함돼있음. 때문에 써줄 필요가 없음. 하지만 일부는 포함돼있지 않을 수 있기 때문에 그런 상황에서는 직접 사용해 줘야함.
app.use(cookieParser(cookieSecret));
app.use(session({
    secret:sessionSecret, //세션의 키값을 만들 때 사용되는 salt느낌.
    resave:false, //세션 데이터가 변경되지 않아도 세션을 다시 저장할지 여부.
    saveUninitialized:true, //세션 데이터가 초기화되지 않아도 세션을 저장할지 여부.
    cookie:{
        maxAge:1000 * 60 * 2,
        httpOnly:true,
    }
}));
app.use(express.static(path.join(__dirname,'public','imgs'))); //static은 이미지나 html, css, js 파일 등을 제공하는 미들웨어. 루트 경로에 파일 이름을 붙여서 요청하면 해당 파일로 응답할 수 있음.
                                                        //장점은 url로 파일을 제공하면 경로 확인이 불가능함.

// app.get('/',(req,res)=>{
//     console.log(req.cookies);
//     //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//이런식으로 바닐라 코드도 사용 가능.
//     //res.end('<h1>Hello World</h1>');
//     res.send('<h1>Hello World</h1>'); //send, sendFile 메서드에 writeHead과 같은 기능이 내포돼있음. 따라서 writeHead를 함께 사용하는건 불가능함.(응답을 2번하는 꼴)
// });

// app.use((err,req,res,next)=>{ //에러 처리 미들웨어, 4개의 파라미터를 반드시 다 적어줘야 함
//     res.status(err.status || 500).send(err.message); //에러 발생.
// })

app.get('/',(req,res)=>{
    res.cookie('myCookieKey','myCookieValue',{maxAge:60000,httpOnly:true,path:'/',signed:true}); 
    res.cookie('myCookieKey2','this is my new cookie',{maxAge:1000 * 60 * 2,httpOnly:true,path:'/',signed:true}); 
    res.send('<h1>쿠키 생성</h1>');
});

app.get('/cookie/get/',(req,res)=>{
    console.log(req.signedCookies.myCookieKey);
    const userCookie = req.signedCookies.myCookieKey;
    if(userCookie){
        console.log(req.cookies);
        res.send(`<h1>${userCookie}</h1>`);
        console.log(req.signedCookies);
    }else{
        res.send('<h1>쿠키 없음</h1>');
    }
    res.send('<h1>쿠키 조회</h1>');
});

app.get('/session',(req,res,next)=>{
    if(req.query.skip){ //url에서 query부분에 session?skip=true 이런 식으로 오면 다음 라우터로 넘어감.
        return next("route");
    }
    else{
        req.session.user = {
            name:'홍길동',
            role:'admin',
        };
        res.send('<h1>세션 생성</h1>');
    }
    
});

app.get('/session',(req,res,next)=>{
    res.send('다른 라우터 동작')
});

app.get('/session/get',(req,res)=>{
    if(req.session){
        res.send(`<p>${req.session.user.name}</p>`);
    }
    else{
        res.send('<h1>세션 없음</h1>');
    }
});

app.get('/session/clear',(req,res)=>{
    req.session.destroy((err)=>{ //세션 삭제(세션 쿠키는 유지)
        if(err) throw err;
    });
    res.clearCookie('connect.sid'); //세션 쿠키만 삭제
    res.send('<h1>세션 삭제</h1>');
});

//라우터의 순서는 매우 중요함. if-else if문과 동일하게 처리됨. 위에서 해당 라우터에 응답하면 아래 라우터는 실행되지 않음.
app.get('/category/book/',(req,res)=>{
    res.send('<h1>카테고리 책</h1>');
});

app.get('/category/food/',(req,res)=>{
    res.send('<h1>카테고리 음식</h1>');
});

app.get('/category/*',(req,res)=>{//url 뒤에 오는 모든 문자열을 캐치하는 라우팅 방법. category/aaa/bbb/ccc 이것도 처리함.
    res.send('<h1>카테고리 모든 요청 페이지</h1>');
});

app.get('/category',(req,res)=>{
    res.send('<h1>카테고리</h1>');
});

app.get('/*',(req,res)=>{//위에서 처리되지 않는 모든 요청은 내가 의도한 페이지로 응답.
    res.send('<h1>404 에러 페이지</h1>')
})





app.listen(app.get('PORT'),()=>{
    console.log(`${app.get('PORT')}번 포트에서 서버 실행중`);
});

