const { URL } = require('url');

const urlString = 'https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=%EC%9D%B4%EC%9E%AC%EC%9A%A9';
const myUrl = new URL(urlString);

console.log(myUrl);

myUrl.pathname = '/news';
myUrl.searchParams.append('query', '영화');

console.log(myUrl.toString());
