const router = require("express").Router();
const { authorizer, fieldsValidator } = require("../middlewares");

const controllers = require("../controllers/auth");
const signupValidator = fieldsValidator("email", "username", "password");
const signinValidator = fieldsValidator("email", "password");

module.exports = (db) => {
  router.post("/signup", signupValidator, controllers.signup(db));
  router.post("/signin", signinValidator, controllers.signin(db));
  router.post("/signout", authorizer(), controllers.signout());

  return router;
};
