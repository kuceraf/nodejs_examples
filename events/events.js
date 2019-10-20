var events = require('events');

function Downloader() {}

// extends from EventEmitter
Downloader.prototype = new events.EventEmitter();
Downloader.prototype.__proto__=events.EventEmitter.prototype;
Downloader.prototype.url = null;
Downloader.prototype.download = function (path) {

    // this (aka "the context") is a special keyword inside each
    // function and its value only depends on how the function was called, not how/when/where it was defined.
    // You actually don't want to access this in particular, but the object it refers to
    // an easy solution is to simply create a new variable that also refers to that object.
  var self = this;
  self.url = path;

  // simulate downloading file with delay of 2 seconds
  self.emit('start', path);
  setTimeout(function () {
      self.emit('end', "simulated_contents");
  }, 2000);

};

var d = new Downloader();
d.on(
    "start",
    (path) => {
        console.log("Started downloading: " + path);
    }
);

d.on(
    "end",
    (content) => {
        console.log("I downloaded: " + content);
    }
);

d.download("http://fakrurl.com");


