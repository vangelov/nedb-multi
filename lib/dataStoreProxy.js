
const method = require('./method');
const constants = require('./constants');
const PersistenceProxy = require('./persistenceProxy');

exports.create = function create(socket) {
  class DataStoreProxy {

    constructor(options) {
      this.options = options;
      this.persistence = new PersistenceProxy(socket, options);
    }
  }

  for (const { name, supportsCursor } of constants.METHODS_DESCRIPTIONS) {
    DataStoreProxy.prototype[name] = method.create(socket, name, supportsCursor);
  }

  return DataStoreProxy;
};
