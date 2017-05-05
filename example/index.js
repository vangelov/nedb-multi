const DataStore = require('../index')(Number(process.env.NEDB_MULTI_PORT));

const db = new DataStore({ filename: 'example.db' });
const maxInsertsCount = 3;

db.loadDatabase(() => {
  function next(insertsCount) {
    if (insertsCount === maxInsertsCount) {
      process.exit(0);
    }

    db.insert({ pid: process.pid }, (err) => {
      if (err) {
        console.log('Insert error:', err); // eslint-disable-line no-console
      } else {
        next(insertsCount + 1);
      }
    });
  }

  next(0);
});
