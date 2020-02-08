import * as admin from "firebase-admin";

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }

  const cert = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  };

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error;
    });
};
