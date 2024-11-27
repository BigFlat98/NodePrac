const dns = require('dns');
const { error } = require('console')

dns.lookup('www.naver.com', (err,address)=>{
    if (err) throw err;
    console.log(address);
});  // domain 와 매칭되는 ip주소 리턴.

dns.reverse('223.130.192.248', (err,hostnames)=>{
    if (err) throw err;
    console.log(hostnames);
}); //

