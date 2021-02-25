const admin = require('firebase-admin');
const serviceAccount = require('../../holopic-nt99-firebase-adminsdk.json');

const initializeFirebaseAdminApp = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
module.exports = initializeFirebaseAdminApp;
