import admin from 'firebase-admin';
import serviceAccount from '../../firebase-adminsdk.json';

type InitializeFirebaseAdminAppType = () => admin.app.App;

interface Params {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientC509CertUrl: string;
}

const params: Params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

const initializeFirebaseAdminApp: InitializeFirebaseAdminAppType = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(params),
  });
};
export default initializeFirebaseAdminApp;
