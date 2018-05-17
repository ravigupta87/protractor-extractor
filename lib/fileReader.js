/**
 * Check file path
 * If exists then return content as string
 * @param filePath
 */

 var fs = require('fs');

 var readFile = function (path) {
 	if (!fs.existsSync(path)) {
 		throw "Not a valid path"
	}
	try {  
	    var data = fs.readFileSync(path, 'utf8');
	    return data;   
	} catch(e) {
	    console.log('Error:', e.stack);
	}
 };

 exports.read = readFile;