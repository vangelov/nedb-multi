const axon = require('axon');

const handler = require('./lib/handler');

const port = Number(process.env.NEDB_MULTI_PORT) || Number(process.argv[2]);
const dbsMap = new Map();
const repSocket = axon.socket('rep');
const messagesHandler = handler.create(dbsMap);

repSocket.bind(port);
repSocket.on('message', messagesHandler);
