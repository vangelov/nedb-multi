const rpc = require('./rpc');
const contants = require('./constants');

module.exports = class Cursor {

  constructor(socket, options, findArgs) {
    this.findArgs = findArgs;
    this.options = options;
    this.socket = socket;
  }

  sort(sort) {
    this.sort = sort;
    return this;
  }

  skip(skip) {
    this.skip = skip;
    return this;
  }

  limit(limit) {
    this.limit = limit;
    return this;
  }

  projection(projection) {
    this.projection = projection;
    return this;
  }

  toJSON() {
    return {
      skip: this.skip,
      sort: this.sort,
      limit: this.limit,
      projection: this.projection,
      findArgs: this.findArgs,
    };
  }

  exec(callback) {
    rpc(this.socket, this.options, contants.EXECUTE_CURSOR_PRIVATE, [this, callback]);
  }
};
