//process.env
console.log("1." + process.env.POST);
// 현재 경로
console.log("2." + process.cwd());
//process의 id
console.log("3." + process.pid);
//node 버전
console.log("4." + process.version);
//cpu 아키텍쳐
console.log("5." + process.arch);
//내 os
console.log("6." + process.platform);
console.log("process obj done\n");

const os =require('os');
//cpu archtecture
console.log("1. " + os.arch());
//my os
console.log("2. " + os.platform());
//
console.log("3. " + os.type());
//user host name
console.log("4. " + os.hostname());
//my cpu information
console.log("5. " + os.cpus());
//memory information(can use memory)
console.log("6. " + os.freemem() / (1000*1000*1000));
//memory information(total memory)
console.log("7. " + os.totalmem() / (1000*1000*1000));

const path =require('path')
//현재 경로에서 파일을 제외한 폴더 경로들을 보여줌.
console.log("1. " + path.dirname('/Users/daejunehwang/dj_vscode/Node/Modules.js'));
//경로상에 파일 확장자 반환.
console.log("2. " + path.extname('/Users/daejunehwang/dj_vscode/Node/Modules.js'));
//경호상의 파일명 반환.
console.log("3. " + path.basename('/Users/daejunehwang/dj_vscode/Node/Modules.js'));
//두번째 파라미터에는 제거할 확장자.넣어줄 수 있음.
console.log("4. " + path.basename('/Users/daejunehwang/dj_vscode/Node/Modules.js','.js'));
//들어오는 각 문자열을 조합해 하나의 path로 만들어줌.(상대경로 만들 때 사용하기 좋음.)
console.log("5. " + path.join('User','projects','func.js'));
//root폴더부터 path만들어줌.(절대경로 만들 때 사용하기 좋음.)
console.log("6. " + path.resolve('User','projects','func.js'));
