const cluster = require('cluster');
const http = require('http');
const os = require('os');

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running now`);
    const numCpus = os.cpus().length;
    for(let i = 0; i<numCpus; i+=1){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`* ${worker.process.pid} died`);
        console.log(`code : ${code} / signal : ${signal}`);
        //cluster.fork();
    })
}
else{
    http.createServer((req,res)=>{
        res.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        res.end('<h1>cluster server</h1>');
        setTimeout(()=>{
            process.exit(1);
        },3000);
    }).listen(8080);
    console.log(`Worker ${process.pid} started`);
}