const DataStore = require('../../index')(Number(process.env.NEDB_MULTI_PORT));

const db = new DataStore({ filename: 'test.data' });

db.loadDatabase(() => {
  function next(count) {
    if (count < Number(process.env.NEDB_MULTI_INTERATIONS)) {
      db.insert({ pid: process.pid }, () => {
        next(count + 1);
      });
    } else {
      process.exit(0);
    }
  }

  next(0);
});
