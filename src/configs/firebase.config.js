const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-adminsdk.json');

const initializeFirebaseAdminApp = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
module.exports = initializeFirebaseAdminApp;
