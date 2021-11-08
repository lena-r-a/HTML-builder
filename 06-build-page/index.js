const path = require('path');
const fs = require('fs');

const myHtmlPath = path.join(__dirname,'project-dist','index.html');
const myFilePath = path.join(__dirname,'template.html');
const myAssetsPath = path.join(__dirname,'assets');
const copyAssetsDirPath = path.join(__dirname,'project-dist','assets');

const myCssFilePath = path.join(__dirname,'project-dist','style.css');
const myDirPath = path.join(__dirname,'styles');

// let objHtml = {
//   header:'',
//   articles:'',
//   footer:''
// };
let myReadStream = fs.createReadStream(myFilePath, 'utf-8');
// let myReadStreamHeader = fs.createReadStream(path.join(__dirname,'components','header.html'), 'utf-8');
// let myReadStreamArticles = fs.createReadStream(path.join(__dirname,'components','articles.html'), 'utf-8');
// let myReadStreamFooter = fs.createReadStream(path.join(__dirname,'components','footer.html'), 'utf-8');

function copyDirectory(dirPath,copyDirPath) {
  fs.promises.mkdir(copyDirPath, { recursive: true }).then(
    ()=>{
      fs.readdir(copyDirPath, {withFileTypes: true}, (error,files)=>{
        for (let i=0;i<files.length;i++) {
          if (files[i].isFile())
          {fs.unlink(path.join(copyDirPath,files[i].name), (err)=>{
            if (err) {console.log(err);}
          });}
        }
      });
    }
  ).then(
    ()=>{
      fs.readdir(dirPath, {withFileTypes: true}, (err,data)=>{
        for (let i=0;i<data.length;i++) { 
          let src = path.join(dirPath,data[i].name);
          let dest = path.join(copyDirPath,data[i].name);
          let newDirPath= path.join(dirPath,data[i].name);
          if (data[i].isFile()){
            fs.copyFile(src,dest, err=>{console.log(err);});
          } else {
            copyDirectory(newDirPath,dest);
          }
        }});
    }).catch(err=>{console.log(err);});
}


fs.promises.mkdir(path.join(__dirname,'project-dist'), { recursive: true }).then(()=>{

  fs.readdir(path.join(__dirname,'components'),{withFileTypes: true},(err,files)=>{
    myReadStream.on('data', (text)=>{
      for (let i=0;i<files.length;i++) {
        let fileName = files[i].name.split('.')[0];
        fs.readFile(path.join(__dirname,'components',files[i].name),'utf-8', (error,data)=>{
          text = text.replace(`{{${fileName}}}`,data);
          // console.log(text);
          fs.writeFile(myHtmlPath, text, function (err) {
            if (err) return console.log(err);
          });
        });
        
      }
     
    });
    
  });

  // myReadStreamHeader.on('data', (headertext)=>{
  //   objHtml.header=headertext;
  // });
  // myReadStreamArticles.on ('data', (articlestext)=>{
  //   objHtml.articles=articlestext;
  // });
  // myReadStreamFooter.on ('data', (footertext)=>{
  //   objHtml.footer=footertext;
  //   myReadStream.on('data', (text)=>{
  //     text = text.replace('{{header}}', objHtml.header);
  //     text = text.replace('{{articles}}', objHtml.articles);
  //     text = text.replace('{{footer}}', objHtml.footer);
  //     fs.writeFile(myHtmlPath, text, function (err) {
  //       if (err) return console.log(err);
  //     });
  //   });
    
  // });
  
  
  
}).catch(err => console.log(err)) ;

fs.readdir(myDirPath, {withFileTypes: true}, (err,data)=>{
  fs.promises.writeFile(myCssFilePath,'') ;
  
  for (let i=0;i<data.length;i++) { 
    if (data[i].isFile() & path.extname(data[i].name)=='.css') {
      let myReadStream = fs.createReadStream(path.join(myDirPath,data[i].name), 'utf-8');
      myReadStream.on('data', (text)=>{
        fs.appendFile(path.join(myCssFilePath), `${text}\n`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }}
  return 1;
});

copyDirectory(myAssetsPath, copyAssetsDirPath);