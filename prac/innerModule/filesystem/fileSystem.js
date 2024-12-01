const fs = require('fs');

//파일 쓰기
const context = "buenas tartes";
const context2 = "señorita!";
fs.promises.writeFile('./test.txt',context,'utf-8')
.then(()=>{
    console.log('write has been done');
})
.catch((err)=>{
    console.error(err);
})

async function writeFileM(path,context){
    try{
        await fs.promises.writeFile(path,context,'utf-8');
        console.log('write has been done');
    }catch(err){
        console.error(err);
    }
}
writeFileM('./test.txt',context2);

//파일 읽기
//동기 방식
// fs.readFile('./test.txt','utf-8',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// });

//비동기 방식
fs.promises.readFile('./test.txt','utf-8')
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.error(err);
})  

//동기 방식
try {
    fs.writeFileSync('./test.txt', 'buenos dias', 'utf-8');
    console.log('write has been done');
    const data = fs.readFileSync('./test.txt', 'utf-8');
    console.log(data);
} catch (err) {
    console.error(err);
}