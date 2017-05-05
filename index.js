const axon = require('axon');
const proxy = require('./lib/dataStoreProxy');

module.exports = (port) => {
  const reqSocket = axon.socket('req');
  reqSocket.connect(port);

  return proxy.create(reqSocket);
};
