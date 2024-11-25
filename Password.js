const crypto = require('crypto');

const hash = crypto.createHash('sha512').update('abcdefghijklmnop').digest('hex');
const hash2 = crypto.createHash('sha512').update('a').digest('hex'); //update에 있는 값을 createHash에서 정해준 해시 함수로 변환해서 16진수로 리턴.
// console.log(hash);
// console.log(hash2); 


//단방향 암호화 방식에 salt와 해시 함수를 반복해서 함호화.
crypto.pbkdf2('abscefghijklmnop', 'tttat', 100000, 64, 'sha512', (err, derivedKey)=>{ //첫번째 파라미터는 비밀번호, 두번째 salt값, 세번째 반복횟수, 네번째 키 길이, 다섯번째 해시 함수, 여섯번째 콜백 함수
    if (err) throw err;
    console.log(derivedKey.toString('hex'));//pbkdf2 함수 성공시 derivedKey에 결과 저장.
});


const algorith = 'aes-256-cbc'; //암호화 알고리즘 선택.
const key = crypto.randomBytes(32);//내 비밀번호를 암호화 하기 위한 키 생성. 알고리즘에 맞게 내가 암호화 하고싶은 값을 매핑된 다른 값으로 바꿔주는 값의 키
const iv = crypto.randomBytes(16);//뭔가 초기화 하는 값. 
console.log(key);
console.log(iv);
//key와 iv는 꼭 잘 간수해야함. 변수 key와 iv는 외부에서나 내 코드상으로 참조할 수 없도록 해야함. 지금은 실행할 때 마다 랜덤으로 어떤 값을 만들어서 예시를 만든거지만, 사용할 때는 내가 정해서 env에 저장하거나 하는 방식으로 사용.

//암호화
const cipher = crypto.createCipheriv(algorith, key, iv);
let encrypted = cipher.update('strongpassword', 'utf8', 'base64');
encrypted += cipher.final('base64');

//복호화
const decipher = crypto.createDecipheriv(algorith, key, iv);
let decrypted = decipher.update(encrypted, 'base64', 'utf8');
decrypted += decipher.final('utf8');
//여기 코드들은 그냥 고정이라고 생각하면 될 듯.

console.log('암호화 결과 :'+encrypted);
console.log('복호화 결과 :'+decrypted);
