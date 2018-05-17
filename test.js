var esprima = require('esprima');
var file = '/Users/ravigupta/Documents/projects/encore_vulnerability_ui/test/stories/mock/device.test.js';

var fs = require("fs");
var contents = fs.readFileSync(file, { encoding: 'utf8'});
esprima.tokenize(contents);
var result = esprima.parseScript(contents,{ comment: true });
console.log(result);