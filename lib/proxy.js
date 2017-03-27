
const method = require('./method');

const methodsDescriptions = [
  { name: 'loadDatabase', supportsCursor: false },
  { name: 'insert', supportsCursor: false },
  { name: 'find', supportsCursor: true },
  { name: 'findOne', supportsCursor: true },
  { name: 'update', supportsCursor: false },
  { name: 'remove', supportsCursor: false },
  { name: 'ensureIndex', supportsCursor: false },
  { name: 'removeIndex', supportsCursor: false },
  { name: 'count', supportsCursor: false },
];

class DataStoreProxy {

  constructor({ filename }) {
    this.filename = filename;
  }
}

exports.create = function create(socket) {
  for (const { name, supportsCursor } of methodsDescriptions) {
    DataStoreProxy.prototype[name] = method.create(socket, name, supportsCursor);
  }

  return DataStoreProxy;
};
