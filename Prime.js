const min = 2;
const max = 10000000;
const primes = [];
let count = 0;

function findPrime(start, range){
    let isPrime = true;
    const end = start + range;
    for (let i = start; i<end; i++){
        for (let j = min; j<Math.sqrt(end); j++){
            if (i !== j && i % j === 0){
                isPrime = false;
                break;
            }
        }
        if (isPrime){
            primes.push(i);
            count++;
        }
        isPrime = true;
    }
}

console.time('prime');
findPrime(min, max);
console.timeEnd('prime');
console.log(primes.length);
console.log(count);
