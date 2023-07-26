const router = require("express").Router();
const controllers = require("../controllers/travels/travels");

module.exports = () => {
  router.post("/findtravels", controllers.findTravels());

  return router;
};
