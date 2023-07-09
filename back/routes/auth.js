const router = require("express").Router();

const controllers = require("../controllers/auth");

module.exports = (db) => {
  router.post("/signup", controllers.signup(db));
};
