const url = require('url'); //url 내장 객체 import

const { URL } = url;
const newUrl = new URL('https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=%EC%9D%B4%EC%9E%AC%EC%9A%A9');
//url을 각 요소로 분리해서 obj형태로 저장.
console.log(newUrl);
console.log(newUrl.searchParams.getAll('ie')); //속성 ie의 값을 리턴.
