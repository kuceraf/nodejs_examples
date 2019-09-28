var fs = require('fs');

var buf = new Buffer(1000);

fs.open('testfile.txt', 'r', (err, handle) => {
    fs.read(handle, buf, 0, 1000, null, (err, length) => {
       console.log(buf.toString('utf8', 0, length));
       fs.close(handle, () => {});
    });
});