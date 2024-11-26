const fs = require('fs').promises; //이렇게 하면 fs를 사용할 때는 promise형식을 항상 사용할 수 있음.(즉 fs는 promise를 지원함.)
const context = "buenas tartes";
const context2 = "señorina!";

//promise style
fs.writeFile('./sample.txt',context,'utf-8')
.then(()=>{
    console.log('write has been done');
}).catch((err)=>{
    console.error(err);
})

//async style
async function writeFileM(path,context){//async를 붙였다고 writeFile가 비동기 함수가 되는건 아님.
    try{
        await fs.writeFile(path,context,'utf-8');//비동기 함수는 내부에 있음. await은 뒤에 있는 코드들을 비동기 함수가 완료되기 전까지 기다리도록 하는? 아래 코드가 콜백함수처럼 보이도록 하는 기능.(과정이 거의 똑같음.)
        console.log('write has been done');
    }catch(err){
        console.error(err);
    }
}

writeFileM('./sample.txt',context2);

