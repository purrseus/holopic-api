const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-adminsdk.json');

module.exports = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
