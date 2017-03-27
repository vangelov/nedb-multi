const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const utils = require('../../lib/utils');

test('endsWithCallback', (t) => {
  t.test('with empty arguments', (st) => {
    st.false(utils.endsWithCallback([]));
    st.end();
  });

  t.test('with no arguments', (st) => {
    st.false(utils.endsWithCallback());
    st.end();
  });

  t.test('with no data only arguments', (st) => {
    st.false(utils.endsWithCallback(1, {}, [], 'test', null));
    st.end();
  });

  t.test('with single function argument', (st) => {
    st.true(utils.endsWithCallback([() => {}]));
    st.end();
  });

  t.test('with data and function argument', (st) => {
    st.true(utils.endsWithCallback([1, {}, [], 'test', () => {}]));
    st.end();
  });
});
