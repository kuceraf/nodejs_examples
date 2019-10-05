var async = require('async');

async.series([
        (cb) => {
            setTimeout(()=>{
                cb(null, [1,2,3])
                console.log('first finished');
            }, 1000);
        },
        (cb) => {
            setTimeout(()=>{
                cb(null, ["a","b", "c"]);
                console.log('second finished');
            }, 4000);
        }
    ],
    (err, result) => {
        console.log(result);
    });