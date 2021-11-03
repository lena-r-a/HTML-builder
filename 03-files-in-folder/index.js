const path = require('path');
const fs = require('fs');


const myDirPath = path.join(__dirname, 'secret-folder');
const getStat = (f)=> {
  return new Promise((res,rej)=>{
    fs.stat(f, (err,data)=>{
      if(err) {rej(err);return;}
      res(data);
    });
  });
};
fs.readdir(myDirPath, {withFileTypes: true}, (err,data)=>{
  for (let i=0;i<data.length;i++) { 
    if (data[i].isFile()) {
      let fileName = data[i].name.split('.')[0];
      let fileExt = path.extname(data[i].name).split('.')[1];
     
      getStat(path.join(myDirPath,data[i].name)).then(stats=>console.log(`${fileName} - ${fileExt} - ${stats.size/1000}kb`));
      
    }}
  return 1;
}

);

