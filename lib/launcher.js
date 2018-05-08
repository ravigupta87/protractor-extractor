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
  //var config = configParser.getSpecs();
  console.log(ConfigParser.resolveFilePatterns(
          config.specs, false, config.configDir));
};

exports.init = init;