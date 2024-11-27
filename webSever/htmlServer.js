const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req,res)=>{
    try{
        const data = await fs.readFile('./index.html');
        console.log(data);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
        res.end();
    }
}).listen(8080,()=>{
    console.log('8080번 포트에서 서버 대기 중입니다.');
});

