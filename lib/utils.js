
exports.endsWithCallback = function endsWithCallback(args) {
  return args && args.length > 0 && typeof args[args.length - 1] === 'function';
};

exports.execCursor = function execCursor(cursor, db, callback) {
  const { sort, skip, limit, projection, findArgs } = cursor;

  db.find(...findArgs)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .projection(projection)
    .exec(callback);
};
