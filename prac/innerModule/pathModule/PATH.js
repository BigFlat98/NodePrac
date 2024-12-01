const path = require('path');
const filePath = '/Users/user/Desktop/Node/prac/innerModule/pathModule/test.txt';

//경로에서 파일 이름 반환
const baseName = path.basename(filePath);
console.log(baseName);

//경로에서 디렉토리 이름 반환
const dirName = path.dirname(filePath);
console.log(dirName);

//경로에서 확장자 반환
const extName = path.extname(filePath);
console.log(extName);

//파라미터 경로로 합치기(상대경로 만들기 좋음)
const joinedPath = path.join('../','otherFolder/','test.txt');
console.log(joinedPath);

//파라미터를 합쳐 절대 경로로 생성
const resolvedPath = path.resolve('test.txt');
console.log(resolvedPath);


//이 둘은 많이 쓸 듯
//경로를 분석해 객체로 반환
const parsedPath = path.parse(filePath);
console.log(parsedPath);

//경로 객체를 문자열로 반환
const formattedPath = path.format(parsedPath);
console.log(formattedPath);
