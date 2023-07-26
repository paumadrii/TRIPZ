const router = require('express').Router();
const controllers = require('../controllers/user/user');
const { auth } = require('../utils/middlewares');

module.exports = () => {
  router.post('/registerUser', controllers.registerUser());
  router.post('/loginUser', controllers.loginUser());
  router.post('/saveCard', auth, controllers.saveCard());
  router.get('/getTravels', auth, controllers.getTravels());

  return router;
};
