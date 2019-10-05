var fs =  require('fs'),
    async = require('async');

function load_file_content_waterfall(path, callback) {
    var fileHandle;
    // 1. array of function to execute
    // 2. function to call after all functions in array are execute or if error occurs
    async.waterfall([
            // FUNCTION 1 - open file
            function (cb) {
                // cb is callback provided by waterfall
                // if is cb called with error it calls result function with error
                // if is cb called with result it continues executing next function in array
                fs.open(path, 'r', cb);
            },
            // FUNCTION 2 - get file status
            function (handle, cb) {
                console.log(arguments);
                fileHandle = handle;
                if (!handle) {
                    cb({
                        error: "invalid_handle",
                        message: "bad file handle from fs.open"
                    })
                } else {
                    fs.fstat(handle, cb);
                }
            },
            // FUNCTION 3 - read file
            function (fileStatus, cb) {
                if(fileStatus.isFile()) {
                    var b = new Buffer(fileStatus.size);
                    fs.read(fileHandle, b, 0, fileStatus.size, null, cb);
                } else {
                    cb({error: "not_file",
                        message: "Can't load file"
                    })
                }
            },
            // FUNCTION 4 - pass the read file to caller
            function (bytes_read, buf, cb) {
                cb(null, buf.toString('utf8', 0, bytes_read));
            }
        ],
        function (err, results) {
            callback(err,results);
        }
    )
}

function load_file_content(path, callback) {
    fs.open(path, 'r', (err, f) => {
        // CALLBACK 1
        if(err) {
            callback(err);
            return
        } else if (!f) {
            callback({error: "invalid_handle",
                message: "bad file handle from fs.open"
            })
        } else {
            // OK - file opened
            fs.fstat(f, (err, stats) => {
                // CALLBACK 2
                if(err) {
                    callback(err);
                    return;
                } else {
                    // OK - got status
                    if(stats.isFile()) {
                        var b = new Buffer(stats.size);
                        fs.read(f, b, 0, stats.size, null, (err, br, buf) => {
                            // CALLBACK 3
                            if(err) {
                                callback(err);
                                return;
                            } else {
                                // OK - read file
                                fs.close(f, (err) => {
                                    // CALLBACK 4
                                    if(err) {
                                        callback(err);
                                        return;
                                    } else {
                                        // call callback from the caller
                                        callback(null, b.toString('utf8',0,br))
                                    }
                                })
                            }
                        })
                    } else {
                        callback({error: "not_file",
                            message: "Can't load file"
                        })
                    }
                }
            })
        }
    })
}

load_file_content_waterfall('async_waterfall.js', (err, contents) => {
    console.log(contents);
});
//
// load_file_content('async_waterfall.js', (err, contents) => {
//     console.log(contents);
// });