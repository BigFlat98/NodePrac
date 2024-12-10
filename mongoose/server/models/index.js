const mongoose = require('mongoose');//mongoose 모듈 불러오기

const connect = () =>{
  if(process.env.NODE_ENV !== 'production'){ //개발 단계라면 디버그 모드 켜기, 배포 단계라면 디버그 모드 끄기 
    mongoose.set('debug',true); //디버그 모드는 MongoDB 쿼리를 로깅하여 개발중에 확인 가능하도록 하는 기능.
  }
  mongoose.connect('mongodb://root:1234@localhost:27017/admin',{ //몽고디비 연결 mongodb://"접속 아이디":"접속 비밀번호"@"접속 주소":"접속 포트"/"데이터베이스 이름"
    dbName:'nodejs', //데이터베이스 이름
    useNewUrlParser:true, //URL 파서 옵션 -> true설정을 안하면 최신 mongoDB에서 에러 발생
  }).then(()=>{
    console.log('몽고디비 연결 성공');
  }).catch((err)=>{
    console.log('몽고디비 연결 실패');
    console.error("몽고디비 연결 실패",err);
  });
};

mongoose.connection.on('error',(error)=>{ //몽고디비 연결 에러 발생 시 콘솔에 출력
  console.error('몽고디비 연결 에러',error);
});
mongoose.connection.on('disconnected',()=>{ //몽고디비 연결 끊김 시 콘솔에 출력
  console.error('몽고디비 연결 끊김 재연결 시도');
  connect(); //connect 함수 재실행
});

module.exports = connect; //실행은 app.js에서 함.