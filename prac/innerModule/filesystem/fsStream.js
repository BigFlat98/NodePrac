const fs = require('fs');
const data = [];
const writeStream = fs.createWriteStream('./chunks.txt');
const readStream = fs.createReadStream('./chunks.txt',{highWaterMark:16});

writeStream.on('finish',()=>{
    console.log('writeStream : finish');
})
writeStream.write('Donde esta tu ');
writeStream.write('restaurante favorita?\n');
writeStream.write('señor');
writeStream.end();

readStream.on('data',(chunk)=>{
    data.push(chunk);
    console.log('data : ',chunk.toString(), chunk.length);
})
readStream.on('end',()=>{
    console.log('data : ',Buffer.concat(data).toString());
})
readStream.on('error',(err)=>{
    console.log('error : ',err);
})