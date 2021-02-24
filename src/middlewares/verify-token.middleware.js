const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../constants');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = !!authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    res.locals.user = user;
    next();
  } catch (error) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
};

module.exports = verifyToken;
