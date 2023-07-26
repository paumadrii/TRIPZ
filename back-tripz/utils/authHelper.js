const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'defaultjwtsecret';
const expiresIn = process.env.JWT_EXPIRES_IN || '5d';

const createToken = (payload, options = {}) => {
  const token = jwt.sign(payload, secret, { expiresIn: options.expiresIn || expiresIn });
  return token;
};

module.exports = {
  createToken
};
