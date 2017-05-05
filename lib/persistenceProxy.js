
const rpc = require('./rpc');
const constants = require('./constants');

module.exports = class PersistenceProxy {

  constructor(socket, options) {
    this.socket = socket;
    this.options = options;
  }

  setAutocompactionInterval(interval) {
    rpc(this.socket, this.options, constants.PERSISTENCE_SET_AUTOCOMPACTION_INTERVAL, [interval]);
  }

  stopAutocompaction() {
    rpc(this.socket, this.options, constants.PERSISTENCE_STOP_AUTOCOMPACTION);
  }

  compactDatafile() {
    rpc(this.socket, this.options, constants.PERSISTENCE_COMPACT_DATAFILE);
  }
};
