exports.METHODS_DESCRIPTIONS = [
  { name: 'loadDatabase', supportsCursor: false },
  { name: 'insert', supportsCursor: false },
  { name: 'find', supportsCursor: true },
  { name: 'findOne', supportsCursor: true },
  { name: 'update', supportsCursor: false },
  { name: 'remove', supportsCursor: false },
  { name: 'ensureIndex', supportsCursor: false },
  { name: 'removeIndex', supportsCursor: false },
  { name: 'count', supportsCursor: false },
];

exports.EXECUTE_CURSOR_PRIVATE = '_nedb_multi_execCursor';
