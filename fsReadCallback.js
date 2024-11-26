const fs = require('fs');//fs는 기본적으로 콜백 함수 형식으로 사용함. 이말인 즉 fs는 비동기 방식으로 작동.

//fs는 모두 콜백 형식으로 지정돼있음.
fs.readFile('./sample.txt',(err,data)=>{ //경로에 지정된 파일을 읽고 실패하면 err저장. 성공하면 data저장.
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
})

//권장사항.
fs.promises.readFile('./sample.txt')
.then((data)=>{ //위 코드를 promise를 사용해서 작성.
    console.log(data);
    console.log(data.toString());
}).catch((err)=>{
    console.error(err);
})





