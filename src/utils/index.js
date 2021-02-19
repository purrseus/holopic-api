const jwt = require('jsonwebtoken');
const { IS_PRODUCTION } = require('../constants');

const tokenExpiration = IS_PRODUCTION
  ? { expiresIn: '1d' }
  : { expiresIn: '1m' };

module.exports.generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, tokenExpiration);
};
