var express = require('express');
var app = express();

// CORS options
var cors = require('cors');
const corsOptions = {
    origin(origin, callback) {
        callback(null, true);
    },
    credentials: true,
};
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
};
app.use(cors(corsOptions));
app.use(allowCrossDomain);



var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var path = require('path');
var fs = require("fs");
const unzipper = require("unzipper");



// const clearFiles = (directory) => {

//     return new Promise((resolve, reject) => {
//         try {
//             console.log('Test 2');
//             // fs.readdir(directory, (err, files) => {
//             //     if (err) throw err;
//             //     for (const file of files) {
//             //         fs.unlinkSync(path.join(directory, file), err => {
//             //             if (err) throw err;
//             //         });
//             //         console.log('Deleted');
//             //     }
//             // });



//             files = fs.readdirSync(directory);

//             files.forEach(function(file) {
//                 fs.unlinkSync(path.join(directory, file), err => {
//                     if (err) throw err;
//                 });
//                 console.log('Deleted');
//             });




//            resolve("success");
           
//         }
//         catch (err) {
//             reject(err);
//         }
//     });

// }







// async function clearDirectory(directory) {

  
//     console.log('Test 1');
//     await clearFiles(directory).then(result=>{
//         fs.rmdir(directory);
//      });

   
// }


// var directory='/home/sherin_ag/project_express/tmp_unzip_file/zip_file';
// clearDirectory(directory);




var directory='/home/sherin_ag/project_express/tmp_unzip_file/zip_file';
files = fs.readdirSync(directory);

files.forEach(function(file) {
    fs.unlinkSync(path.join(directory, file), err => {
        if (err) throw err;
    });
    console.log('Deleted');
});

fs.rmdirSync(directory);