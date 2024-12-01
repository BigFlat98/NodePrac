const crypto = require('crypto');

const hash = crypto.createHash('sha512').update('암호화할 문자열').digest('hex');
console.log("단방향 암호화(hash) : ",hash);

crypto.pbkdf2('비밀번호','salt',10000,63,'sha512',(err,derivedKey)=>{// 비동기
    if (err) throw err;
    console.log("단방향 암호화(hash+pbkdf2) : ",derivedKey.toString('hex'));
});

const algorithem = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

console.log("키 : ",key);
console.log("iv : ",iv);

const cipher = crypto.createCipheriv(algorithem,key,iv);
let encrypted = cipher.update('암호화할 문자열','utf8','base64'); //update는 암호화할 문자열을 암호화 할 수 있는 형태로 변환.
encrypted += cipher.final('base64'); //암호화 완료.
console.log("양방향 암호화 : ",encrypted);

const decipher = crypto.createDecipheriv(algorithem,key,iv);
let decrypted = decipher.update(encrypted,'base64','utf8');
decrypted += decipher.final('utf8');
console.log("양방향 복호화 : ",decrypted);

console.log("양방향 암호화 결과:",encrypted);
console.log("양방향 복호화 결과:",decrypted);