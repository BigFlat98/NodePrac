const fs = require('fs');

fs.watch('./test.txt', (eventType, filename) => {//경로에 있는 파일을 감시. 변경점이 있을 때마다 이벤트 발생(event type에는 변경 종류가 저장됨.)
    console.log(eventType, filename);
}); 

//중요 파일들은 감시가 필요한데 이 모듈로는 기능이 제한적임. 누가 변경했는지 확인 불가 등등..
//다른 감시 모듈이 있어서 그거 사용하면 됨.