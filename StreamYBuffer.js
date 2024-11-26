const fs = require('fs');

const readStream = fs.createReadStream('./chunks.txt');
const writeStream = fs.createWriteStream('./chunksWrite.txt');

readStream.pipe(writeStream); //파일을 전송할 때 유용. 그냥 복사랑 똑같다고 생각하면 됨. 복사는 copy라는 메서드가 따로 있음.    
                              //스트림 방식으로 읽은 값을 바로 파일에 쓰고 저장.