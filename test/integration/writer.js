const DataStore = require('../../index')(Number(process.env.NEDB_MULTI_PORT));

const db = new DataStore({ filename: 'test.data' });
db.persistence.setAutocompactionInterval(500);

db.loadDatabase(() => {
  function next(count) {
    if (count < Number(process.env.NEDB_MULTI_INTERATIONS)) {
      db.insert({ pid: process.pid }, () => {
        db.persistence.compactDatafile();
        next(count + 1);
      });
    } else {
      db.persistence.stopAutocompaction();
      process.exit(0);
    }
  }

  next(0);
});
