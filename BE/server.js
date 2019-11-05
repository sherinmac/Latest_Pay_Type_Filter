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

const csv = require('csv-parser');
const unzipper = require("unzipper");
const csvWriter = require('csv-write-stream')
const writer = csvWriter();

// _ = require('underscore');



var filetempPath = '/home/sherin_ag/project_express/tmp_unzip_file/';
const fileName = 'customer-pay-types.csv';
const writefileDirectory = '/home/sherin_ag/project_express/';


var unzipFile = (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            fs.createReadStream(filePath).pipe(unzipper.Extract({ path: filetempPath }))
                .on('close', function () {
                    console.log("Unzip completed");
                    resolve("success");
                });
        }
        catch (error) {
            reject(error);
        }
    });

};

const writeJson = (processFilePath) => {

    return new Promise((resolve, reject) => {
        try {
            // // console.log('HI');
            // // console.log(processFilePath);
            // let res = [];
            // var LineByLineReader = require('line-by-line'),
            //     lr = new LineByLineReader(processFilePath, { encoding: 'utf8', skipEmptyLines: false });

            // lr.on('error', function (err) {
            //     reject(err);
            // });

            // lr.on('line', function (line) {
            //     console.log(`${line[2]}:${line}`);
            //     res.push({ filename: line, selected: false, type: "content" });
            // });

            // lr.on('end', function () {
            //     resolve(res);
            // });

            let result = [];
            var res = [];
            fs.createReadStream(processFilePath)
                .pipe(csv())
                .on('data', (data) => {
                    let tmp_pay_type = data['Pay Type'].split(",");
                    for (let i = 0; i < tmp_pay_type.length; i++) {
                        result.push({ filename: tmp_pay_type[i].trim(), selected: false, type: "content" });
                    }

                })
                .on('end', () => {
                    // console.log(results);
                    // [
                    //   { NAME: 'Daffy Duck', AGE: '24' },
                    //   { NAME: 'Bugs Bunny', AGE: '22' }
                    // ]
                    res = _unique(result, 'filename');
                    console.log(res);
                    resolve(res);
                    // console.log(res);
                });




        }
        catch (err) {
            reject(err);

        }
    });

}


function _unique(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function clearDirectory(directory) {

    files = fs.readdirSync(directory);
    files.forEach(function (file) {
        fs.unlinkSync(path.join(directory, file), err => {
            if (err) throw err;
        });
    });
    fs.rmdirSync(directory);
    console.log('Directory cleared');
}



function removeDirForce(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
      catch(e) { return; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
          removeDirForce(filePath);
        }
      fs.rmdirSync(dirPath);
      console.log('Directory cleared');
}


app.get('/', function (req, res) {
    res.send('Hi i am,Default');
    //res.end('Hi i am,Default');
});


app.get('/filesTypes', function (req, res) {

    // console.log(req.body.filepath);
    // var filePath = req.body.filepath;
    var filePath = '/home/sherin_ag/project_workshop/start.zip';
    if (fs.existsSync(filePath)) {
        (async () => {
            await unzipFile(filePath);
            console.log("Reading  file started");
            await writeJson().then(result => {
                console.log(result);
                res.send(result);
            });
            console.log('End of File');
        })();
    }
    else {
        console.log('File not exist');
        res.end('File not exist');
    }

});


app.post('/filesTypes', function (req, res) {

    //console.log(req.body);
    console.log(req.body.filepath);
    var filePath = req.body.filepath;
    var tmparr = filePath.split("/");
    var tmpDirectory = tmparr[tmparr.length - 1].replace(".zip", "");
    var arr1 = [];
    var arr2 = [];
    console.log(tmpDirectory);
    // process.exit(0);
    // var filePath = '/home/sherin_ag/project_workshop/start.zip';
    if (fs.existsSync(filePath)) {
        console.log(filePath);
        (async () => {
            await unzipFile(filePath);
            console.log("Reading  file started");
            var processFilePath = filetempPath + tmpDirectory + '/processing-result/' + fileName;

            // console.log('processFilePath:'+processFilePath);
            // process.exit();
            var clearDirectoryPath = filetempPath + tmpDirectory;
            await writeJson(processFilePath).then(result => {
                // fs.unlinkSync(filetempPath+'/'+tmpDirectory);
                //fs.rmdirSync(filetempPath+'/'+tmpDirectory);
                removeDirForce(clearDirectoryPath);
                // process.exit();
                //result.shift();
                result[0].type = 'head';
                result.push({ filename: tmpDirectory, selected: false, type: "filename" });
                arr1 = result;
                //console.log(result);
                let checkExistDirectory = writefileDirectory + tmpDirectory + '.csv';

                if (fs.existsSync(checkExistDirectory)) {
                    console.log('File already exist');
                    console.log(checkExistDirectory);
                    // process.exit();
                    (async () => {
                        // console.log('Hi');
                        await writeJson(checkExistDirectory).then(result => {

                            console.log('************************************************');
                            console.log(result);
                            console.log('************************************************');
                            arr2 = result;
                            arr1.forEach((e1) => arr2.forEach((e2) => {
                                if (e1.filename === e2.filename) {
                                    e1.selected = true;
                                }
                            }
                            ));
                        });
                        // console.log('End 1');
                        // process.exit(0);
                        console.log(arr1);
                        console.log('End of File');
                        res.json(arr1);
                    })();
                }
                else {
                    console.log('File not exist');
                    console.log(arr1);
                    console.log('End of File');
                    res.json(arr1);
                }
                // res.json(result);
            });

        })();
    }
    else {
        console.log('File not exist');
        res.end('File not exist');
    }

});


app.post('/writefilesTypes', function (req, res) {

    // console.log(req);
    // process.exit(0);
    var jsonData = req.body;
    var writeString = '';
    var writeFileName;





    jsonData.forEach(function (data) {

        // if ((data.selected == true || data.type == 'head') && data.type != 'filename') {
        //     console.log(data.filename);
        //     writeString += data.filename + '\n';
        // }
        if (data.type == 'filename') {
            writeFileName = data.filename + '.csv';
        }
    });
    try {
        //fs.writeFileSync(writefileDirectory + writeFileName, writeString, { mode: 0o755 });
        let fl_name = writeFileName.replace('PROC-','');
        var writer = csvWriter({ headers: ["Type", "Pay Type"] })
        writer.pipe(fs.createWriteStream(writefileDirectory + fl_name))
        jsonData.forEach(function (data) {
            if ((data.selected == true || data.type == 'head') && data.type != 'filename') {
                writer.write(['world', data.filename]);
            }
        });
        writer.end();
        console.log("Finished");
        res.end("Writing finished");

    } catch (err) {
        // An error occurred
        console.error(err);
        res.end("Some error occured");
    }

});



var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});