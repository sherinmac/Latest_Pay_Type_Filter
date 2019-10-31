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

const writeJson = (processFilePath) => {

    return new Promise((resolve, reject) => {
        try {
            console.log('HI');
            console.log(processFilePath);
            let res = [];
            var LineByLineReader = require('line-by-line'),
                lr = new LineByLineReader(processFilePath, { encoding: 'utf8', skipEmptyLines: false });

            lr.on('error', function (err) {
                reject(err);
            });

            lr.on('line', function (line) {
                console.log(line);
                res.push({ filename: line, selected: false, type: "content" });
            });

            lr.on('end', function () {
                resolve(res);
            });
        }
        catch (err) {
            console.log(err);
            reject(err);

        }
    });

}


(async () => {
    await writeJson('/home/sherin_ag/project_express/zip_file.csv').then(result => {
        console.log(result);
    });

})();