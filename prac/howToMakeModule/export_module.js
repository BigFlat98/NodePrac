const ClassForExport = class{
    variable = 'variable';
    variable2 = 20;
    constructor(){
        console.log('ClassForExport constructor');
    }
    method1(){
        console.log('run method1');
    }
};

function functionForExport(a,b){
    return a+b;
};

let variableForExport = 'variable';

module.exports = {
    ClassForExport,
    functionForExport,
    variableForExport
}