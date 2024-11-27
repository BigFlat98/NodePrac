const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') => {//쿠키의 데이터를 우리가 사용할 수 있는 형태로 변경하는 코드. 
    cookie.split(';')//cookie의 정보들은 구분자가 ; 으로 돼있음 {'name=hh;id=ttsk;'} -> ['name=hh','id=ttsk'...]
    .map(v => v.split('=')) //[['name','hh'],['id','ttsk']...]
    .reduce((acc, [k,v]) =>{ //reduce() 배열의 각 요소에 대해 주어진 함수를 실행하고, 하나의 결과값을 반환하는 메서드.
        acc[k.trim()] = decodeURIComponent(v); //trim() 공백 제거 , decodeURIComponent() 한글 등 디코딩, 한글 같은게 들어오면 %%DE%TJ.. 이런식으로 나오기 때문에 디코딩 해줌.
        return acc;
    },{});
}

http.createServer(async (req,res) => {
    const cookies = parseCookies(req.headers.cookie);
    //console.log(req.url, cookies);
    if(req.url.startsWith('/login')){ //login요청이 들어오면 쿠키를 설정하는 코드.
        const url = new URL(req.url, 'http://localhost:8084'); //req.url은 url 전체가 들어오는게 아님 port 뒤에 붙는 부분만 들어옴.
        const name = url.searchParams.get('name');
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 3); //쿠키의 유효시간 설정. 
        res.writeHead(302,{ //302는 리다이렉트 코드.
            Location:'/',//로그인 후에 메인페이지로 리다이렉트 시킴.
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,//httpOnly는 자바스크립트에서 쿠키에 접근하지 못하게 하는 옵션. js로 쿠키에 접근하면 내부 정보 도난당할 수 있음.
        });
        res.end();
    }
    else if(cookies.name){//쿠키에 이름이 있으면 이미 로그인을 했다는 뜻.
        console.log(cookies.name);
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
        res.end(`<h1>${cookies.name}님 안녕하세요.</h1>`);
    }
    else{
        try{
            console.log('cookie.html 파일 읽기');
            // const data = await fs.promises.readFile(path.join(__dirname,'cookie.html'));
            // res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            // res.end(data);
            const data = await fs.readFile(path.join(__dirname, 'cookie.html'));
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

