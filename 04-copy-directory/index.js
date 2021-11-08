const path = require('path');
const fs = require('fs');

const copyDirPath = path.join(__dirname,'files-copy');
const myDirPath = path.join(__dirname,'files');

fs.promises.mkdir(copyDirPath, { recursive: true }).then(
  ()=>{
    fs.readdir(copyDirPath, {withFileTypes: true}, (error,files)=>{
      for (let i=0;i<files.length;i++) {
        fs.promises.unlink(path.join(copyDirPath,files[i].name));
      }
    });
  }
).then(
  ()=>{
    fs.readdir(myDirPath, {withFileTypes: true}, (err,data)=>{
      for (let i=0;i<data.length;i++) { 
        if (data[i].isFile()){
          let src = path.join(myDirPath,data[i].name);
          let dest = path.join(copyDirPath,data[i].name);
          fs.copyFile(src,dest, err=>{if (err) console.log(err);});
        }
      }});
  }).catch(err=>{console.log(err);});
