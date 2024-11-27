const buffer = Buffer.from('Hello world');

console.log(buffer); //buffer의 내용 출력
console.log(buffer.length); //buffer의 길이 출력
console.log(buffer.toString()); //buffer를 문자열로 변환.

const arr = [Buffer.from('Yo quiero '),Buffer.from('comer un carne '),Buffer.from('en restaurante mi favorito'),]; //Buffer.from 함수는 문자열을 buffer로 변환함.
const bufferEs = Buffer.concat(arr); //buffer를 합침.
console.log(bufferEs.toString()); //buffer를 문자열로 변환.

//버퍼는 데이터 전체를 담아서 전달.
//버터는 작은 단위의 파일을 처리할 때 유용함.
//어떤 문자열을 이진수로 변환해서 처리할 때 유용함.
//버퍼는 데이터를 메모리에 저장하는 임시 공간임.

const buffer3 = Buffer.alloc(10); //10바이트의 버퍼를 할당함.
console.log(buffer3); //버퍼의 내용 출력
console.log(buffer3.length); //버퍼의 길이 출력
console.log(buffer3.toString()); //버퍼를 문자열로 변환.    