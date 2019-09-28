var http = require("http");
var fs = require("fs");

function load_album_list(callback) {
    fs.readdir("albums", (err, files) => {
        if(err) {
            callback(err);
        } else {
            var only_dirs = [];

            function iterator(index) {
                if(files.length == index) {
                    callback(null, only_dirs);
                    return;
                }
                fs.stat("albums/" + files[index], (err, stats) => {
                    if(stats.isDirectory()) {
                        only_dirs.push(files[index]);
                    }
                    iterator(index + 1);
                })
            }
            iterator(0);
            // callback(null, files);
        }
    });
}
function handle_incoming_request(req, res) {
    console.log("INCOMING REQUEST:" + req.method +" " +req.url);

    load_album_list((err, files) => {
        if(err) {
            res.writeHead(500, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({
                error: {code: "cant_load_albums", message: err.message},
                data: null}
                ));
        } else {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({
                error: null,
                data: {albums : files}}
            ));
        }
    });
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);