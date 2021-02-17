const { auth } = require('firebase-admin');
const { STATUS_CODE } = require('../constants');

module.exports = async (req, res, next) => {
  if (!req.body.idToken) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: 'idToken is required!' });
    return;
  }

  try {
    const decodedIdToken = await auth().verifyIdToken(req.body.idToken);
    res.locals.decodedIdToken = decodedIdToken;
    next();
  } catch (error) {
    res
      .status(STATUS_CODE.FORBIDDEN)
      .json({ message: error.errorInfo.message.replace(/\. .+$/g, '') });
  }
};
