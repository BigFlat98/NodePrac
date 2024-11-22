const varNumber = require('./var');
function checkedOdd(num){
    if(num%2){
        return varNumber.odd
    }
    else{
        return varNumber.even
    }
}

module.exports={
    checkedOdd,
}