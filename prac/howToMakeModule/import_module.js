//const {ClassForExport, functionForExport, variableForExport} = require('./export_module'); //구조 분해 할당 방식으로 가져
const exportV = require('./export_module');

console.log(exportV);
console.log(exportV.variableForExport);
console.log(exportV.functionForExport(1,2));
const a = new exportV.ClassForExport();
a.method1();