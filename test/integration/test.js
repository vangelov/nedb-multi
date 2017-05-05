const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const children = [];

function runProgram(program) {
  const options = {
    cwd: __dirname,
    env: process.env,
  };

  return new Promise((resolve, reject) => {
    const child = childProcess.exec(`node ${program}`, options, (err, res) => {
      if (!err) {
        return resolve(res);
      }

      return reject(err);
    });

    children.push(child);
  });
}

process.on('exit', () => {
  fs.unlinkSync(path.join(__dirname, 'test.data'));
  children.forEach(child => child.kill('SIGKILL'));
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err); // eslint-disable-line no-console
  process.exit(1);
});

runProgram('../../server.js');

Promise.all([
  runProgram('writer.js'),
  runProgram('writer.js'),
])
.then(() => runProgram('reader.js'))
.then((output) => {
  const [workerPid1, workerPid2] = children.slice(1).map(child => child.pid);

  const expected = [];
  const iterations = Number(process.env.NEDB_MULTI_INTERATIONS);

  for (let i = 0; i < iterations; i += 1) {
    expected.push({ pid: workerPid1 });
  }

  for (let i = 0; i < iterations; i += 1) {
    expected.push({ pid: workerPid2 });
  }

  const actual = JSON.parse(output);
  assert.deepEqual(actual, expected);

  process.exit(0);
});
