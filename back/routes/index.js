const router = require("express").Router();

const authRoutes = require("./auth");
module.exports = (db) => {
  router.use("/auth", authRoutes(db));

  return router;
};
