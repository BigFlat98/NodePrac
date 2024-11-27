const fs = require('fs');

// console.log('start');
// fs.readFile('./sample.txt','utf-8',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log('data1 : ',data.toString());
// });
// console.log('end');

// fs.readFile('./sample.txt','utf-8',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log('data3 : ',data.toString());
// });

// fs.readFile('./sample.txt','utf-8',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log('data4 : ',data.toString());
// });

// fs.readFile('./sample.txt','utf-8',(err,data)=>{
//     if(err){
//         throw err;
//     }
//     console.log('data5 : ',data.toString());
// });
//비동기 함수는 순서대로 실행되지 않음.

// console.log('start2');

// (async()=>{
//     try{
//         const data1 = await fs.promises.readFile('./sample.txt','utf-8');
//         console.log('data1 : ',data1.toString());
//         const data2 = await fs.promises.readFile('./sample.txt','utf-8');
//         console.log('data2 : ',data2.toString());
//         const data3 = await fs.promises.readFile('./sample.txt','utf-8');
//         console.log('data3 : ',data3.toString());
//         const data4 = await fs.promises.readFile('./sample.txt','utf-8');
//         console.log('data4 : ',data4.toString());

//     }catch(err){
//         console.error(err);
//     }finally{
        
//     }   
// })();
// console.log('end2');


//fs모듈에 있는 함수중에 동기 함수도 있음.
const data1 = fs.readFileSync('./sample.txt','utf-8'); //동기 함수는 순서대로 실행됨.
      console.log('data1 : ',data1.toString());
const data2 = fs.readFileSync('./sample.txt','utf-8');
      console.log('data2 : ',data2.toString());
const data3 = fs.readFileSync('./sample.txt','utf-8');
      console.log('data3 : ',data3.toString());
const data4 = fs.readFileSync('./sample.txt','utf-8');
      console.log('data4 : ',data4.toString());


