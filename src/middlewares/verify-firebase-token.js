const admin = require('firebase-admin');

module.exports.verifyFirebaseToken = async (req, res, next) => {
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(req.body.idToken);
    res.locals.decodedIdToken = decodedIdToken;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: error.errorInfo.message.replace(/\. .+$/g, '') });
  }
};
