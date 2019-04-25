const path = require('path');



const scriptName = path.basename(__filename, '.js');
const baseName = path.basename(__filename);

console.log(`scriptName=${scriptName}`)
console.log(`__filename =${__filename}`)
console.log(`baseName =${baseName}`)

console.log(process.env.PATH);
console.log(process.env.PATH.split(path.delimiter))