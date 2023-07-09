const slonik = require("slonik");

module.exports = slonik.createPool(process.env.DB_URL);
