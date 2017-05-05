# nedb-multi
`Nedb` (https://github.com/louischatriot/nedb) does not support concurrent access from multiple processes. One module which tries to solve this problem is `nedb-party` (https://github.com/allain/nedb-party). However, it does not support methods that return cursors. It also relies on each process starting a http server on the same port and whichever manages to start listening becomes the master and the others connect to it. This however does not work if you're using the `cluster` module (or `PM2`) as in that case the port is shared between the child processes and they are all able to become masters. I submitted a patch request, which was accepted, that instead used directory-based locking. This was enough to make it work but managing locks can be tricky.

I decided to try a similar, but lock-free approach, using the `axon` framework (https://github.com/tj/axon). There's still only one master process that the others connect to, but there are no locks. Also, both callback- and cursor-based methods are supported. The `setAutocompactionInterval`, `stopAutocompaction` and `compactDatafile` methods of the `Datastore#persistence` object are also supported, except for the `compaction.done` event fired after calling `compactDatafile`.

## Installation
`npm install --save nedb-multi`

## Usage

You need to start the process which actually accesses the database separately. It's located in `<your-project-dir>/node_modules/nedb-multi/server.js`. I suggest you use a process manager such as `PM2` to do this.

You can pass the port number on which the server will listen by giving it as the first argument of the child process or by setting the env variable `NEDB_MULTI_PORT`.

In your other processes create the datastore by passing the port you set in the previous step. All options fields which can be serialized to JSON, are supported, except for `autoload`.

```javascript
const Datastore = require('nedb-multi')(<port>);

const db = new Datastore({ filename: 'test.db' });

db.loadDatabase(function (err) {    
  // ...
});
```

*Note: It does not matter if you start the server before or after creating the datastore.*

## Example

In `/example` folder you can find a project which uses `nedb-multi` with `PM2`. It will create an `example.db` file that contains the inserts from two processes.

Run it with: `npm install`, then `npm start`

### Test

To run the tests execute: `npm test`.
