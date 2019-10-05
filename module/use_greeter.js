var greeter = require("./greeter.js");
var greeter_factory = require("./factory_module");
var Greeter = require("./constructor_modules");
greeter.hello_world();

console.log(greeter_factory.create_greeter('fr').greet());
console.log(new Greeter('cz').greet());

console.log("---------------");
console.log(module);