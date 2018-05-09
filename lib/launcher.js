var ConfigParser = require('./configParser'),
    log = require('./logger');

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
  console.log(excludes);
  console.log(allSpecs);  

  /*if(!config.framework) {
    return require('./jasmine').run(allSpecs);
  } else {
    return require('./' + config.framework).run(allSpecs);
  }*/
};

exports.init = init;