const { auth } = require('firebase-admin');
const { STATUS_CODE } = require('../constants');

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const decodedIdToken = await auth().verifyIdToken(req.body.idToken);
    res.locals.decodedIdToken = decodedIdToken;
    next();
  } catch (error) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: error.errorInfo.message.replace(/\. .+$/g, '') });
  }
};

module.exports = verifyFirebaseToken;
