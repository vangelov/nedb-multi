
const DataStore = require('../../index')(Number(process.env.NEDB_MULTI_PORT));

const db = new DataStore({ filename: 'test.data' });

db.loadDatabase(() => {
  db.find({}).sort({ pid: 1 }).projection({ _id: 0 }).exec((err, docs) => {
    console.log(JSON.stringify(docs)); // eslint-disable-line no-console
    process.exit(0);
  });
});
