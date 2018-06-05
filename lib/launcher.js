var ConfigParser = require('./configParser'),
    log = require('./logger');
    JSParser = require('./jsParser');

var init = function(configFile, additionalConfig) {
  var configParser = new ConfigParser();
  if (configFile) {
    configParser.addFileConfig(configFile);
  }
  if (additionalConfig) {
    configParser.addConfig(additionalConfig);
  }
  var config = configParser.getConfig();
  log.debug('Protractor-Coverage version: ' + require('../package.json').version);
  
  var excludes = ConfigParser.resolveFilePatterns(config.exclude, true, config.configDir);
  var allSpecs = ConfigParser.resolveFilePatterns(
      ConfigParser.getSpecs(config), false, config.configDir).filter(function(path) {
        return excludes.indexOf(path) < 0;
      });
   /*var files = ['/Users/ravigupta/Documents/projects/protractor-coverage/test/validateUser.test.js'];
   let tree = JSParser.readTypes(files[0]);*/
   /*tree.traverseBF(function(node) {
    console.log(node.data.name);
   });*/
   //console.log(JSParser.parseTree(tree));
  var splunkObjList = [];
  if(allSpecs.length > 0) {
    allSpecs.forEach(function (file,index) {
      let tree = JSParser.readTypes(file);
      let list = JSParser.parseTree(tree);
      splunkObjList.concat(list);
    });
  } else {
    log.print('No test file found');
  }
  /*if(!config.framework) {
    return require('./jasmine').run(allSpecs);
  } else {
    return require('./' + config.framework).run(allSpecs);
  }*/
};

exports.init = init;