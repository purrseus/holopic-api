const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../constants');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = !!authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    return;
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(STATUS_CODE.FORBIDDEN).json({ message: 'jwt expired' });
  }
};
