# nedb-multi
A proxy for Nedb which allows for multi-process access. 
The synchronized access is achieved by routing the database calls from all processes through a single server process using the Axon library (https://github.com/tj/axon).

*Note: Both callback- and cursor-based methods are supported.*

## Installation
`npm install --save nedb-multi`

## Usage

You need to start the process which actually accesses the database separately. It's located in `node_modules/nedb-multi/server.js`. I suggest you use a process manager such as PM2 to do this.
You can pass the port number on which the server will listen by giving it as the first argument of the child process or by setting the env variable `NEDB_MULTI_PORT`.

In your other processes create the datastore by passing the port you set in the previous step. All options fields which can be serialized to JSON are supported.

```javascript
const Datastore = require('nedb-multi')(<port>);

const db = new Datastore({ filename: 'test.db' });
```

You can then use the Datastore instance as usual. 

*Note: It does not matter if you start the server before or after creating the datastore.*

### Test
To run the tests execute
`npm test`
