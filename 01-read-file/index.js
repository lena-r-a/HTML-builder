const path = require('path');
const fs = require('fs');

const myFilePath = path.join(__dirname,'text.txt');

let myReadStream = fs.createReadStream(myFilePath, 'utf-8');

myReadStream.on('data', (text)=>{
  console.log(text);
});