const slonik = require('slonik');

const connection = slonik.createPool(process.env.DB_URL);

module.exports = {
  db: connection,
  query: async (callback) => {
    const _db = await connection;
    return _db.query(callback);
  },
  maybeOne: async (callback) => {
    const _db = await connection;
    return _db.maybeOne(callback);
  }
};
