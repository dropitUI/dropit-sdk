const { initialize } = require('./utils/figmaClient.js');
const { _getApp,_getAppIamges } = require('./services/dropitServices.js');

module.exports = {
  initialize,
  getApp: _getApp,
  getAllImages: _getAppIamges
};