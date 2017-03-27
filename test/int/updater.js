const DataStore = require('../../index');

const db = new DataStore({ filename: 'test.data' });

db.loadDatabase(() => {
  function next(count) {
    db.insert({ prop: 'data', pid: process.pid }, () => {
      if (count < 10) {
        next(count + 1);
      } else {
        process.exit(0);
      }
    });
  }

  next(0);
});
