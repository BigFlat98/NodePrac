const cluster = require('cluster');
const http = require('http');
const os = require('os');

if(cluster.isMaster){
    console.log(`마스터 프로세스 ${process.pid} 가동`);
    const numCpus = os.cpus().length;
    for(let i = 0; i<numCpus; i++){
        cluster.fork(); // 마스터 클러스터가 서브 클러스트를 생성
    }
    cluster.on('exit',(worker, code , signal)=>{
        console.log(`* ${worker.process.pid}번 워커 종료`);
        console.log(`code : ${code} / signal : ${signal}`);
        //cluster.fork(); // 종료된 워커를 자동으로 재생성, 이 코드가 있다면 클러스터가 의도치않게 종료되도 새로운 클러스터가 생성돼서 서버가 꺼지지 않음.
    });

}
else{
    http.createServer((req,res)=>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<h1>Cluster Server</h1>');
        setTimeout(()=>{
            process.exit(1); //리퀘스트를 받을 때마다 각 코어에 할당된 프로세스 종료 -> 해당 서버 닫힘.
        },3000);
    }).listen(8080);
    console.log(`${process.pid}번 워커 서버 가동`);
}

//서버를 열면 메인 클러스터가 내가 갖고있는 코어 수만큼 서브 클러스터를 생성함.
//메인 클러스터가 아닌 서브 클러스터들은 각각 서버를 열고 있음.
//리퀘스트를 받으면 프로세스가 종료되면서 클러스트도 종료됨.
//하지만 다른 클러스터를 통해 서버를 유지.