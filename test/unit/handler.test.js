const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const proxyquire = require('proxyquire'); // eslint-disable-line import/no-extraneous-dependencies

test('calling loadDatabase', (t) => {
  const handler = proxyquire('../../lib/handler', {
    nedb: class {
      loadDatabase(callback) { // eslint-disable-line class-methods-use-this
        process.nextTick(() => callback(null, {}));
      }
    },
  });

  t.test('for the first time', (st) => {
    const dbsMap = new Map();
    const messagesHandler = handler.create(dbsMap);

    messagesHandler('file', 'loadDatabase', [], () => {
      st.ok(dbsMap.get('file'));
      st.end();
    });
  });

  t.test('twice', (st) => {
    const dbsMap = new Map();
    const messagesHandler = handler.create(dbsMap);

    messagesHandler('file', 'loadDatabase', [], () => {
      const db1 = dbsMap.get('file');
      st.ok(db1);

      messagesHandler('file', 'loadDatabase', [], () => {
        const db2 = dbsMap.get('file');
        st.equal(db1, db2);
        st.end();
      });
    });
  });
});

test('calling other methods', (t) => {
  const handler = proxyquire('../../lib/handler', {
    nedb: class {
      testMethod(callback) { // eslint-disable-line class-methods-use-this
        process.nextTick(() => callback(null, {}));
      }
    },
  });

  const dbsMap = new Map();
  const messagesHandler = handler.create(dbsMap);

  messagesHandler('file', 'testMethod', [], () => {
    t.end();
  });
});

test('executing a cursor', (t) => {
  const cursor = {};
  const handler = proxyquire('../../lib/handler', {
    './utils': {
      execCursor(cursorToExecute, db, callback) {
        t.deepEqual(cursorToExecute, cursor);
        process.nextTick(() => callback(null, {}));
      },
    },
  });

  const dbsMap = new Map();
  dbsMap.set('file', {});

  const messagesHandler = handler.create(dbsMap);

  messagesHandler('file', '_nedb_multi_execCursor', [cursor], () => {
    t.end();
  });
});
