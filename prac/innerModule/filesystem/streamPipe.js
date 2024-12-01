const fs = require('fs');

const readStream = fs.createReadStream('./chunks.txt');
const writeStream = fs.createWriteStream('./chunksPipe.txt');

readStream.pipe(writeStream);