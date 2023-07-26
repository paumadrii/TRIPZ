const router = require('express').Router();

const authRoutes = require('./auth');
const travelsRoutes = require('./travels');
const airportRoutes = require('./airports');
const userRoutes = require('./user');

module.exports = (db) => {
  router.use('/auth', authRoutes(db));
  router.use('/travels', travelsRoutes());
  router.use('/airports', airportRoutes());
  router.use('/user', userRoutes());

  return router;
};
