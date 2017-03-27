const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const proxyquire = require('proxyquire'); // eslint-disable-line import/no-extraneous-dependencies

const Cursor = require('../../lib/cursor');

const socket = {};
const testMethod = t => proxyquire('../../lib/method', {
  './rpc': () => {
    t.end();
  },
});

test('create without cursor support', (t) => {
  const method = testMethod(t);
  const result = method.create(socket, 'test', false);

  result();
});

test('create with cursor support but with callback', (t) => {
  const method = testMethod(t);
  const result = method.create(socket, 'test', true);

  result(() => {});
});

test('create with cursor support and without callback', (t) => {
  const method = testMethod(t);
  const result = method.create(socket, 'test', true);
  const cursor = result();

  t.true(cursor instanceof Cursor);
  t.end();
});
