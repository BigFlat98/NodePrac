const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {id : (2024112710), name : '홍길동'}; //data save space

http.createServer(async (req,res)=>{
    try{
        if(req.method === 'GET'){
            if(req.url === '/'){ //req.url -> 포트번호 뒤에있는 url이 저장돼있음.(search영역 뒤에 있는 pathname이 저장돼있음.)
                const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            }
            else if(req.url === '/about'){
                const data = await fs.readFile(path.join(__dirname, 'about.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            }
            else if(req.url === '/users'){ //get 방식의 users url은 조회 요청.
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            try{
                const data = await fs.readFile(path.join(__dirname, req.url)); //만약 url이 위에 있는 내용이 아닌 것으로 요청이 왔을 때, 들어온 url로 파일 경로를 만들고
                return res.end(data);//그 경로에 있는 파일을 전송함. 근데 지금은 없으니까 에러가 발생할 듯.
            }
            catch(err){
                console.error(err);
            }
        }
        else if(req.method === 'POST'){
            if(req.url === '/user'){
                let body = '';
                req.on('data',(data)=>{
                    body += data;
                })
                return req.on('end',()=>{
                    console.log('Post 본문(body):',body);
                    const { name } = JSON.parse(body); //내가 입력한 데이터를 name으로 갖는 객체를 만들고
                    const id = Date.now(); //객체의 id를 request받았을 때 시간으로 저장. key값으로 만들기 좋음. 
                    users[id] = name;
                    res.writeHead(201, {'Content-Type': 'text/plain; charset=utf-8'}); //text/plain -> 텍스트 형식으로 전송.
                    res.end('등록 완료');
                })
            }
        }
        else if(req.method === 'PUT'){
            if(req.url.startsWith('/user/')){// url 에서 ~/user/id/~ 형식으로 들어오면 startsWith -> 파라미터로 들어오는 값부터 시작하는 문자열이 있는지 확인.
                const key = req.url.split('/')[2]; //url을 스플릿 해서 id값을 키로 사용.
                let body = '';
                req.on('data',(data)=>{ //내가 요청할 때 입력한 데이터를 
                    body += data; //body에 넣고
                });
                return req.on('end',()=>{
                    console.log('PUT 본문(body):',body);
                    users[key] = JSON.parse(body).name;//url에서 뽑아낸 key의 테이터에 입력한 데이터로 name속성을 변경함. JSON.parse -> 문자열을 자바스크립트 객체로 변환.
                    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                    return res.end(JSON.stringify(users));
                })
            }
        }
        else if(req.method === 'DELETE'){
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        return res.end('Not Found');
    }catch(err){
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }   
}).listen(8080,()=>{
    console.log('8080번 포트에서 서버 실행중...');
});