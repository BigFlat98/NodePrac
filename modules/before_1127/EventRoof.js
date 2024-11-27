function thirdFunction(){
    console.log('세번째 함수')
};



function secondFuntion(){
    setTimeout(()=>{
        thirdFunction();
    }, 2000)
    console.log('두번째 함수')
};

//firstFunction();

function firstFunction(){
    setTimeout(()=>{
        console.log('첫번째 함수') 
    }, 1000)
    //secondFuntion(); //secondFunction이 쌓이기 전에 호출하면서 남은 작업이 없어서 firstFunction은 pop이 될 듯.
};

function longTask(){
    const start = Date.now(); //Date.now() -> 호출 스택에 들어가는 시점의 시간을 리턴함.
    while(Date.now()-start <3000){
        
    }
    console.log("longTask 작업 완료.");

};

console.log('start');
longTask();
firstFunction();
console.log('end');