
const method = require('./method');
const constants = require('./constants');

class DataStoreProxy {

  constructor(options) {
    this.options = options;
  }
}

exports.create = function create(socket) {
  for (const { name, supportsCursor } of constants.METHODS_DESCRIPTIONS) {
    DataStoreProxy.prototype[name] = method.create(socket, name, supportsCursor);
  }

  return DataStoreProxy;
};
