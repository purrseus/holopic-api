const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '1m' });
};
