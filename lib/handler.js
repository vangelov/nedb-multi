const DataStore = require('nedb');
const errio = require('errio');

const utils = require('./utils');
const constants = require('./constants');

const replyCallback = reply => (...args) => {
  if (args[0] !== null) {
    args[0] = errio.stringify(args[0]); // eslint-disable-line no-param-reassign
  }

  reply(...args);
};

exports.create = dbsMap => (filename, method, dataOnlyArgs, reply) => {
  let db = dbsMap.get(filename);

  if (method === 'loadDatabase' && !db) {
    db = new DataStore({ filename });
    dbsMap.set(filename, db);
  } else if (!db) {
    reply('Call loadDatabase() first.');
    return;
  }

  if (method === constants.EXECUTE_CURSOR_PRIVATE) {
    const cursor = dataOnlyArgs[dataOnlyArgs.length - 1];
    utils.execCursor(cursor, db, replyCallback(reply));
  } else {
    db[method].call(db, ...dataOnlyArgs, replyCallback(reply));
  }
};
