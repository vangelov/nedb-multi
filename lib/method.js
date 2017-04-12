const rpc = require('./rpc');
const utils = require('./utils');
const Cursor = require('./cursor');

exports.create = function create(socket, name, supportsCursor) {
  return function method(...args) {
    if (supportsCursor && !utils.endsWithCallback(args)) {
      return new Cursor(socket, this.options, args);
    }

    return rpc(socket, this.options, name, args);
  };
};
