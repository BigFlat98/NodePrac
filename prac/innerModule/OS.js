const os = require('os');

// CPU 아키텍처 반환
console.log("CPU Architecture: " + os.arch());

// 시스템의 총 메모리 반환 (바이트 단위)
console.log("Total Memory: " + os.totalmem() / (1024 * 1024 * 1024) + " GB");

// 시스템의 사용 가능한 메모리 반환 (바이트 단위)
console.log("Free Memory: " + os.freemem() / (1024 * 1024 * 1024) + " GB");

// 운영 체제 플랫폼 반환
console.log("Platform: " + os.platform());

// 운영 체제 이름 반환
console.log("OS Type: " + os.type());

// 시스템의 가동 시간 반환 (초 단위)
console.log("Uptime: " + os.uptime() + " seconds");

// 네트워크 인터페이스 정보 반환
console.log("Network Interfaces: ", os.networkInterfaces());

// 현재 사용자 정보 반환
console.log("User Info: ", os.userInfo());

// 호스트 이름 반환
console.log("Hostname: ", os.hostname());

// 우영체제 버전 반환
console.log("OS Version: ", os.release());