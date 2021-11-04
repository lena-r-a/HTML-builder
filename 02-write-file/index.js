const path = require('path');
const fs = require('fs');
const process =require('process');
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('------Input your text, please:------');

rl.on('line', function(line){
  fs.appendFile(path.join(__dirname,'text.txt'), `${line}\n`, (err) => {
    if (line=='exit') {
      rl.close();
    }
    if (err) {
      console.log(err);
    }
  });
  
}).on('close', ()=>{
  console.log('-----------------------Goodby!---------------------');

});