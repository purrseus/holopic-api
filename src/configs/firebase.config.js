const admin = require('firebase-admin');
const serviceAccount = require('../../holopic-dnt99-firebase-adminsdk.json');

module.exports = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
