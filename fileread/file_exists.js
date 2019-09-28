var fs = require('fs');

function FileObject() {
    this.filename = '';
    // callback - error, boolean
    this.file_exists = function (callback) {
        console.log("About to open file:" + this.filename);
        self = this;
        fs.open(this.filename, 'r', function (err, handle) {
            if(err) {
                console.log("Can't open file:" + self.filename);
                callback(err, false);
            } else {
                fs.close(handle, () =>{});
                callback(null, this);
            }
        })
    }
}

var fo = new FileObject();
fo.filename = "non existing file";
fo.file_exists((err, exists) => {
    if(err) {
        console.log("Error opening file" + JSON.stringify(err));
    }
});