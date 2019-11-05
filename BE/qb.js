const csv = require('csv-parser');
const fs = require('fs')
const results = [];
var result = [];
var res = [];

// var csvWriter = require('csv-write-stream')
// var writer = csvWriter();



// // fs.createReadStream('/home/sherin_ag/project_express/customer-pay-type/customer-pay-types.csv')
// //     .pipe(csv())
// //     .on('data', (data) => {
// //         let tmp_pay_type = data['Pay Type'].split(",");
// //         for (let i = 0; i < tmp_pay_type.length; i++) {
// //             result.push({ filename: tmp_pay_type[i], selected: false, type: "content" });
// //         }

// //     })
// //     .on('end', () => {
// //         // console.log(results);
// //         // [
// //         //   { NAME: 'Daffy Duck', AGE: '24' },
// //         //   { NAME: 'Bugs Bunny', AGE: '22' }
// //         // ]
// //         res = _unique(result, 'filename');
// //         console.log(res)
// //         // console.log(res);
// //     });


var writer = csvWriter({ headers: ["Type", "Pay Type"] })
writer.pipe(fs.createWriteStream('/home/sherin_ag/project_express/customer-pay-type/new-pay-types.csv'))
writer.write(['world', 'bar'])
writer.end();


function _unique(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
