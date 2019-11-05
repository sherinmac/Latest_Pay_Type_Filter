var path = require('path');
var fs = require("fs");
var  filetempPath = '/home/sherin_ag/project_express/tmp_unzip_file/';
// const filePath  =  "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883-20191023020002.zip";

        // const filePath =  "/home/sherin_ag/project_express/customer-pay-type.zip";
        const filePath =  "/home/sherin_ag/project_express/zip_file.zip";
        
        // const payload = { filepath: "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883-20191023020002.zip" };
        // const payload = { filepath: "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883-20191023020002.zip" };
        //const filePath = "/home/sherin_ag/project_express/PROC-LHMAM-NissanCorona-CA-INITIAL-3PA57883.zip";

const unzipper = require("unzipper");
// fs.createReadStream(filePath).pipe(unzipper.Extract({ path: filetempPath }))
// .on('close', function () {
//     console.log("Unzip completed");
//     process.exit();
//     resolve("success");
// });









fs.createReadStream('/home/sherin_ag/project_express/customerpaytypecaINITIAL3PA5788320191023020002.zip')
  .pipe(unzipper.Parse())
  .on('entry', function (entry) {
    const fileName = entry.path;
    console.log("Fname::", fileName);
    const type = entry.type; // 'Directory' or 'File'
    const size = entry.vars.uncompressedSize; // There is also compressedSize;
    if (fileName === "customer-pay-types.csv") {
      entry.pipe(fs.createWriteStream('/home/sherin_ag/project_express/tmp_unzip_file1/'));
    } else {
      entry.autodrain();
    }
  });


// fs.createReadStream('/home/sherin_ag/project_express/customerpaytypecaINITIAL3PA5788320191023020002.zip')
//   .pipe(unzipper.Extract({ path: '/home/sherin_ag/project_express/tmp_unzip_file1/' }));



// fs.createReadStream(filePath)
//   .pipe(unzipper.Parse())
//   .pipe(etl.map(async entry => {
//     if (entry.path == "processing-result/customer-pay-types.csv") {
//       const content = await entry.buffer();
//       await fs.writeFile(filetempPath,content);
//     }
//     else {
//       entry.autodrain();
//     }
//   }));


//   fs.createReadStream(filePath)
//   .pipe(unzipper.Parse())
//   .pipe(stream.Transform({
//     objectMode: true,
//     transform: function(entry,e,cb) {
//       const fileName = entry.path;
//       const type = entry.type; // 'Directory' or 'File'
//       const size = entry.vars.uncompressedSize; // There is also compressedSize;
//       if (fileName === "processing-result/customer-pay-types.csv") {
//         entry.pipe(fs.createWriteStream(filetempPath))
//           .on('finish',cb);
//       } else {
//         entry.autodrain();
//         cb();
//       }
//     }
//   }
//   ));