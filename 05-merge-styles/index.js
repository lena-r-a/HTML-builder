const path = require('path');
const fs = require('fs');

const myFilePath = path.join(__dirname,'project-dist','bundle.css');
const myDirPath = path.join(__dirname,'styles');

fs.readdir(myDirPath, {withFileTypes: true}, (err,data)=>{
  fs.promises.writeFile(myFilePath,'') ;
  
  for (let i=0;i<data.length;i++) { 
    if (data[i].isFile() & path.extname(data[i].name)=='.css') {
      let myReadStream = fs.createReadStream(path.join(myDirPath,data[i].name), 'utf-8');
      myReadStream.on('data', (text)=>{
        fs.appendFile(path.join(myFilePath), `${text}\n`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }}
  return 1;
});