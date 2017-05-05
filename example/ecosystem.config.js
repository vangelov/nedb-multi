module.exports = {
  apps: [
    {
      name: 'process1',
      script: 'index.js',
      autorestart: false,
    },
    {
      name: 'process2',
      script: 'index.js',
      autorestart: false,
    },
    {
      name: 'nedb-multi/server',
      script: '../server.js',
      args: process.env.NEDB_MULTI_PORT,
    },
  ],
};
