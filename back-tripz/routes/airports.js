const router = require("express").Router();
const controller = require("../controllers/airports/airports");
module.exports = () => {
  router.post("/importAirports", controller.importAirports());
  router.get("/getAirports/:name", controller.getAirports());

  return router;
};
