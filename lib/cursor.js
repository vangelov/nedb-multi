const rpc = require('./rpc');

module.exports = class Cursor {

  constructor(socket, filename, findArgs) {
    this.findArgs = findArgs;
    this.filename = filename;
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
    rpc(this.socket, this.filename, 'execCursor', [this, callback]);
  }
};
