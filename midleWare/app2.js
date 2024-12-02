//dotenv 호출은 그냥 무조건 최상위에 위치해야함.
require('dotenv').config(); //dotenv 패키지 호출

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const app = express();
const cookieSecret = process.env.COOKIE_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const storage = multer.diskStorage({ //업로드되는 파일의 저장 위치를 정해주는 코드. 보조기억장치, 메모리, 클라우드 드라이브 등등...
    //메모리에 넣고싶은 경우 muleter.memoryStorage() 사용.
    
    destination:(req,file,cb)=>{//파일 저장 경로 지정.
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{//파일명이 중복되는 경우 덮어씌어지는 것을 방지하기 위해 파일명을 지정해주는 코드.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname));//path.extname(file.originalname)는 파일 확장자를 가져오는 코드.
    },
}); 
//path.basename(file.originalname,path.extname(file.originalname))
//multer 자체는 미들웨어가 아님. 사용하기 위한 설정.
const upload = multer({storage:storage,limits:{fileSize: 1024 * 1024 * 5}}); //limits는 파일 사이즈를 제한하는 코드. 5mb 제한.

//single file upload
// app.post('/upload',upload.single('file'),(req,res)=>{ //한번 올릴 때 파일 1개만.
//     console.log(req.file);
//     res.send(`File Upload Complate: ${req.file.filename}`)
// });

app.post('/upload',upload.array('files',5),(req,res)=>{ //라우터에서 미들웨어 사용 방법.
    console.log(req.files);
    res.send(`
        <script>
            alert('File Upload Complete: ${req.files.length}');
            window.location.href = '/';
        </script>
    `);
});

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

app.use(express.json()); //json 데이터를 처리하는 미들웨어. json 데이터를 파싱해주는 작업을 함. 파싱을 미리 해줘야 
app.use(express.static(path.join(__dirname,'public')));// index.html이 기본이기 때문에 따로 적어주지 않아도 적용됨. 이렇게 적으면 루트에 접속했을 때 index.html을 응답함.
app.use(express.urlencoded({extended:true})); //입력받은 form 데이터를 파싱해주는 미들웨어. 결과는 object 형태로 저장됨. value에 배열이나 object로 들어오는 경우 파싱이 안되기 때문에 extended:true 옵션을 추가해야 함.


// app.post('/form',(req,res)=>{
//     console.log(req.body);//req.body는 실제 html에 있는 body태그 내용임.
//     res.send(`data : ${JSON.stringify(req.body)}`);
// });
// app.post('/send-json',(req,res)=>{
//     const {name,age,gender} = req.body; //보낸측에서 시리얼라이즈 된 데이터를 받아 객체형태로 저장된 값을 구조 분해 할당으로 저장.
//     console.log(req);
//     console.log(`Parsing Data: ${name}, ${age}, ${gender}`);
//     res.json({message:`${name}, ${age}, ${gender}`});//json 데이터를 응답함. (message라는 속성에 name, age, gender 값을 넣어서 전송.)
// });
// app.get('/',(req,res)=>{
//     console.log(req.cookies);
//     //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//이런식으로 바닐라 코드도 사용 가능.
//     //res.end('<h1>Hello World</h1>');
//     res.send('<h1>Hello World</h1>'); //send, sendFile 메서드에 writeHead과 같은 기능이 내포돼있음. 따라서 writeHead를 함께 사용하는건 불가능함.(응답을 2번하는 꼴)
// });

// app.use((err,req,res,next)=>{ //에러 처리 미들웨어, 4개의 파라미터를 반드시 다 적어줘야 함
//     res.status(err.status || 500).send(err.message); //에러 발생.
// })

// app.get('/',(req,res)=>{
//     res.cookie('myCookieKey','myCookieValue',{maxAge:60000,httpOnly:true,path:'/',signed:true}); 
//     res.cookie('myCookieKey2','this is my new cookie',{maxAge:1000 * 60 * 2,httpOnly:true,path:'/',signed:true}); 
//     res.send('<h1>쿠키 생성</h1>');
// });

// app.get('/cookie/get/',(req,res)=>{
//     console.log(req.signedCookies.myCookieKey);
//     const userCookie = req.signedCookies.myCookieKey;
//     if(userCookie){
//         console.log(req.cookies);
//         res.send(`<h1>${userCookie}</h1>`);
//         console.log(req.signedCookies);
//     }else{
//         res.send('<h1>쿠키 없음</h1>');
//     }
//     res.send('<h1>쿠키 조회</h1>');
// });

// app.get('/session',(req,res,next)=>{
//     if(req.query.skip){ //url에서 query부분에 session?skip=true 이런 식으로 오면 다음 라우터로 넘어감.
//         return next("route");
//     }
//     else{
//         req.session.user = {
//             name:'홍길동',
//             role:'admin',
//         };
//         res.send('<h1>세션 생성</h1>');
//     }
    
// });



// app.get('/session',(req,res,next)=>{
//     res.send('다른 라우터 동작')
// });

// app.get('/session/get',(req,res)=>{
//     if(req.session){
//         res.send(`<p>${req.session.user.name}</p>`);
//     }
//     else{
//         res.send('<h1>세션 없음</h1>');
//     }
// });

// app.get('/session/clear',(req,res)=>{
//     req.session.destroy((err)=>{ //세션 삭제(세션 쿠키는 유지)
//         if(err) throw err;
//     });
//     res.clearCookie('connect.sid'); //세션 쿠키만 삭제
//     res.send('<h1>세션 삭제</h1>');
// });

// //라우터의 순서는 매우 중요함. if-else if문과 동일하게 처리됨. 위에서 해당 라우터에 응답하면 아래 라우터는 실행되지 않음.
// app.get('/category/book/',(req,res)=>{
//     res.send('<h1>카테고리 책</h1>');
// });

// app.get('/category/food/',(req,res)=>{
//     res.send('<h1>카테고리 음식</h1>');
// });

// app.get('/category/*',(req,res)=>{//url 뒤에 오는 모든 문자열을 캐치하는 라우팅 방법. category/aaa/bbb/ccc 이것도 처리함.
//     res.send('<h1>카테고리 모든 요청 페이지</h1>');
// });

// app.get('/category',(req,res)=>{
//     res.send('<h1>카테고리</h1>');
// });

app.get('/*',(req,res)=>{//위에서 처리되지 않는 모든 요청은 내가 의도한 페이지로 응답.
    res.send('<h1>404 에러 페이지</h1>')
})





app.listen(app.get('PORT'),()=>{
    console.log(`${app.get('PORT')}번 포트에서 서버 실행중`);
});

