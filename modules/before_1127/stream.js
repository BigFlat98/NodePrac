const fs = require('fs');
const data = [];
const readStream = fs.createReadStream('./chunks.txt', {highWaterMark: 16}); //highWaterMark는 한번에 읽을 수 있는 데이터의 크기를 지정함.(16byte) 16바이트로 나눈 데이터를 청크라고 함.
readStream.on('data',(chunk)=>{ //on -> js의 이벤트 리스너라 생각하면 됨. 첫번째 파라미터는 정해져 있는 값들.
    data.push(chunk);
    console.log('data : ',chunk.toString(), chunk.length);
})

readStream.on('end',()=>{
    console.log('data : ',Buffer.concat(data).toString());//concat은 배열에 다른 배열을 추가하는 메서드.
})

readStream.on('error',(err)=>{
    console.log('error : ',err);
})


//스트림 방식은 어떤 데이터를 잘게 쪼개서 전달하는 방식.



const writeStream = fs.createWriteStream('./chunksWrite.txt'); //파일 생성은 이 단계에서 같이 됨.
writeStream.on('finish',()=>{
    console.log('writeStream : finish');
})

writeStream.write('Donde esta tu ');
writeStream.write('restaurante favorita?\n');
writeStream.write('señor');
writeStream.end();//end 메서드를 해줘야 write한 값이 저장됨.