const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') => //쿠키의 데이터를 우리가 사용할 수 있는 형태로 변경하는 코드. 
    cookie.split(';')   //cookie의 정보들은 구분자가 ; 으로 돼있음 {'name=hh;id=ttsk;'} -> ['name=hh','id=ttsk'...]
    .map(v => v.split('=')) //[['name','hh'],['id','ttsk']...]
    .reduce((acc, [k,v]) =>{ //reduce() 배열의 각 요소에 대해 주어진 함수를 실행하고, 하나의 결과값을 반환하는 메서드.
        acc[k.trim()] = decodeURIComponent(v); //trim() 공백 제거 , decodeURIComponent() 한글 등 디코딩, 한글 같은게 들어오면 %%DE%TJ.. 이런식으로 나오기 때문에 디코딩 해줌.
        return acc;
    },{});

//{ cookie.split().map().reduce() } -> 이렇게 작성하면 에로우 함수의 리턴이 없음. 그래서 이전에 undefined가 들어감.
//{ return cookie.split().map().reduce() } -> 이렇게 작성해야 파싱된 값이 리턴됨.

const sessionServer = { //세션을 메모리에 저장. 서버 꺼지면 휘발됨. createServer밑에 있으면 session이 있어도 새로 생성이 되버림. createServer 위에 있어야 함.
    // uniqueKey: {},
    // uniqueKey2: {},
    // uniqueKey3: {},
    // uniqueKey4: {},
    //... 이렇게 추가될 예정.
};

http.createServer(async (req,res) => {
    const cookiee = parseCookies(req.headers.cookie);
    //console.log(req.url, cookies);
    if(req.url.startsWith('/login')){ //login요청이 들어오면 쿠키를 설정하는 코드.
        const url = new URL(req.url, 'http://localhost:8084'); //req.url은 url 전체가 들어오는게 아님 port 뒤에 붙는 부분만 들어옴.
        const name = url.searchParams.get('name'); //cookie.html에 있는 form 태그를 실행시키면 input태그에 입력한 값이 value로 들어가고 키는 name에 적어준 name으로 url의 search부분에 들어감. 그 값을 searchParams.get()으로 가져옴.
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 3); //쿠키의 유효시간 설정. 
        const uniqueKey = Date.now();
        sessionServer[uniqueKey] = {
            name, 
            expires
        };
        res.writeHead(302,{ //302는 리다이렉트 코드.
            Location:'/',//로그인 후에 메인페이지로 리다이렉트 시킴.
            'Set-Cookie':`session=${uniqueKey}; name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,//httpOnly는 자바스크립트에서 쿠키에 접근하지 못하게 하는 옵션. js로 쿠키에 접근하면 내부 정보 도난당할 수 있음. path는 쿠키가 적용되는 경로. 보통 루트에 넣어 놓음. 
        });
        res.end();
    }
    else if(cookiee.session && sessionServer[cookiee.session].expires > new Date()){ //쿠키에 세션이 있고, 세션의 유효시간이 남아 있는 경우의 리스폰스
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
        res.end(`<h1>${sessionServer[cookiee.session].name}님 안녕하세요.</h1>`); //
    }
    else{
        try{
            console.log('cookie.html 파일 읽기');
            // const data = await fs.promises.readFile(path.join(__dirname,'cookie.html'));
            // res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            // res.end(data);
            const data = await fs.readFile(path.join(__dirname, 'session.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
        catch(err){
            res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }

}).listen(8084, ()=>{
    console.log('8084번 포트에서 서버 대기 중입니다.');
});

